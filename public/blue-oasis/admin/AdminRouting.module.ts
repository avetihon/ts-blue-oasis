import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import AuthGuard from '../services/AuthGuard.service';
import AdminTrainingComponent from './training/AdminTraining.component';
import AdminChartDataComponent from './chartData/adminChartData.component';
import AdminChartDataResolveService from './chartData/adminChartDataResolve.service';

const adminRoutes: Routes = [
    { path: 'admin/training', component: AdminTrainingComponent, canActivate: [AuthGuard] },
    {
        path: 'admin/chart-data',
        component: AdminChartDataComponent,
        canActivate: [AuthGuard],
        resolve: {
            chartData: AdminChartDataResolveService,
        },
    }
];

@NgModule({
    imports: [ RouterModule.forChild(adminRoutes) ],
    exports: [ RouterModule ],
})
class AdminRoutingModule {}

export default AdminRoutingModule;
