declare global {
  interface Window {
    data: {
      [key: string]: string;
    };
  }
}

export const API_URL = (() => {
  return window.data?.apiUrl || "http://localhost:4200";
})();
