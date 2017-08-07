class XMLHttpRequestEventType {

    public static readonly READY_STATE_CHANGE: string = 'readystatechange';

    public static readonly LOAD_START: string = 'loadstart';

    public static readonly PROGRESS: string = 'progress';

    public static readonly ABORT: string = 'abort';

    public static readonly LOAD: string = 'load';

    public static readonly TIMEOUT: string = 'timeout';

    public static readonly LOAD_END: string = 'loadend';

    public static readonly ERROR: string = 'error';

    private constructor() {}
}

export default XMLHttpRequestEventType;
