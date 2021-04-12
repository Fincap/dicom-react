import { asyncRun } from "./py-worker";

const runPythonScript = (script, callback, context) => {
  fetch(script)
    .then((src) => src.text())
    .then(async (code) => {
      try {
        const { results, error } = await asyncRun(code, context);
        callback({ results, error });
      } catch (error) {
        callback({ error });
      }
    });
};

export default runPythonScript;
