import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private authService: AuthGuardService) { }

  ngOnInit(): void {
  }

  // logout() {
  //   this.authService.emptySessionUsername();
  //   this.router.navigateByUrl("/login"); 
  // }

  logout() {
    this.loginService.logoutUser();
    this.authService.emptySessionUsername();
    this.router.navigate(['/login']);
  }
}
