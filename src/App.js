import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import UploadFile from "./components/UploadFile";
import LoadingScreen from "./components/LoadingScreen";
import { Container } from "@material-ui/core";

/* List of states:
SELECT_FILES
PYTHON_INIT
LOADING_IMAGESET
DICOM_VIEW
*/

const App = () => {
  const [state, setState] = useState("SELECT_FILES");

  const beginLoad = async (fileList) => {
    console.log(fileList);
    setState("PYTHON_INIT");
    await new Promise((r) => setTimeout(r, 2000)); // Sample loading time until Pyodide setup actually implemented.
    setState("LOADING_IMAGESET");
  };

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
      <Header />
      <br />
      {switchStates()}
    </Container>
  );
};

export default App;
