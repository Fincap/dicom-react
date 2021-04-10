import "./App.css";
import { useState } from "react";
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
  const [state, setState] = useState("SELECT_FILES");

  const beginLoad = async (fileList) => {
    console.log(fileList);
    setState("PYTHON_INIT");
    pythonInit(onPythonLoaded);
  };

  const onPythonLoaded = () => {
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
      <div className="main-content">{switchStates()}</div>
      <Footer />
    </Container>
  );
};

export default App;
