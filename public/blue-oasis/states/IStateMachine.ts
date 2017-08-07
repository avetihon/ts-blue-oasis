import IState from './IState';
import IStateContext from './IStateContext';

interface IStateMachine<T> {
    context: IStateContext<T>;
    getCurrentState(): IState<T>;
    setCurrentState(newState: IState<T>): IState<T>;
}

export default IStateMachine;
