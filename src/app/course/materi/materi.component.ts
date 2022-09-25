import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { MateriService } from 'src/app/services/materi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materi',
  templateUrl: './materi.component.html',
  styleUrls: [
    './materi.component.scss',
    './../course.component.scss'
  ]
})
export class MateriComponent implements OnInit {
  files: any[] = [];
  materiForm!: FormGroup;

  listClass = [];
  base64Image: any;
  loadingClass = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private materiService: MateriService,
    private generalService: GeneralService
  ) {
    this.materiForm = this.fb.group({
      lessonName: ["", Validators.required],
      lessonDesc: ["", Validators.required],
      classId: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.getClass();
  }

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.files);
  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  formatBytes(bytes: any, decimals?: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  romanize(num: any) {
    var lookup: any = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }, roman = '', i;
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

  prepareFilesList(files: Array<any>) {
    if (files.length > 0) {
      if (files[0].size < 700000) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          this.base64Image = reader.result
        };
      } else {
        alert("Max file size 700kb");
      }
    }
  }

  getClass() {
    this.materiService.getClass().subscribe(res => {
      this.loadingClass = false;
      if (res.success) {
        this.listClass = res.data.map((item: any) => {
          item['className'] = this.generalService.romanize(item['className']);
          return item;
        });
      }
    }, error => {
      console.log(error);
    });
  }

  onSave() {
    let data = this.materiForm.getRawValue();
    data.lessonImage = this.base64Image;

    if (this.materiForm.valid && this.base64Image) {
      this.generalService.showLoading();
      this.materiService.postMateri(data).subscribe(res => {
        if (res.success) {
          this.generalService.swalAlert('Berhasil!', 'Materi berhasil ditambahkan', 'success').then(() => {
            history.back();
          })
        } else {
          this.generalService.swalAlert('Error!', 'Materi gagal ditambahkan', 'error')
        }
      }, error => {
        this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
      });
    } else {
      this.generalService.swalAlert('Invalid!', 'Field tidak ada yang boleh kosong', 'warning');
    }
  }

  back() {
    history.back();
  }

}
