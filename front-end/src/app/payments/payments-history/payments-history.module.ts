import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { FinancialInstitutionModule } from '../../shared/components/financial-institution/financial-institution.module';
import { PersonModule } from '../../shared/components/person/person.module';
import { PaymentsHistoryComponent } from './payments-history.component';
import { PaymentsHistoryService } from './payments-history.service';
import { HistoryTableComponent } from './history-table/history-table.component';
import { HistoryFilterComponent } from './history-filter/history-filter.component';
import { FilterChipComponent } from './history-filter/filter-chip/filter-chip.component';
import { CodeKFKModule } from '../../shared/components/code-kfk/code-kfk.module';
import { CodeKEKModule } from '../../shared/components/code-kek/code-kek.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    CommonModule,
    FinancialInstitutionModule,
    PerfectScrollbarModule,
    PersonModule,
    ReactiveFormsModule,
    CodeKFKModule,
    CodeKEKModule
  ],
  entryComponents: [PaymentsHistoryComponent],
  declarations: [PaymentsHistoryComponent, HistoryTableComponent, HistoryFilterComponent, FilterChipComponent],
  providers: [PaymentsHistoryService]
})
export class PaymentsHistoryModule { }
