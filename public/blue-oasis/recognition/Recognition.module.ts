import { NgModule } from '@angular/core';

import RecognitionComponent from './Recognition.component';
import RecognitionRoutingModule from './RecognitionRouting.module';

@NgModule({
    declarations: [ RecognitionComponent ],
    imports: [ RecognitionRoutingModule ],
})
class RecognitionModule {}

export default RecognitionModule;
