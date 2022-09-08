import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private generalService: GeneralService
  ) { }

  async ngOnInit() {
    this.authService.isLoggedIn().then(status => {
      if (status) {
        this.router.navigateByUrl('/');
      }
    });

    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value, (result: any) => {
        if(result)
          console.log('login');
      });
    } else {
      this.generalService.swalAlert('Error!', 'Email atau password tidak boleh kosong', 'error');
    }
  }

}
