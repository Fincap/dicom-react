import "./App.css";

// JS script imports
import runPythonScript from "./python/run-py";
import loadFiles from "./model/load-files";

// Python script imports
import init_environment from "./python/init_environment.py";
import load_dataset_as_json from "./python/load_dataset_as_json.py";

// Component imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadFile from "./components/UploadFile";
import LoadingScreen from "./components/LoadingScreen";

// Library imports
import { useState, useEffect } from "react";
import { Container, createMuiTheme, ThemeProvider } from "@material-ui/core";

/* List of states:
SELECT_FILES
LOADING_IMAGESET
DICOM_VIEW
*/

// Create theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5e35b1",
      light: "#9162e4",
      dark: "#280680",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#546e7a",
      light: "#819ca9",
      dark: "#29434e",
      contrastText: "#ffffff",
    },
  },
});

const App = () => {
  // Define state
  const [state, setState] = useState("SELECT_FILES");
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [pythonContext, setPythonContext] = useState({});

  // Initalise python environment
  useEffect(() => {
    runPythonScript(init_environment).then(() => {
      pythonLoaded();
    });
  }, []);

  // Callback function after python `is initialised
  const pythonLoaded = () => {
    setScriptsLoaded(true);
  };

  // Process the files selected
  const beginLoadingFiles = (fileList) => {
    setState("LOADING_IMAGESET");
    loadFiles(fileList).then((loadedFiles) => {
      setPythonContext({
        raw_loaded: loadedFiles,
      });
    });
  };

  // Convert loaded files to JSON objects using python
  useEffect(() => {
    if (state === "LOADING_IMAGESET") {
      loadEachFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pythonContext]);

  const loadEachFile = async () => {
    // Asynchronous but sequential processing of each file selected using reducer.
    const datasetList = await pythonContext.raw_loaded.reduce(
      async (memo, file, index) => {
        console.log(index);
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
    console.log(datasetList);
  };

  // Control the flow between app states
  const switchStates = () => {
    switch (state) {
      case "SELECT_FILES":
        return (
          <UploadFile
            onUpload={beginLoadingFiles}
            scriptsLoaded={scriptsLoaded}
          />
        );

      case "LOADING_IMAGESET":
        return <LoadingScreen loadingText="Loading DICOM data" />;

      default:
        return <p>An error has occured</p>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="App" maxWidth="md" disableGutters>
        <Header scriptsLoaded={scriptsLoaded} />
        <div className="main-content">{switchStates()}</div>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
