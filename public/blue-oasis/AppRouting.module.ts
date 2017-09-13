import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import PageNotFoundComponent from './pageNotFound/PageNotFound.component';

const appRoutes: Routes = [
    { path: '',   redirectTo: '/mode', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ],
})
class AppRoutingModule {}

export default AppRoutingModule;
