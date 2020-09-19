import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {RegistrationService} from '../services/registration.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private toastr: ToastrService
  ) { 
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      mobile_number: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      // dob:['', Validators.required]
    });
  }

  ngOnInit() {
  }

  register(){
    this.registrationService.register({
      'first_name': this.registerForm.value.first_name,
      "last_name": this.registerForm.value.last_name,
      "email": this.registerForm.value.email,
      "password": this.registerForm.value.password,
      "mobile": this.registerForm.value.mobile_number,
      // "birth_date": this.registerForm.value.dob
    })
    .subscribe((response: any) => {
      this.toastr.success("User register successfully");
    },
    error => {
      console.log('--error of register--', error);
    })
  }

}
