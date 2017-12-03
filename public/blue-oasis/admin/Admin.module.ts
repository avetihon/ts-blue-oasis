import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import AdminRoutingModule from './AdminRouting.module';
import AdminTrainingComponent from './training/AdminTraining.component';
import AdminChartDataComponent from './chartData/adminChartData.component';
import AdminChartDataResolveService from './chartData/adminChartDataResolve.service';

@NgModule({
    declarations: [ AdminTrainingComponent, AdminChartDataComponent ],
    imports: [
        CommonModule,
        ChartsModule,
        AdminRoutingModule
    ],
    providers: [
        AdminChartDataResolveService
    ],
})
class AdminModule {}

export default AdminModule;
