import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';

import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor(private firebase: AngularFireDatabase) { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
      .on( 'value', (data: { val: () => Book[]; }) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();

      });

  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books' +id).once('value').then(
          (data: { val: () => unknown; }) => {
            resolve(data.val());
          }, (error: any) => {
            reject(error);
          }
        );
      }
    );

  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('photo supprimée !');
        }
      ).catch(
        (error: string) => {
          console.log('Fichier non trouvé : ' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
               (bookEl: Book) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Erreur de chargement : ' +error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref);
          }
        );
      }
    );
  }


}


