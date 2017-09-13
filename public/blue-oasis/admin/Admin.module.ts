import { NgModule } from '@angular/core';

import AdminRoutingModule from './AdminRouting.module';
import AdminTrainingComponent from './training/AdminTraining.component';

@NgModule({
    declarations: [ AdminTrainingComponent ],
    imports: [ AdminRoutingModule ],
})
class AdminModule {}

export default AdminModule;
