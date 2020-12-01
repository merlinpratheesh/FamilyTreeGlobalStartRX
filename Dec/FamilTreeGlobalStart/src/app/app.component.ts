import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';
import { UserdataService ,TestDocument,TestArrayNew,TestArrayMap} from './service/userdata.service';
import { ArrayType, MapType } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'globalstart';
  loggedin:string= undefined;
  loggedinObs:Observable<string>;
  displayame:string;

  titleDialogRef: MatDialogRef<DialogOverviewExampleDialog>
  myarraydisplay: [] = [];
  Componentvar: TestDocument | undefined;
  Componentvar1: string[] | undefined;
  Componentvar2: TestArrayMap | undefined;

  mysubDocRead: Subscription | undefined;
  myitemsdisplay: Observable<TestDocument>;
  myitemsdisplayArray: Observable<TestArrayNew> | undefined;
  myitemsdisplayArrayMap: Observable<TestArrayMap>| undefined;


  constructor(public dialog: MatDialog, public afAuth: AngularFireAuth,
    public tutorialService: UserdataService) {
    this.afAuth.authState.pipe(
      map((credential:any) => {
      if (credential !== null) {
        console.log('credential-!null,ReachedLogin-success', credential);        
        this.loggedin='true';
        this.displayame = credential.displayName;
        return 'true';
      }else{
        console.log('credential-null,ReachedLogout', credential,false);
        this.loggedin='false';//show skeleton & show login screen
        this.titleDialogRef.close();
        this.openDialog('loggedout');
        return 'false';
      }
    })).subscribe(mydata=>{
      if(mydata === 'true'){

        this.titleDialogRef.close();
        this.myitemsdisplay = this.tutorialService.getDocumentPath('FamilyTreeCollection', 'mKSvt6u1jnp2Au14dCF7').pipe(take(1));

        this.mysubDocRead = this.myitemsdisplay.subscribe(testdataSubscribed => {
          this.Componentvar = testdataSubscribed;

          if (testdataSubscribed !== null) {
            for (const fieldkey in testdataSubscribed) {
              console.log(fieldkey, testdataSubscribed[fieldkey]);//keys & values              
            }
            console.log(this.Componentvar?.stringtype)
          }
        });
        this.myitemsdisplayArray = this.tutorialService.getDocumentPathNew('FamilyTreeCollection', 'mKSvt6u1jnp2Au14dCF7').pipe(take(1));
        this.mysubDocRead = this.myitemsdisplayArray.subscribe(testdataSubscribedNew => {
          this.Componentvar1 = testdataSubscribedNew.arraytype;
          if (testdataSubscribedNew !== null) {
            for (let i = 0; i < this.Componentvar1.length; i++) {
              console.log(this.Componentvar1[i]);
            }
            this.Componentvar1.forEach((value) => {
              console.log(value);
            });
          }
        });
        this.myitemsdisplayArrayMap = this.tutorialService.getDocumentArrayMap('FamilyTreeCollection', 'mKSvt6u1jnp2Au14dCF7').pipe(take(1));
        this.mysubDocRead = this.myitemsdisplayArrayMap.subscribe(testdataSubscribedMap => {
          this.Componentvar2 = testdataSubscribedMap;
          if (testdataSubscribedMap !== null) {
            for (const fieldkey in testdataSubscribedMap) {
              console.log(fieldkey, testdataSubscribedMap[fieldkey]);//keys & values              
            }
            
              console.log(this.Componentvar2?.maptype);
    
          }
        });
      }
    });

  }

  ngOnInit(){
    this.openDialog('loggingin');
  }

  openDialog(status: string): void {
    this.titleDialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: status
    });

    this.titleDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template:`
  <div *ngIf="data === 'loggedout'">
  <mat-label>login now!</mat-label>
  <button mat-icon-button> 
  <fa-icon (click)="tutorialService.login()" class="fas faSignInAlt fa-lg" [icon]="['fas', 'sign-in-alt']">
  </fa-icon>
  </button>
</div>
  <mat-spinner  *ngIf="data !== 'loggedout'"></mat-spinner>
  `
})
export class DialogOverviewExampleDialog {
  mydata='showspinner';
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:string, public tutorialService: UserdataService) {
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
