export const STORAGE_KEY = "overshared-progress-v1";
export const emptyCase = () => ({
  reviewed: [],
  attempts: 0,
  hints: 0,
  cracked: false,
  protected: false,
  protectionAttempts: 0,
});
export const emptyProgress = () => ({ version: 1, cases: {}, sound: false });
export function normalizeAnswer(value) {
  return String(value)
    .toLowerCase()
    .replace(/[\s\-_/]/g, "");
}
export function checkAnswer(value, answer) {
  return normalizeAnswer(value) === normalizeAnswer(answer);
}
export function caseScore(state) {
  if (!state?.protected) return 0;
  return Math.max(
    100,
    300 -
      Math.max(0, state.attempts - 1) * 15 -
      state.hints * 25 -
      Math.max(0, state.protectionAttempts - 1) * 20,
  );
}
export function readProgress(storage) {
  try {
    const data = JSON.parse(storage.getItem(STORAGE_KEY));
    if (data?.version !== 1 || !data.cases || typeof data.cases !== "object")
      return emptyProgress();
    const cases = {};
    for (const id of ["glen", "shanti", "kyle", "lance"]) {
      const s = data.cases[id];
      if (!s || typeof s !== "object") continue;
      const number = (x) =>
        Number.isInteger(x) && x >= 0 && x < 10000 ? x : 0;
      cases[id] = {
        reviewed: Array.isArray(s.reviewed)
          ? [
              ...new Set(
                s.reviewed.filter(
                  (i) => Number.isInteger(i) && i >= 0 && i < 3,
                ),
              ),
            ]
          : [],
        attempts: number(s.attempts),
        hints: Math.min(2, number(s.hints)),
        cracked: s.cracked === true,
        protected: s.protected === true && s.cracked === true,
        protectionAttempts: number(s.protectionAttempts),
      };
    }
    return { version: 1, cases, sound: data.sound === true };
  } catch {
    return emptyProgress();
  }
}
export function stats(progress) {
  const states = Object.values(progress.cases);
  return {
    complete: states.filter((s) => s.protected).length,
    xp: states.reduce((sum, s) => sum + caseScore(s), 0),
  };
}
