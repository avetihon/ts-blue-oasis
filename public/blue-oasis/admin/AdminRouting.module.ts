import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import AdminTrainingComponent from './training/AdminTraining.component';

const adminRoutes: Routes = [
    { path: 'admin/training', component: AdminTrainingComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(adminRoutes) ],
    exports: [ RouterModule ]
})
class AdminRoutingModule {}

export default AdminRoutingModule;
