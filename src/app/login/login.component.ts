import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private loginService: LoginService) {

  }

  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });


  onSubmit(): void {
    console.log("submit")
    this.loginService.signin(this.loginForm.value['username'], this.loginForm.value['password'])
  }
}
