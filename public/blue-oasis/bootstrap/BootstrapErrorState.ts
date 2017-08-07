import Bootstrap from './Bootstrap';
import BootstrapAbstractState from './BootstrapAbstractState';
import BootstrapErrorList from './BootstrapErrorList';

class BootstrapErrorState extends BootstrapAbstractState {

    public static readonly ERROR_TITLE: string = 'Something wrong here';

    public static readonly MAIN_CLASS: string = 'c-bootstrap-error';
    public static readonly STYLE_CLASS: string = 'c-bootstrap-error--style';
    public static readonly IMAGE_CLASS: string = 'c-bootstrap-error__image';
    public static readonly TITLE_CLASS: string = 'c-bootstrap-error__title';
    public static readonly DESCRIPTION_CLASS: string = 'c-bootstrap-error__description';

    public static readonly IMAGE_LINK: string = './assets/images/bootstrap/error.png';

    protected _error: Error;

    public constructor(error?: Error) {
        super();

        this._error = error;
    }

    public run(context: Bootstrap): void {
        super.run(context);

        let errorDescription: string;
        switch (context.error) {
            case BootstrapErrorList.COMPATIBILITY_ERROR: {
                errorDescription = 'Sorry, this site work only on mobile phones (and tablets)';
                break;
            }
            case BootstrapErrorList.SERVER_ERROR: {
                errorDescription = 'Sorry, we\'re having some technical issue with server';
                break;
            }
            case BootstrapErrorList.ANGULAR_ERROR: {
                errorDescription = 'Sorry, something wrong with our framework. Try to refresh the page, sometime works ;)';
                break;
            }
            default: {
                errorDescription = 'Sorry, we\'re having some unexpected error';
            }
        }

        this.__showError(errorDescription);
    }

    private __showError(description: string): void {
        const errorElement: HTMLDivElement = document.createElement('div');
        const errorImage: HTMLImageElement = document.createElement('img');
        const errorTitle: HTMLParagraphElement = document.createElement('p');
        const errorDescription: HTMLParagraphElement = document.createElement('p');

        /* Style error element */
        errorElement.classList.add(BootstrapErrorState.MAIN_CLASS);
        errorElement.classList.add(BootstrapErrorState.STYLE_CLASS);

        /* Style error image */
        errorImage.classList.add(BootstrapErrorState.IMAGE_CLASS);
        errorImage.src = BootstrapErrorState.IMAGE_LINK;
        errorImage.alt = 'Error';

        /* Style title element */
        errorTitle.classList.add(BootstrapErrorState.TITLE_CLASS);
        errorTitle.textContent = BootstrapErrorState.ERROR_TITLE;

        /* Style description element */
        errorDescription.classList.add(BootstrapErrorState.DESCRIPTION_CLASS);
        errorDescription.textContent = description;

        /* Compose element */
        errorElement.appendChild(errorImage);
        errorElement.appendChild(errorTitle);
        errorElement.appendChild(errorDescription);
        document.body.appendChild(errorElement);

        console.log(this._error);
    }
}

export default BootstrapErrorState;
