import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import SignInComponent from './SignIn.component';

const authRoutes: Routes = [
    { path: 'signin', component: SignInComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(authRoutes) ],
    exports: [ RouterModule ]
})
class AuthRoutingModule {}

export default AuthRoutingModule;
