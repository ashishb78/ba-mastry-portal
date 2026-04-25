export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback
    }

    try {
      const rawValue = window.localStorage.getItem(key)

      if (rawValue === null) {
        return fallback
      }

      return JSON.parse(rawValue) as T
    } catch {
      return fallback
    }
  },

  set<T>(key: string, value: T) {
    if (typeof window === 'undefined' || !window.localStorage) {
      return
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage quota and parsing-related browser errors for now.
    }
  },

  remove(key: string) {
    if (typeof window === 'undefined' || !window.localStorage) {
      return
    }

    try {
      window.localStorage.removeItem(key)
    } catch {
      // Ignore storage removal failures for now.
    }
  },
}
