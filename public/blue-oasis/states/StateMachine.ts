import IState from './IState';
import IStateContext from './IStateContext';
import IStateMachine from './IStateMachine';

class StateMachine<T> implements IStateMachine<T> {

    public context: IStateContext<T>;
    protected _currentState: IState<T>;
    protected _stateList: IState<T>[];

    public constructor(context?: IStateContext<T>) {
        this.context = context || this;
        this._stateList = [];
    }

    public getCurrentState(): IState<T> {
        return this._currentState;
    }

    public setCurrentState(newState: IState<T>): IState<T> {
        const previousState: IState<T> = this._currentState;
        this._stateList.push(newState);
        this._currentState = newState;
        this._currentState.run(this.context);

        return previousState;
    }
}

export default StateMachine;
