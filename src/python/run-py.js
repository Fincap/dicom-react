import { asyncRun } from "./py-worker";

const runPythonScript = (script, callback, context) => {
  fetch(script)
    .then((src) => src.text())
    .then(async (code) => {
      const { results } = await asyncRun(code, context);
      callback(results);
    });
};

export default runPythonScript;
