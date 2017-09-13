import Bootstrap from './Bootstrap';
import BootstrapAbstractState from './BootstrapAbstractState';
import BootstrapErrorList from './BootstrapErrorList';
import BootstrapErrorState from './BootstrapErrorState';

/**
 * Angular bootstrapping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

/**
 * App Module
 * Our top level module that holds all of our components
 */
import AppModule from '../App.module';

class BootstrapAngularState extends BootstrapAbstractState {
    public constructor() {
        super();
    }

    public run(context: Bootstrap): void {
        super.run(context);

        this._bootstrapAngular();
    }

    protected _bootstrapAngular(): void {

        platformBrowserDynamic()
            .bootstrapModule(AppModule)
            .then(() => console.log('Success started!'))
            .catch((error: Error) => this._toErrorState(error));
    }

    protected _toErrorState(error: Error): void {
        const spinner = this._context.spinner;
        debugger;
        const parentNode: Node = spinner.parentNode;

        parentNode.removeChild(spinner);
        this._context.error = BootstrapErrorList.ANGULAR_ERROR;
        this._context.setCurrentState(new BootstrapErrorState(error));
    }
}

export default BootstrapAngularState;
