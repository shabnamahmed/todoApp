import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  constructor(private router: Router) { }
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
  signIn() {
    console.log(this.form.value);
    var email = this.form.controls['email'].value;
    var password = this.form.controls['pwd'].value;

    var list: any = [];
    list = JSON.parse(localStorage.getItem('register') || '{}');
    console.log(list);
    for (var i = 0; i < list.length; i++) {

      if ((list[i].email == email) && (list[i].password == password)) {
        console.log(list[i].email, list[i].password, list[i].id);
        this.router.navigate(['/list', list[i].id]);
      }
      else {
        console.log("error");
        this.error = true;
        this.msg = "Worng Credentials";
      }
    }

  }

  goToRegister() {
    console.log("button clicked");
    this.router.navigate(['register']);

  }

  close() {
    this.error = false;
  }
}
