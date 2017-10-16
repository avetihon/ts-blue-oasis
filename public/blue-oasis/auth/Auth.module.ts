import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import AuthRoutingModule from './AuthRouting.module';
import AuthService from './Auth.service';
import SignInComponent from './SignIn.component';


@NgModule({
    declarations: [ SignInComponent ],
    imports: [ FormsModule, AuthRoutingModule ],
    providers: [ AuthService ],
})
class AuthModule {}

export default AuthModule;
