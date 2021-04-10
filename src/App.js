import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadFile from "./components/UploadFile";
import LoadingScreen from "./components/LoadingScreen";
import pythonInit from "./loaders";

/* List of states:
SELECT_FILES
PYTHON_INIT
LOADING_IMAGESET
DICOM_VIEW
*/

const App = () => {
  // Define state
  const [state, setState] = useState("SELECT_FILES");
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Effect hook for updating screen when scripts are loaded
  // TODO the DOMContentLoaded event is not the correct method of doing this.
  useEffect(() => {
    window.addEventListener("DOMContentLoaded", () => {
      setScriptsLoaded(true);
    });
  }, []);

  // Begin initialising python
  const beginLoad = async (fileList) => {
    console.log(fileList);
    setState("PYTHON_INIT");
    pythonInit(onPythonLoaded);
  };

  // Begin processing image set
  const onPythonLoaded = () => {
    setState("LOADING_IMAGESET");
  };

  // Control the flow between app states
  const switchStates = () => {
    switch (state) {
      case "SELECT_FILES":
        return <UploadFile onUpload={beginLoad} />;

      case "PYTHON_INIT":
        return <LoadingScreen loadingText="Loading Python" />;

      case "LOADING_IMAGESET":
        return <LoadingScreen loadingText="Loading DICOM data" />;

      default:
        return <p>An error has occured</p>;
    }
  };

  return (
    <Container className="App" maxWidth="md" disableGutters>
      <Header scriptsLoaded={scriptsLoaded} />
      <div className="main-content">{switchStates()}</div>
      <Footer />
    </Container>
  );
};

export default App;
