import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false

  public constructor(private readonly _fb: FormBuilder, private readonly router: Router) { }

  public toUserLogin() {
    this.router.navigateByUrl('user/login');
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      username: ['samuelgsete', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['gsete', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

}
