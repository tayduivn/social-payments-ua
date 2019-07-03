import { Component, OnInit, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import { CodeKFKComponent } from '../../shared/components/code-kfk/code-kfk.component';
import { CodeKEKComponent } from '../../shared/components/code-kek/code-kek.component';
import { CipherReportService } from './cipher-report.service';

@Component({
  selector: 'sp-cipher-report',
  templateUrl: './cipher-report.component.html',
  styleUrls: ['./cipher-report.component.scss']
})
export class CipherReportComponent {
  public date: Moment = null;
  public cipherCode = '';

  public get buttonDisabled(): boolean {
    return !this.date ||
      !this.codeKEKComponent.codeKEK.value ||
      !this.codeKFKComponent.codeKFK.value ||
      !this.cipherCode;
  }

  @ViewChild(CodeKFKComponent)
  private codeKFKComponent: CodeKFKComponent;
  @ViewChild(CodeKEKComponent)
  private codeKEKComponent: CodeKEKComponent;

  constructor(private cipherReportService: CipherReportService) { }

  public onGenerateClick() {
    this.cipherReportService.requestReport({
      date: this.date
    } as any);
  }
}
