import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { UserdataService } from './service/userdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'globalstart';
  loggedin:string= undefined;
  loggedinObs:Observable<string>;
  readstring: Observable<string>;
  readarray: Observable<string[]>;
  readmap: Observable<any>;
  readarraymap:Observable<any[]>;

  displayame:string;
  titleDialogRef: MatDialogRef<DialogOverviewExampleDialog>
  constructor(public dialog: MatDialog, public afAuth: AngularFireAuth,
    public tutorialService: UserdataService) {
    this.afAuth.authState.pipe(
      map((credential:any) => {
      if (credential !== null) {
        console.log('credential-!null,ReachedLogin-success', credential);        
        this.loggedin='true';
        this.readstring= this.tutorialService.ReadTestString().pipe(map((val:any)=>{
          return(val.data());
        }));
        this.readarray= this.tutorialService.ReadTestStringArr().pipe(map((val:any)=>{
          return(val.data());
        }));
        this.readmap= this.tutorialService.ReadTestMap().pipe(map((val:any)=>{
          return(val.data());
        }));
        this.readarraymap= this.tutorialService.ReadTestMapArr().pipe(map((val:any)=>{
          return(val.data());
        }));

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
