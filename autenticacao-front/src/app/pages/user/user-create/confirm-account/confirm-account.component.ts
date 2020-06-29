import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {

  public code: FormControl;
  public email: string = '';
  public name: string = '';
  public loading: boolean = false;

  public constructor(private readonly router: Router) { 
    this.email = 'samuelgsete@gmail.com';
    this.name = 'Samuel';
  }

  public toNewUser() {
    this.router.navigateByUrl('/user/create');
  }

  public finalizeRegistration() {
    this.router.navigateByUrl('/user/login');
  }

  ngOnInit(): void {
    this.code = new FormControl('59334', {
      validators: [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(5)
      ]
    });
  }
}