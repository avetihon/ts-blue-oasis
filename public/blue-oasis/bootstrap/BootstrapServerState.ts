import Bootstrap from './Bootstrap';
import BootstrapAbstractState from './BootstrapAbstractState';
import BootstrapErrorList from './BootstrapErrorList';
import BootstrapErrorState from './BootstrapErrorState';
import BootstrapSpinnerState from './BootstrapSpinnerState';
import XMLHttpRequestEventType from '../config/XMLHttpRequestEventType';
import HTTPRequestMethods from '../config/HTTPRequestMethods';
import { environment } from "../environments/environment";


class BootstrapServerState extends BootstrapAbstractState {

    public static readonly PATH: string = '/helloServer';
    public constructor() {
        super();
    }

    public run(context: Bootstrap): void {
        super.run(context);

        this._check();
    }

    protected _check(): void {
        // this._toNextState();
        this._sendRequest();
    }

    protected _toNextState(): void {
        this._context.setCurrentState(new BootstrapSpinnerState());
    }

    protected _toErrorState(): void {
        this._context.error = BootstrapErrorList.SERVER_ERROR;
        this._context.setCurrentState(new BootstrapErrorState());
    }

    protected _sendRequest(): void {
        const xhr: XMLHttpRequest = new XMLHttpRequest();

        xhr.open(HTTPRequestMethods.GET, environment.apiPublicUrl + BootstrapServerState.PATH);
        xhr.addEventListener(XMLHttpRequestEventType.LOAD, this, false);
        xhr.send();
    }

    public handleEvent(event: Event): void {
        switch (event.type) {
            case XMLHttpRequestEventType.LOAD: {
                const xhr: XMLHttpRequest = event.target as XMLHttpRequest;

                xhr.removeEventListener(XMLHttpRequestEventType.LOAD, this, false);
                this._toNextState();
                break;
            }
            case XMLHttpRequestEventType.ERROR: {
                this._toErrorState();
            }
        }
    }
}

export default BootstrapServerState;
