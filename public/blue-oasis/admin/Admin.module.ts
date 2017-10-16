import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import AdminRoutingModule from './AdminRouting.module';
import AdminTrainingComponent from './training/AdminTraining.component';


@NgModule({
    declarations: [ AdminTrainingComponent ],
    imports: [ CommonModule, AdminRoutingModule ],
})
class AdminModule {}

export default AdminModule;
