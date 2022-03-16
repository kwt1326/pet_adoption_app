export function mergeList(existing: [], incoming: [], page: number = 1) {
  let _existing = existing;
  if (page === 1) _existing = [];
  return [..._existing, ...incoming];
}