import { asyncRun } from "./py-worker";

const runPythonScript = (script, callback, context) => {
  fetch(script)
    .then((src) => src.text())
    .then(async (code) => {
      const { results, error } = await asyncRun(code, context);
      callback({ results, error });
    });
};

export default runPythonScript;
