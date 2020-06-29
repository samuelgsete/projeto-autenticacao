import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;
  
  public constructor(private readonly _fb: FormBuilder, private readonly router: Router) { }

  public toNewUser() {
    this.router.navigateByUrl('/user/create');
  }

  public toRecoverAccount() {
    this.router.navigateByUrl('/recover/account');
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      username: ['samuelgsete', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['gsete', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }
}