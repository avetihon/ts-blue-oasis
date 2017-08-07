import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import ModeComponent from './Mode.component';

const modeRoutes: Routes = [
    { path: 'mode', component: ModeComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(modeRoutes) ],
    exports: [ RouterModule ]
})
class ModeRoutingModule {}

export default ModeRoutingModule;
