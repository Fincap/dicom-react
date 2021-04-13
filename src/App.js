import "./App.css";

// JS script imports
import runPythonScript from "./python/run-py";
import loadSelectedFilesAsBytes from "./model/load-selected-files";
import convertLoadedFilesToJSON from "./model/convert-files-to-json";

// Python script imports
import init_environment from "./python/init_environment.py";

// Component imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadFile from "./components/UploadFile";
import LoadingScreen from "./components/LoadingScreen";

// Library imports
import { useState, useEffect } from "react";
import { Container, ThemeProvider } from "@material-ui/core";
// Temporary workaround to Material-UI issue resulting in an incorrect warning.
// Should be solved in Material-UI 5.0.0
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

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
  const [areScriptsLoaded, setScriptsLoaded] = useState(false);
  const [pythonContext, setPythonContext] = useState({});

  // Initalise python environment
  useEffect(() => {
    runPythonScript(init_environment).then(() => {
      pythonLoaded();
    });
  }, []);

  // Convert loaded files to JSON objects using python
  useEffect(() => {
    if (state === "LOADING_IMAGESET") {
      convertLoadedFilesToJSON(pythonContext).then((res) => {
        console.log(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pythonContext]);

  // Callback function after python `is initialised
  const pythonLoaded = () => {
    setScriptsLoaded(true);
  };

  // Menu action: Return to file select
  const returnToFileSelect = () => {
    // Set state to SELECT_FILES
    setState("SELECT_FILES");
    setPythonContext({});
  };

  // Map menu actions to object
  const menuActions = {
    returnToFileSelect: returnToFileSelect,
  };

  // Process the files selected
  const beginLoadingFiles = (fileList) => {
    setState("LOADING_IMAGESET");
    loadSelectedFilesAsBytes(fileList).then((loadedFiles) => {
      setPythonContext({
        raw_loaded: loadedFiles,
      });
    });
  };

  // Control the flow between app states
  const switchStates = () => {
    switch (state) {
      case "SELECT_FILES":
        return (
          <UploadFile
            onUpload={beginLoadingFiles}
            areScriptsLoaded={areScriptsLoaded}
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
        <Header areScriptsLoaded={areScriptsLoaded} menuActions={menuActions} />
        <div className="main-content">{switchStates()}</div>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
