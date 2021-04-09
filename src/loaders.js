import init_environment from "./python/init_environment.py";

const pythonInit = (callback) => {
  window.languagePluginLoader.then(() => {
    fetch(init_environment)
      .then((src) => src.text())
      .then((code) => {
        window.pyodide.loadPackage(["micropip"]).then(() => {
          window.pyodide.runPythonAsync(code).then(() => callback());
        });
      });
  });
};

export default pythonInit;
