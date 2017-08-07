import StateMachine from '../states/StateMachine';
import IStateContext from '../states/IStateContext';
import BootstrapCompatibilityState from './BootstrapCompatibilityState';


class Bootstrap extends StateMachine<Bootstrap> implements IStateContext<Bootstrap> {

    public error: number;

    public constructor() {
        super();

        this.setCurrentState(new BootstrapCompatibilityState());
    }


}

export default Bootstrap;
