import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean = false;

  public constructor(private readonly _fb: FormBuilder, private readonly router: Router) { }

  public toLogin() {
    this.router.navigateByUrl('/user/login');
  }

  public createUser() {
    this.router.navigateByUrl('/confirm/account');
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: ['Samuel', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      surname: ['Souza', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      email: ['samuelgsete@gmail.com', [Validators.required, Validators.email]],
      whatzapp: ['(85) 98971-1010', [Validators.required]],
      username: ['samuelgsete', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['123456', Validators.required]
    });
  }
}
