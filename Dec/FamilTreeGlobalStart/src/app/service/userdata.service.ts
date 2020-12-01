import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export interface TestDocument{
  stringtype: string; 
}

export interface TestArrayNew{
 
  arraytype: string[]; 
 }
 export interface SomeDocument{
  fathername: string; 
  mothername: string; 

}
 export interface TestArrayMap{
  maptype: SomeDocument[]; 
 }

 export interface TestMapString{
  Name: string;
  Place:string;
 }
@Injectable({
  providedIn: 'root'
})
export class UserdataService {


  constructor(public auth: AngularFireAuth, private db: AngularFirestore) { }
  login() {
    return this.auth.signInWithPopup( new (firebase.auth as any).GoogleAuthProvider());
  }
  logout() {
    return this.auth.signOut();
  }
  getDocumentPath(collectionName:string, documentId: string){
    const collectionPath= collectionName + '/' + documentId ;   
    return this.db.doc<TestDocument>(collectionPath).valueChanges();   
  }
  getDocumentPathNew(collectionName:string, documentId: string){
    const collectionPath= collectionName + '/' + documentId ;   
    return this.db.doc<TestArrayNew>(collectionPath).valueChanges();   
  }
  getDocumentArrayMap(collectionName:string, documentId: string){
    const collectionPath= collectionName + '/' + documentId ;   
    return this.db.doc<TestArrayMap>(collectionPath).valueChanges();   
  }
}
