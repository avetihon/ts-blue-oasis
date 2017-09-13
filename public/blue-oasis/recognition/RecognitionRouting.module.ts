import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import RecognitionComponent from './Recognition.component';

const recognitionRoutes: Routes = [
    { path: 'recognition', component: RecognitionComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(recognitionRoutes) ],
    exports: [ RouterModule ],
})
class RecognitionRoutingModule {}

export default RecognitionRoutingModule;
