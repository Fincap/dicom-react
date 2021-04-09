import "./App.css";
import Header from "./components/Header";
import UploadFile from "./components/UploadFile";
import { Container } from "@material-ui/core";

const App = () => {
  const beginLoad = (fileList) => {
    console.log(fileList);
  };

  return (
    <Container className="App" maxWidth="md" disableGutters>
      <Header />
      <br />
      <UploadFile onUpload={beginLoad} />
    </Container>
  );
};

export default App;
