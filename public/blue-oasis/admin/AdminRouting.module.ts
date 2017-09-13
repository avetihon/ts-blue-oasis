import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import AuthGuard from '../services/AuthGuard.service';
import AdminTrainingComponent from './training/AdminTraining.component';


const adminRoutes: Routes = [
    { path: 'admin/training', component: AdminTrainingComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [ RouterModule.forChild(adminRoutes) ],
    exports: [ RouterModule ],
})
class AdminRoutingModule {}

export default AdminRoutingModule;
