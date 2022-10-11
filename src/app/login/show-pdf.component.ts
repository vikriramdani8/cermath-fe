import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { MateriService } from '../services/materi.service';

@Component({
  selector: 'app-show-pdf',
  templateUrl: './show-pdf.component.html',
})
export class ShowPdfComponent implements OnInit {

  detailSubMateri : any = {}
  sublessonId : any = null;

  constructor(
    private materiService: MateriService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
  ) { 
    this.sublessonId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.openDetailSubMateri(this.sublessonId);
  }

  openDetailSubMateri(id: any) {
    this.materiService.getSubMateriDetail(id).subscribe(res => {
      if (res.success) {
        this.detailSubMateri = res.data;
      } else {
        this.generalService.swalAlert('Error!', res.message, 'error')
      }
    }, error => {
      console.log(error);
      this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
    });
  }

}
