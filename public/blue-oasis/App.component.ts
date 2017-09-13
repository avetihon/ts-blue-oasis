import { Component, OnInit } from '@angular/core';
import Config from './config/Config';

@Component({
    selector: Config.APPLICATION_SELECTOR,
    templateUrl: './app.component.html',
})
class AppComponent implements OnInit {
    public name: string = 'World';

    public ngOnInit() {}
}

export default AppComponent;
