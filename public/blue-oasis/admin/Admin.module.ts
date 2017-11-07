import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import AdminRoutingModule from './AdminRouting.module';
import AdminTrainingComponent from './training/AdminTraining.component';
import AdminDataComponent from './data/adminData.component';

@NgModule({
    declarations: [ AdminTrainingComponent, AdminDataComponent ],
    imports: [
        CommonModule,
        ChartsModule,
        AdminRoutingModule
    ],
})
class AdminModule {}

export default AdminModule;
