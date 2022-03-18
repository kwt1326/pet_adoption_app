declare global {
  interface Window {
    ReactNativeWebView: any;
  }
}

declare interface Window {
  ReactNativeWebView: any;
}

declare const IAndroid = {
  onLogin(jwt: string): void;
}
