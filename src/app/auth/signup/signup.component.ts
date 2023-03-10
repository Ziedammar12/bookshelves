import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signUpForm =this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required ]],

    });
  }
  
  /*Validators.pattern('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')*/
  onSubmit(){
    const email = this.signUpForm?.get('email')?.value;
    const password = this.signUpForm?.get('password')?.value;
    this.authService.createNewUser(email, password).then (
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );

  }


}
