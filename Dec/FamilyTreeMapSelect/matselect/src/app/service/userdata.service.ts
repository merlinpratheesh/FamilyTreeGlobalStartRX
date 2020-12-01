import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {  doc } from 'rxfire/firestore';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(public auth: AngularFireAuth,private db: AngularFirestore) { }
  login() {
    return this.auth.signInWithPopup( new (firebase.auth as any).GoogleAuthProvider());
  }
  logout() {
    return this.auth.signOut();
  }

  ReadTestString(){
    return doc(this.db.firestore.doc('TestCollection/TestString'));
  }
  ReadTestStringArr(){
    return doc(this.db.firestore.doc('TestCollection/TestArray'));
  }
  ReadTestMap(){
    return doc(this.db.firestore.doc('TestCollection/TestMap'));
  }
  ReadTestMapArr(){
    return doc(this.db.firestore.doc('TestCollection/TestArrayMap'));
  }


}

