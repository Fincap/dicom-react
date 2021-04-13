import { asyncRun } from "./py-worker";

const runPythonScript = (script, context) => {
  return new Promise((resolve, reject) => {
    fetch(script)
      .then((src) => src.text())
      .then(async (code) => {
        try {
          const { results, error } = await asyncRun(code, context);
          resolve({ results, error });
        } catch (error) {
          reject({ error });
        }
      });
  });
};

export default runPythonScript;
