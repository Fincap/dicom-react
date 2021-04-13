import runPythonScript from "../python/run-py";
import load_dataset_as_json from "../python/load_dataset_as_json.py";

const convertLoadedFilesToJSON = async (pythonContext) => {
  // Asynchronous but sequential processing of each file selected using reducer.
  const datasetList = await pythonContext.raw_loaded.reduce(
    async (memo, file, index) => {
      // Wait for the previous result to be calculated
      const prevResults = await memo;
      // Calculate the current result
      const context = { ...pythonContext, cur_file: index };
      const { results, error } = await runPythonScript(
        load_dataset_as_json,
        context
      );
      if (results) {
        // If the python script runs without errors, format the result and append the result to the list of
        // previous results.
        let formattedResult = results.replace(/./, "[");
        formattedResult = formattedResult.replace(/.$/, "]");
        formattedResult = formattedResult.replaceAll(/\\/g, "");
        const resultingDataset = JSON.parse(formattedResult)[0];
        return [...prevResults, resultingDataset];
      } else if (error) {
        // Otherwise, log the error and just return the existing list of results, skipping over the current one.
        console.log(error);
        return prevResults;
      }
    },
    []
  );
  return datasetList;
};

export default convertLoadedFilesToJSON;
