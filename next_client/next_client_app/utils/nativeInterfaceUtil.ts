export function deviceLogin(jwt: string): void {
  if (typeof window !== 'undefined') {
    return window.ReactNativeWebView.postMessage(
      JSON.stringify({ token: jwt })
    );
  }
}