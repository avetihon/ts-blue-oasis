import IState from './IState';

interface IStateContext<T> {
    getCurrentState(): IState<T>;
}

export default IStateContext;
