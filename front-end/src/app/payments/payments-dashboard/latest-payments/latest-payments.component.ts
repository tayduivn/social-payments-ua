import {
  Component,
  OnInit
} from '@angular/core';
import * as moment from 'moment';
import { displayDateFormat } from '../../../shared/constants/date-formats';
import { LatestPaymentsService } from './latest-payments.service';
import { PersonHelper } from '../../../shared/utils/person.helper';

@Component({
  selector: 'sp-latest-payments',
  templateUrl: './latest-payments.component.html',
  styleUrls: ['./latest-payments.component.scss']
})
export class LatestPaymentsComponent implements OnInit {
  public readonly moment = moment;
  public readonly displayDateFormat = displayDateFormat;
  public readonly PersonHelper = PersonHelper;

  constructor(public latestPaymentsService: LatestPaymentsService) { }

  ngOnInit() {
  }

}
