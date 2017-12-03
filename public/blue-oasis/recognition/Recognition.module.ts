import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import RecognitionComponent from './Recognition.component';
import RecognitionRoutingModule from './RecognitionRouting.module';

@NgModule({
    declarations: [ RecognitionComponent ],
    imports: [ CommonModule, RecognitionRoutingModule ],
})
class RecognitionModule {}

export default RecognitionModule;
