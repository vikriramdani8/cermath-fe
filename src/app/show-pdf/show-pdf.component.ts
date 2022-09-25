import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { MateriService } from '../services/materi.service';

@Component({
  selector: 'app-show-pdf',
  templateUrl: './show-pdf.component.html',
  styleUrls: ['./show-pdf.component.scss']
})
export class ShowPdfComponent implements OnInit {

  detailSubMateri : any = {}

  constructor(
    private materiService: MateriService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.openDetailSubMateri('c146b45b-611a-4b87-b6ec-d9551dccf1c8');
  }

  openDetailSubMateri(id: any) {
    this.materiService.getSubMateriDetail(id).subscribe(res => {
      if (res.success) {
        this.detailSubMateri = res.data;
      }
    }, error => {
      console.log(error);
      this.generalService.swalAlert('Error!', 'Terjadi kesalahan dalam proses', 'error')
    });
  }

}
