// remove duplicate list
const mergeArr = (a, b) => {
  return Array.from(new Set([...a, ...b].map(m => m.__ref))).map(r => ({ __ref: r }))
}

export function mergeList(existing: [], incoming: [], page: number = 1) {
  let _existing = existing;
  if (page === 1) _existing = [];
  return mergeArr(_existing, incoming);
}