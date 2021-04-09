import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import UploadFile from "./components/UploadFile";
import { Container } from "@material-ui/core";

/* List of states:
SELECT_FILES
PYTHON_INIT
LOADING_IMAGESET
DICOM_VIEW
*/

const App = () => {
  const [state, setState] = useState("SELECT_FILES");

  const beginLoad = (fileList) => {
    console.log(fileList);
    setState("PYTHON_INIT");
  };

  const switchStates = () => {
    switch (state) {
      case "SELECT_FILES":
        return <UploadFile onUpload={beginLoad} />;

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
