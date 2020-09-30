import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import {AuthService, AuthResponseData} from './auth.service';
import { Router } from '@angular/router';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';
import { formatCurrency } from '@angular/common';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']

})
export class HomePageComponent implements OnInit {
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  isLogin = true;
  isLoading = false;
  error: string = null;
  confirmPass = false;


  checkPass(form: FormGroup) : { error: string} {
  if (form.get('logPass') && form.get('confPass')) {
    return form.get('logPass').value === form.get('confPass').value ? null : {error: "false"};
  } 
}

  constructor(private authService : AuthService, private router: Router) {

    this.registerFormGroup = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,63})$/)]),
      'logPass': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[!@#$%^&*()'"]))[A-Za-z\d!@#$%^&*()'"](?!\s).{8,}$/)]),
      'confPass': new FormControl('', [Validators.required])
    }, this.checkPass);

    this.loginFormGroup = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,63})$/)]),
      'logPass': new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    
  }
  resetForm(indicator) {
    if (indicator) {
      (<HTMLInputElement>document.getElementById('email')).value = "";
      (<HTMLInputElement>document.getElementById('password')).value = "";
    } else {
      (<HTMLInputElement>document.getElementById('email')).value = "";
      (<HTMLInputElement>document.getElementById('password')).value = "";
      (<HTMLInputElement>document.getElementById('confirmPassword')).value = "";
    }
  }
  onSwitchMode() {
    this.isLogin = !this.isLogin;
    if(this.isLogin) {
      this.loginFormGroup = this.loginFormGroup;
      this.resetForm(false);
    } else {
      this.loginFormGroup = this.registerFormGroup;
      this.resetForm(true);
    }
  }


  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.logPass;
    let authObs: Observable<AuthResponseData>;


    this.isLoading = true;
    if(this.isLogin) {
      authObs = this.authService.login(email, password)
    } else {
     authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(responseData => {
      this.isLoading = false;
      this.router.navigate(['./recipes'])
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    })


    form.reset();
  }


}
