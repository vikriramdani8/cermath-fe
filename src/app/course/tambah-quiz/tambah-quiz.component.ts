import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { MateriService } from 'src/app/services/materi.service';
declare var $: any;

@Component({
  selector: 'app-tambah-quiz',
  templateUrl: './tambah-quiz.component.html',
  styleUrls: [
    './tambah-quiz.component.scss',
    './../course.component.scss'
  ]
})
export class TambahQuizComponent implements OnInit {

  listClass = [];
  lessonId: any = '';
  detailMateri: any = {
    lessonName: '',
    className: ''
  };
  quizForm!: FormGroup;
  questionForm!: FormGroup;
  editQuiz = false;
  editQuestion = false;
  listQuiz: any = [];
  questionImage: any = '';
  quizId = '';
  indexQuestion = 0;

  loadingMaster = true;
  loadingQuiz = false;

  constructor(
    private materiService: MateriService,
    private generalService: GeneralService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.lessonId = this.route.snapshot.paramMap.get('id');
    this.quizForm = this.fb.group({
      quizName: ["", Validators.required],
      difficulity: ["", Validators.required]
    });

    this.questionForm = this.fb.group({
      questionName: ["", Validators.required],
      answer1: ["", Validators.required],
      answer2: ["", Validators.required],
      answer3: ["", Validators.required],
      answer4: ["", Validators.required],
      correctAnswer: ["", Validators.required],
      questionScore: ["", Validators.required]
    });

    let temp = localStorage.getItem('quizId');
    this.quizId = temp ? temp : '';
  }

  ngOnInit(): void {
    this.getClass();
    this.getMateriDetail();

    if (this.quizId) {
      this.editQuiz = true;
      this.getDetailQuiz();
    }
    // this.openModal();
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
    this.materiService.getMateriDetail(this.lessonId).subscribe(res => {
      this.loadingMaster = false;
      if (res.success) {
        if (res.data) {
          this.detailMateri = res.data;
          this.detailMateri.className = this.generalService.romanize(this.detailMateri.className);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  getDetailQuiz() {
    this.loadingQuiz = true;
    this.materiService.getDetailQuiz(this.quizId).subscribe(res => {
      this.loadingQuiz = false;
      if (res.success) {
        this.listQuiz = res.data['listQuiz'];
        this.quizForm.patchValue({
          ...res.data,
        })
      }
    }, error => {
      console.log(error);
    });
  }

  openModal() {
    $('#modalTambahQuiz').modal({ backdrop: 'static', keyboard: false });
    $('#modalTambahQuiz').modal('show');
  }

  closeModal() {
    this.questionImage = '';
    this.editQuestion = false;
    this.questionForm.reset();
    $('#modalTambahQuiz').modal('hide');
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
          this.questionImage = reader.result;
        };
      } else {
        alert("Max file size 2000kb");
      }
    }
  }

  simpanPertanyaan() {
    let body = {
      ...this.questionForm.getRawValue(),
      questionImage: this.questionImage,
      questionType: this.questionImage ? 'image' : 'text'
    }

    body['correctAnswer'] = body[body['correctAnswer']];

    if (this.questionForm.valid) {
      this.listQuiz.push(body);
      this.closeModal();
    } else {
      this.generalService.swalAlert('Invalid!', 'Field tidak ada yang boleh kosong', 'warning');
    }
  }

  editPertanyaan() {
    let body = {
      ...this.questionForm.getRawValue(),
      questionImage: this.questionImage,
      questionType: this.questionImage ? 'image' : 'text'
    }

    body['correctAnswer'] = body[body['correctAnswer']];

    if (this.questionForm.valid) {
      this.closeModal();
      this.listQuiz[this.indexQuestion] = body;
    } else {
      this.generalService.swalAlert('Invalid!', 'Field tidak ada yang boleh kosong', 'warning');
    }
  }

  simpanQuiz() {
    let maxScore = 0;
    this.listQuiz.forEach((temp: any) => {
      maxScore += +temp['questionScore']
    });

    let body = {
      ...this.quizForm.getRawValue(),
      lessonId: this.lessonId,
      quizMaxScore: maxScore,
      quizList: this.listQuiz
    }
    if (this.listQuiz.length == 0) {
      this.generalService.swalAlert('Invalid!', 'List pertanyaan tidak boleh kosong', 'warning');
    } else {
      if (this.quizForm.valid) {
        this.generalService.showLoading();
        this.materiService.postQuiz(body).subscribe(res => {
          if (res.success) {
            this.generalService.swalAlert('Berhasil!', 'Latihan Materi berhasil ditambahkan', 'success').then(() => {
              history.back();
            });
          } else {
            this.generalService.swalAlert('Error!', 'Latihan Materi gagal ditambahkan', 'error');
          }
        }, error => {
          console.log(error);
          this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error');
        });
      } else {
        this.generalService.swalAlert('Invalid!', 'Field tidak ada yang boleh kosong', 'warning');
      }
    }
  }

  openEditQuestion(data: any, index: any) {
    this.indexQuestion = index;
    this.editQuestion = true;
    this.questionImage = data['questionImage'];
    this.questionForm.patchValue({
      ...data,
      correctAnswer: 'answer'+data['correctAnswer']
    })

    this.openModal();
  }

  back() {
    history.back();
  }

  onEditQuiz() {
    let maxScore = 0;
    this.listQuiz.forEach((temp: any) => {
      maxScore += +temp['questionScore']
    });

    let body = {
      ...this.quizForm.getRawValue(),
      lessonId: this.lessonId,
      quizMaxScore: maxScore,
      quizList: this.listQuiz
    }

    if (this.listQuiz.length == 0) {
      this.generalService.swalAlert('Invalid!', 'List pertanyaan tidak boleh kosong', 'warning');
    } else {
      if (this.quizForm.valid) {
        this.generalService.showLoading();
        this.materiService.putEditQuiz(body, this.quizId).subscribe(res => {
          if (res.success) {
            this.generalService.swalAlert('Berhasil!', 'Latihan materi berhasil di update', 'success').then(() => {
              history.back();
            })
          } else {
            this.generalService.swalAlert('Error!', 'Latihan materi gagal di update', 'error')
          }
        }, error => {
          this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
        });
      } else {
        this.generalService.swalAlert('Invalid!', 'Field tidak ada yang boleh kosong', 'warning');
      }
    }
  }

  confirmDeleteQuestion(i: any) {
    this.generalService.swalConfirm('Apakah anda yakin?', 'Pertanyaan ini akan terhapus!').then((result) => {
      if (result.isConfirmed) {
        this.listQuiz.splice(i, 1);
      }
    })
  }
}
