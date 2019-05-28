import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sp-code-kfk',
  templateUrl: './code-kfk.component.html',
  styleUrls: ['./code-kfk.component.scss']
})
export class CodeKFKComponent implements OnInit {
  public codeKFK = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit() {
  }

}
