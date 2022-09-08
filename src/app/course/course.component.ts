import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { MateriService } from '../services/materi.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  listMateri = [];
  loading = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private materiService: MateriService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.getAllMateri();
  }

  getAllMateri() {
    this.materiService.getAllMateri().subscribe(res => {
      if (res.success) {
        this.loading = false;
        this.listMateri = res.data.map((item: any) => {
          item['className'] = this.generalService.romanize(item['className']);
          return item;
        });
      }
    }, error => {
      console.log(error);
    });
  }

  deleteMateri(id: any){
    this.generalService.swalConfirm('Apakah anda yakin?', 'Materi dan seluruh sub materi akan terhapus!').then((result) => {
      if (result.isConfirmed) {
        this.materiService.deleteMateri(id).subscribe(res => {
          if(res.success){
            this.generalService.swalAlert('Berhasil!', 'Materi berhasil dihapus', 'success').then(() => {
              this.getAllMateri();
            })
          } else {
            this.generalService.swalAlert('Error!', 'Materi gagal dihapus', 'error')
          }
        }, error => {
          this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
        });
      }
    })
  }

}
