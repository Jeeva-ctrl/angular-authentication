import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Authenticationservice } from '../services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  returnUrl: string;
  error: '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: Authenticationservice
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login('teset', 'test');
  }
}
