import "./App.css";
import { useState, useEffect } from "react";
import { Container, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadFile from "./components/UploadFile";
import LoadingScreen from "./components/LoadingScreen";
import pythonInit from "./loaders";

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

  useEffect(() => {
    const loadPython = async () => pythonInit(pythonLoaded);
    loadPython();
  }, []);

  const pythonLoaded = () => {
    setScriptsLoaded(true);
  };

  // Begin initialising python
  const loadFiles = async (fileList) => {
    console.log(fileList);
    setState("LOADING_IMAGESET");
  };

  // Control the flow between app states
  const switchStates = () => {
    switch (state) {
      case "SELECT_FILES":
        return <UploadFile onUpload={loadFiles} />;

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
