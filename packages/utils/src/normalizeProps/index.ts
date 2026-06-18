export function normalizeProps(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()),
      v,
    ]),
  )
}
