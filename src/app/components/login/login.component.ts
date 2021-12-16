import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user!: user;
  reqError: boolean = false;
  incorrectError: boolean = false;
  errorMessage: string = '';
  tfaFlag: boolean = false;

  enableTfa: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  loginForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    authcode: [''],
  });

  ngOnInit(): void {
    
  }

  // login() {
  //   console.log(this.loginForm.valid);
  //   if(this.loginForm.valid)
  //   {
  //     this.authService.getUsers().subscribe(data => {
  //       let user = data.docs.filter(d => d.data().username == this.loginForm.value.userName && d.data().password == this.loginForm.value.password);

  //       if(user != null && user.length > 0)
  //       {
  //         //redirect to home page
  //         this.reqError = false;
  //         localStorage.setItem("SessionUserName", user[0].data().username);
  //         this.router.navigateByUrl("/home"); 
  //       }
  //       else
  //       {
  //         //user not found
  //         this.reqError = false;
  //         this.incorrectError = true;
  //       }
  //     });
  //   }
  //   else
  //   {
  //     //invalid input
  //     this.reqError = true;
  //     this.incorrectError = false;
  //   }
  
  // }

  login() {
    if(this.enableTfa)
    {
      this.tfaLogin();
    }
    else
    {
      this.noTfaLogin();
    }
  }

  tfaLogin() {
    console.log(this.loginForm.value);
    this.loginService.loginAuth(this.loginForm.value).subscribe((data: any) => {
      this.errorMessage = '';
      console.log(data.body);
      if (data.body['status'] == 200) {
        this.loginService.updateAuthStatus(true);
        this.router.navigateByUrl("/home");
      }
      if (data.body['status'] === 206) {
        this.tfaFlag = true;
        //Uncomment below code to remove Two-factor auth
        this.router.navigateByUrl("/home");
      }
      if (data.body['status'] === 403) {
        this.errorMessage = data.body['message'];
      }
      if (data.body['status'] === 404) {
        this.errorMessage = data.body['message'];
      }
    })
  }

  noTfaLogin() {
    console.log(this.loginForm.valid);
    if(this.loginForm.valid)
    {
      this.loginService.getUsers().subscribe(data => {
        let user = data.docs.filter(d => d.data().username == this.loginForm.value.userName && d.data().password == this.loginForm.value.password);

        if(user != null && user.length > 0)
        {
          //redirect to home page
          this.reqError = false;
          localStorage.setItem("SessionUserName", user[0].data().username);
          this.router.navigateByUrl("/home"); 
        }
        else
        {
          //user not found
          this.reqError = false;
          this.incorrectError = true;
        }
      });
    }
    else
    {
      //invalid input
      this.reqError = true;
      this.incorrectError = false;
    }
  }

}
