import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faCoffee = faCoffee;
  detailUser : any;

  constructor(
  ) { 
    let temp : any = localStorage.getItem('user');
    this.detailUser = JSON.parse(temp);
  }

  ngOnInit(): void {
  }

}
