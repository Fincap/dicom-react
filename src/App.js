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
      console.log({ ...pythonContext, val: "test" });
      // What we might be able to do is iterate through each file loaded, add that to the context, then call a python
      // scripts to convert each dataset to a json string INDIVIDUALLY rather than return an array of string (which
      // doesn't work apparently).
      runPythonScript(load_dataset_as_json, pythonContext).then(
        ({ results, error }) => {
          finishLoadingFiles({ results, error });
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pythonContext]);

  // Callback function after files are loaded as JSON objects
  const finishLoadingFiles = ({ results, error }) => {
    if (results) {
      let formattedResult = results.replace(/./, "[");
      formattedResult = formattedResult.replace(/.$/, "]");
      formattedResult = formattedResult.replaceAll(/\\/g, "");
      const testDataset = JSON.parse(formattedResult);
      console.log(testDataset[0]);
    } else if (error) {
      console.log(error);
    }
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
