import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare const $: any;

@Component( {
  selector : 'app-sidebar',
  templateUrl : './sidebar.html',
  styleUrls: ['./sidebar.scss']
} )
export class SidebarComponent implements OnInit {

  buttonActive = '';
  menuItem = [
    {
      menuName: "Beranda",
      link: 'dashboard',
    },
    {
      menuName: "Materi",
      link: 'course'
    }
  ];

  constructor (
    private router: Router,
    private route: ActivatedRoute,
  ) {
    let temp = this.menuItem.filter(p => p.link == this.router.url.split('/')[1]);
    this.buttonActive = temp[0].menuName;
  }


  ngOnInit () {
  }

  goto(menu: any){
    this.buttonActive = menu.menuName;
    this.router.navigate(['/', menu.link]);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
