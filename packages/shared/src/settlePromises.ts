export async function settlePromises<T extends Record<string, unknown>, D>(
  promises: T,
  defaultValue: D,
) {
  const promiseEntries = Object.entries(promises);
  const keys = promiseEntries.map(([key]) => key);
  const values = promiseEntries.map(([, value]) => value);
  const results = (await Promise.allSettled(values)).map((v) =>
    v.status === "fulfilled" ? v.value : defaultValue,
  );

  const entries = keys.map((key, i) => [key, results[i]]);

  return Object.fromEntries(entries) as { [K in keyof T]: Awaited<T[K]> | D };
}
