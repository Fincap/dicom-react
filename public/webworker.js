/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

/* Code from Pyodide documentation:
https://pyodide.org/en/0.17.0a2/usage/webworker.html */

self.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.17.0a2/full/";
importScripts("https://cdn.jsdelivr.net/pyodide/v0.17.0a2/full/pyodide.js");

let pythonLoading;
async function loadPythonPackages() {
  await languagePluginLoader;
  pythonLoading = self.pyodide.loadPackage(["micropip"]);
}

self.onmessage = async (event) => {
  await languagePluginLoader;
  // since loading package is asynchronous, we need to make sure loading is done:
  await pythonLoading;
  // Don't bother yet with this line, suppose our API is built in such a way:
  const { python, ...context } = event.data;
  // The worker copies the context in its own "memory" (an object mapping name to values)
  for (const key of Object.keys(context)) {
    self[key] = context[key];
  }
  // Now is the easy part, the one that is similar to working in the main thread:
  try {
    self.postMessage({
      results: await self.pyodide.runPythonAsync(python),
    });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};
