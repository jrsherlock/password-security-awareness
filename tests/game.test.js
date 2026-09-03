import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyCase,
  emptyProgress,
  checkAnswer,
  readProgress,
  caseScore,
  stats,
} from "../src/game.js";
test("simulation accepts case and separators without accepting incorrect details", () => {
  assert.equal(checkAnswer("Spinal Tap Derek 35", "spinaltapderek35"), true);
  assert.equal(checkAnswer("04/21/22 5AZX4", "0421225azx4"), true);
  assert.equal(checkAnswer("spinaltapderek36", "spinaltapderek35"), false);
});
test("XP rewards a protected account, never just a cracked password", () => {
  assert.equal(caseScore({ ...emptyCase(), cracked: true, attempts: 1 }), 0);
  assert.equal(
    caseScore({
      ...emptyCase(),
      cracked: true,
      protected: true,
      attempts: 1,
      protectionAttempts: 1,
    }),
    300,
  );
  assert.equal(
    caseScore({
      ...emptyCase(),
      protected: true,
      attempts: 3,
      hints: 1,
      protectionAttempts: 2,
    }),
    225,
  );
  assert.equal(
    caseScore({
      ...emptyCase(),
      protected: true,
      attempts: 100,
      hints: 2,
      protectionAttempts: 20,
    }),
    100,
  );
});
test("corrupt or unavailable local storage does not crash the game", () => {
  for (const value of ["{", "null", "[]", "{}", '{"version":5,"cases":{}}'])
    assert.deepEqual(readProgress({ getItem: () => value }), emptyProgress());
  assert.deepEqual(
    readProgress({
      getItem: () => {
        throw Error("denied");
      },
    }),
    emptyProgress(),
  );
});
test("stored case values are validated and duplicate observations cannot inflate progress", () => {
  const value = {
    version: 1,
    cases: {
      glen: {
        reviewed: [0, 0, 1, 2, 3, "0"],
        attempts: -2,
        hints: 500,
        protected: true,
        cracked: false,
      },
      intruder: { protected: true },
    },
    sound: "yes",
  };
  const p = readProgress({ getItem: () => JSON.stringify(value) });
  assert.deepEqual(p.cases.glen.reviewed, [0, 1, 2]);
  assert.equal(p.cases.glen.attempts, 0);
  assert.equal(p.cases.glen.hints, 2);
  assert.equal(p.cases.glen.protected, false);
  assert.equal(p.sound, false);
  assert.equal(p.cases.intruder, undefined);
  assert.deepEqual(stats(p), { complete: 0, xp: 0 });
});
