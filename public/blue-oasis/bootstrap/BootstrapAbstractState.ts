import Bootstrap from './Bootstrap';
import IState from '../states/IState';

abstract class BootstrapAbstractState implements IState<Bootstrap> {

    protected _context: Bootstrap;
    public constructor() {}

    public run(context: Bootstrap) {
        this._context = context;
    }
}

export default BootstrapAbstractState;
