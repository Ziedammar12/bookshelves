import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/database';import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
onSignOut() {
throw new Error('Method not implemented.');
}

  isAuth: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user: any) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  ngSignOut() {
    this.authService.signOutUser();
  }

}
