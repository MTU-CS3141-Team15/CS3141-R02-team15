export default class APIRequest {
  private static getURL(path: string) {
    return `${process.env.REACT_APP_BACKEND_URL}${path}`;
  }

  static get(path: string) {
    return fetch(this.getURL(path), { method: "GET", credentials: "include" });
  }

  static post(path: string, body: unknown) {
    return fetch(this.getURL(path), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  static put(path: string, body: unknown) {
    return fetch(this.getURL(path), {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  static delete(path: string) {
    return fetch(this.getURL(path), {
      method: "DELETE",
      credentials: "include",
    });
  }
}
