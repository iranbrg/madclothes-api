export default interface ICacheProvider {
    set(key: string, value: any, time?: number): Promise<void>
    get<T>(key: string): Promise<T | null>
    del(key: string): Promise<void>
    delPrefix(prefix: string): Promise<void>;
}
