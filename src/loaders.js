import { asyncRun } from "./python/py-worker";

const runPythonScript = (script, callback) => {
  fetch(script)
    .then((src) => src.text())
    .then(async (code) => {
      await asyncRun(code);
      callback();
    });
};

export default runPythonScript;
