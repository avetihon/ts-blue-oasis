import { NgModule } from '@angular/core';

import AdminTrainingComponent from './training/AdminTraining.component';
import AdminRoutingModule from './AdminRouting.module';
import AdminService from '../services/Admin.service';

@NgModule({
    declarations: [ AdminTrainingComponent ],
    imports: [ AdminRoutingModule ],
    providers: [ AdminService ]
})
class AdminModule {}

export default AdminModule;
