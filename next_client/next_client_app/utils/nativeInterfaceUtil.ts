export function deviceLogin(jwt: string): void {
  return IAndroid.onLogin(jwt);
}