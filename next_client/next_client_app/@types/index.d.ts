declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

declare const IAndroid = {
  onLogin(jwt: string): void;
}
