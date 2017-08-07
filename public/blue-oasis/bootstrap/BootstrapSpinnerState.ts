import Bootstrap from './Bootstrap';
import BootstrapAbstractState from './BootstrapAbstractState';
import BootstrapAngularState from './BootstrapAngularState';
import Config from '../config/Config';

class BootstrapSpinnerState extends BootstrapAbstractState {

    public static readonly SPINNER_CLASS: string = 'c-spinner';
    public static readonly SPINNER_CHILD_CLASS: string = 'c-spinner__child';
    public static readonly SPINNER_CHILD_MODIFIER: string = 'c-spinner__child--';
    public static readonly SPINNER_ELEMENTS_NUMBER: number = 12;

    public constructor() {
        super();
    }

    public run(context: Bootstrap): void {
        super.run(context);

        this._create();
    }

    protected _create(): void {
        const documentFragment: DocumentFragment = document.createDocumentFragment();
        const applicationElement: Element = document.getElementsByTagName(Config.APPLICATION_SELECTOR)[0];

        const spinner: HTMLDivElement = document.createElement('div');
        let spinnerChild: HTMLDivElement;

        let i: number;
        for (i = 1; i <= BootstrapSpinnerState.SPINNER_ELEMENTS_NUMBER; i += 1) {
            spinnerChild = document.createElement('div');
            spinnerChild.classList.add(BootstrapSpinnerState.SPINNER_CHILD_CLASS);
            spinnerChild.classList.add(BootstrapSpinnerState.SPINNER_CHILD_MODIFIER + i);
            spinner.appendChild(spinnerChild);
        }

        spinner.classList.add(BootstrapSpinnerState.SPINNER_CLASS);
        documentFragment.appendChild(spinner);

        applicationElement.appendChild(documentFragment);

        this._toNextState();
    }

    protected _remove(): void {
        let spinner: HTMLDivElement = document.querySelector(BootstrapSpinnerState.SPINNER_CLASS) as HTMLDivElement;
        let parentNode: Node = spinner.parentNode;

        parentNode.removeChild(spinner);
    }

    protected _toNextState(): void {
        this._context.setCurrentState(new BootstrapAngularState());
    }
}

export default BootstrapSpinnerState;
