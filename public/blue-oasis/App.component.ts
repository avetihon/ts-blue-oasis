import { Component } from '@angular/core';
import Config from './config/Config';

@Component({
    selector: Config.APPLICATION_SELECTOR,
    templateUrl: './app.component.html',
})
class AppComponent {
    public name: string = 'World';
}

export default AppComponent;
