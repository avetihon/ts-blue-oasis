class LocalStorage {

    public static setItem(key: string, value: any): void {
        localStorage.setItem(key, value);
    }

    public static getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    public static removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}

export default LocalStorage;
