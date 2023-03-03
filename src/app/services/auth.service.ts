import { Injectable } from '@angular/core';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string){
    return new Promise<void>(
      (resolve, reject) =>{
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error: any) => {
            reject(error);
          }
        );
      }
    );
  }
  
  signInUser(email: string, password: string){
    return new Promise<void>(
      (resolve, reject) =>{
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        ); 
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

}
