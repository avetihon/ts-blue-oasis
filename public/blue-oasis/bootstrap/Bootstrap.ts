import BootstrapCompatibilityState from './BootstrapCompatibilityState';
import IStateContext from '../states/IStateContext';
import StateMachine from '../states/StateMachine';

class Bootstrap extends StateMachine<Bootstrap> implements IStateContext<Bootstrap> {

    public error: number;
    public spinner: HTMLDivElement;

    public constructor() {
        super();
    }

    public start(): void {
        this.setCurrentState(new BootstrapCompatibilityState());
    }
}

export default Bootstrap;
