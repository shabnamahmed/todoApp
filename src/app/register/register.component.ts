import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(private router: Router, private location: Location) { }
  // for display login page ; false display register page
  login = true;
  error: any;
  msg: any;

  // adding registration details
  registeration: any = [];

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [(Validators.required),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      pwd: new FormControl('', [(Validators.required), Validators.pattern("^(?=.*[0-9])"
        + "(?=.*[a-z])(?=.*[A-Z])"
        + "(?=.*[@#$%^&+=])"
        + "(?=\\S+$).{8,20}$")]),

      username: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.form.controls;
  }
  register(username: any, email: any, password: any) {
    console.log(username, password, email);


    this.registeration = JSON.parse(localStorage.getItem('register') || '[]');

    var n = this.registeration.length;
    var list: any = new Set();
    if (n == 0) {
      this.registeration.push({ id: this.registeration.length, email: email, password: password, username: username });
      localStorage.setItem('register', JSON.stringify(this.registeration));
      this.router.navigate(['/list', this.registeration.length])
    }
    else {
      this.registeration.forEach((element: any) => {
        if (element.email == email) {
          this.error = true;
          this.msg = "Email Already Exist";

        }
        else {
          this.registeration.push({ id: this.registeration.length, email: email, password: password, username: username });


          localStorage.setItem('register', JSON.stringify(this.registeration));
          this.router.navigate(['/list', this.registeration.length])
        }

      });

    }

  }



  goBack() {
    this.location.back();
  }
  close() {
    this.error = false;
  }
}
