import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-recover',
  templateUrl: './confirm-recover.component.html',
  styleUrls: ['./confirm-recover.component.scss']
})
export class ConfirmRecoverComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;
  public email: string = '';
  public name: string = '';

  public constructor(private readonly _fb: FormBuilder, private readonly router: Router) { }

  public updateUser() {
    this.router.navigateByUrl('/user/login');
  }

  ngOnInit(): void {
    this.email = 'samuelgsete@gmail.com';
    this.name = 'Samuel';

    this.form = this._fb.group({
      code: ['12345', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      newPassword: ['123456', Validators.required],
      confirmPassword: ['123456', Validators.required],
    });
  }
}
