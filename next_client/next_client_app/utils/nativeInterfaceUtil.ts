export function deviceLogin(jwt: string): void {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    return window.ReactNativeWebView.postMessage(
      JSON.stringify({ token: jwt })
    );
  }
}