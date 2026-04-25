export const storage = {
  get<T>(key: string, fallback: T): T {
    void key
    return fallback
  },
  set(key: string, value: unknown) {
    void key
    void value
  },
}
