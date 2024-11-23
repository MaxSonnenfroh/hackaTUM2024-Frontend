import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [NgApexchartsModule],
  exports: [NgApexchartsModule],
})
export class ApexChartsModule {
  series: any;
}
