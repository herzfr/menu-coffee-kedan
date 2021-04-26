import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.css']
})
export class TableDialogComponent implements OnInit {

  selectedValue: number;
  selects = [];




  constructor(
    public dialogRef: MatDialogRef<TableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit() {
    for (var i = 1; i <= 30; i++) {
      this.selects.push(i);
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}


export interface Food {
  value: number;
  viewValue: string;
}


