import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import AuthService from '../services/Auth.service';
import AuthRoutingModule from './AuthRouting.module';
import SignInComponent from './SignIn.component';


@NgModule({
    declarations: [ SignInComponent ],
    imports: [ FormsModule, AuthRoutingModule ],
    providers: [ AuthService ]
})
class AuthModule {}

export default AuthModule;
