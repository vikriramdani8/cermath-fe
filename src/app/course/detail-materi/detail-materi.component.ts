import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { MateriService } from 'src/app/services/materi.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-detail-materi',
  templateUrl: './detail-materi.component.html',
  styleUrls: [
    './detail-materi.component.scss',
    './../course.component.scss'
  ]
})
export class DetailMateriComponent implements OnInit {

  listClass = [];
  imgIcon: any = '';
  materiForm!: FormGroup;
  subMateriForm!: FormGroup;
  materiId: any = '';
  editMateri = false;
  editSubMateri = false;
  detailMateri: any = {};
  base64Pdf: any = '';
  detailSubMateri: any = {};
  loadingMateri = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private materiService: MateriService,
    private generalService: GeneralService
  ) {
    this.materiId = this.route.snapshot.paramMap.get('id');
    this.materiForm = this.fb.group({
      lessonName: ["", Validators.required],
      lessonDescription: ["", Validators.required],
      classId: ["", Validators.required]
    });

    this.subMateriForm = this.fb.group({
      sublessonName: ["", Validators.required],
      sublessonDescription: ["", Validators.required]
    });

    localStorage.removeItem('quizId');
  }

  ngOnInit(): void {
    this.getClass();
    this.getMateriDetail();
  }

  getClass() {
    this.materiService.getClass().subscribe(res => {
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

  getMateriDetail() {
    this.materiService.getMateriDetail(this.materiId).subscribe(res => {
      this.loadingMateri = false;
      if (res.success) {
        if (res.data) {
          this.imgIcon = res.data.lessonImage
          this.detailMateri = res.data;
          this.detailMateri.className = this.generalService.romanize(this.detailMateri.className);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  onEdit() {
    this.editMateri = !this.editMateri;
    this.materiForm.patchValue({
      ...this.detailMateri
    })
  }

  updateImageIcon(temp: any) {
    let files = temp.files;
    if (files.length > 0) {
      if (files[0].size < 2000000) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          this.imgIcon = reader.result;
        };
      } else {
        alert("Max file size 2000kb");
      }
    }
  }

  updateMateri() {
    let body = {
      ...this.materiForm.getRawValue(),
      lessonImage: this.imgIcon
    }

    if (this.materiForm.valid && this.imgIcon) {
      this.generalService.showLoading();
      this.materiService.putMateri(this.materiId, body).subscribe(res => {
        if (res.success) {
          this.generalService.swalAlert('Berhasil!', 'Materi berhasil dirubah', 'success').then(() => {
            this.editMateri = false;
            this.getMateriDetail();
          });
        } else {
          this.generalService.swalAlert('Error!', 'Materi gagal dirubah', 'error')
        }
      }, error => {
        console.log(error);
        this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
      });
    } else {
      this.generalService.swalAlert('Invalid!', 'Field tidak ada yang boleh kosong', 'warning');
    }
  }

  closeModal() {
    $('#modalTambahSublesson').modal('hide');
    $('#modalDetailSublesson').modal('hide');

    this.subMateriForm.reset();
  }

  addSubMateri() {
    this.editSubMateri = false;
    this.subMateriForm.reset();
    this.base64Pdf = '';
    this.openModal();
  }

  openModal() {
    $('#modalTambahSublesson').modal({ backdrop: 'static', keyboard: false });
    $('#modalTambahSublesson').modal('show');
  }

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.files);
  }

  prepareFilesList(files: Array<any>) {
    if (files.length > 0) {
      if (files[0].size < 2000000) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          this.base64Pdf = reader.result;
        };
      } else {
        alert("Max file size 2000kb");
      }
    }
  }

  onSaveSubMateri() {
    let body = {
      ...this.subMateriForm.getRawValue(),
      lessonPdf: this.base64Pdf,
      lessonId: this.materiId
    }

    if (this.subMateriForm.valid && this.base64Pdf) {
      this.generalService.showLoading();
      this.materiService.postSubMateri(body).subscribe(res => {
        if (res.success) {
          this.generalService.swalAlert('Berhasil!', 'Sub Materi berhasil ditambahkan', 'success').then(() => {
            this.getMateriDetail();
            this.closeModal();
          })
        } else {
          this.generalService.swalAlert('Error!', 'Sub Materi gagal ditambahkan', 'error')
        }
      }, error => {
        console.log(error);
      });
    } else {
      this.generalService.swalAlert('Invalid!', 'Field tidak ada yang boleh kosong', 'warning');
    }
  }

  onEditSubMateri() {
    let body = {
      ...this.subMateriForm.getRawValue(),
      lessonPdf: this.base64Pdf
    }

    if (this.subMateriForm.valid && this.base64Pdf) {
      this.generalService.showLoading();
      this.materiService.putSubMateri(this.detailSubMateri['sublessonId'], body).subscribe(res => {
        if (res.success) {
          this.editSubMateri = false;
          this.generalService.swalAlert('Berhasil!', 'Sub Materi berhasil dirubah', 'success').then(() => {
            this.getMateriDetail();
            this.closeModal();
          });
        } else {
          this.generalService.swalAlert('Error!', 'Sub Materi gagal dirubah', 'error')
        }
      }, error => {
        console.log(error);
        this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
      });
    } else {
      this.generalService.swalAlert('Invalid!', 'Field tidak ada yang boleh kosong', 'warning');
    }
  }

  confirmDeleteSubMateri(id: any) {
    this.generalService.swalConfirm('Apakah anda yakin?', 'Sub Materi ini akan terhapus!').then((result) => {
      if (result.isConfirmed) {
        this.deleteSubMateri(id);
      }
    })
  }

  deleteSubMateri(id: any) {
    this.materiService.deleteSubMateri(id).subscribe(res => {
      if (res.success) {
        this.generalService.swalAlert('Berhasil!', 'Sub Materi berhasil dihapus', 'success').then(() => {
          this.getMateriDetail();
        })
      } else {
        this.generalService.swalAlert('Error!', 'Sub Materi gagal dihapus', 'error')
      }
    }, error => {
      this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
    });
  }

  openEditMateri(id: string) {
    this.editSubMateri = true;
    this.openDetailSubMateri(id);
  }

  openModalSubMateri() {
    $('#modalDetailSublesson').modal('show');
  }

  openDetailSubMateri(id: any) {
    this.materiService.getSubMateriDetail(id).subscribe(res => {
      if (res.success) {
        this.detailSubMateri = res.data;
        if (!this.editSubMateri) {
          this.openModalSubMateri();
        } else {
          this.subMateriForm.patchValue({
            ...this.detailSubMateri
          })

          this.base64Pdf = res.data.document;
          this.openModal();
        }
      } else {
        this.generalService.swalAlert('Error!', 'Get detail sub materi gagal', 'error')
      }
    }, error => {
      console.log(error);
      this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
    });
  }

  listQuiz(id: any) {
    this.closeModal();
    this.router.navigate(['/course/listquiz/' + id]);
  }

  addSoal() {
    this.router.navigate(['/course/tambahSoal/' + this.materiId]);
  }

  openEditQuiz(data: any) {
    localStorage.setItem('quizId', data['quizId']);
    this.router.navigate(['/course/editSoal/' + this.materiId]);
  }

  confirmDeleteQuiz(data: any) {
    this.generalService.swalConfirm('Apakah anda yakin?', 'Latihan soal ini akan terhapus!').then((result) => {
      if (result.isConfirmed) {
        this.materiService.deleteQuiz(data['quizId']).subscribe(res => {
          if (res.success) {
            this.generalService.swalAlert('Berhasil!', 'Latihan materi ini berhasil dihapus', 'success').then(() => {
              this.getMateriDetail();
            })
          } else {
            this.generalService.swalAlert('Error!', 'Latihan soal ini gagal dihapus', 'error')
          }
        }, error => {
          console.log(error);
          this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
        })
      }
    })
  }
}
