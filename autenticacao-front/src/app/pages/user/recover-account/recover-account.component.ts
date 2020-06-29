import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss']
})
export class RecoverAccountComponent implements OnInit {

  public email: FormControl;
  public loading: boolean = false;

  public constructor(private readonly router: Router) { }

  public toNewUser() {
    this.router.navigateByUrl('user/create');
  }

  public verifyUser() {
    this.router.navigateByUrl('confirm/recover');
  }

  ngOnInit(): void {
    this.email = new FormControl('samuelgsete@gmail.com', {
      validators: [
        Validators.required, 
        Validators.email
      ]
    });
  }
}