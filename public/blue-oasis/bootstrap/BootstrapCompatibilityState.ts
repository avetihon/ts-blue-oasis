import Bootstrap from './Bootstrap';
import BootstrapAbstractState from './BootstrapAbstractState';
import BootstrapErrorState from './BootstrapErrorState';
import BootstrapErrorList from './BootstrapErrorList';
import BootstrapServerState from './BootstrapServerState';

class BootstrapCompatibilityState extends BootstrapAbstractState {
    public constructor() {
        super();
    }

    public run(context: Bootstrap): void {
        super.run(context);

        this._check();
    }

    protected _check(): void {
        if ('ontouchstart' in document.documentElement) {
            this._toNextState();
        } else {
            this._toErrorState();
        }
    }

    protected _toNextState(): void {
        this._context.setCurrentState(new BootstrapServerState());
    }

    protected _toErrorState(): void {
        this._context.error = BootstrapErrorList.COMPATIBILITY_ERROR;
        this._context.setCurrentState(new BootstrapErrorState());
    }
}

export default BootstrapCompatibilityState;
