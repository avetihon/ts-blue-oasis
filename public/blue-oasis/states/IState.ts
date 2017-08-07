import IStateContext from './IStateContext';

interface IState<T> {
    run(context: IStateContext<T>): void;
}

export default IState;
