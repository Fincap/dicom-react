import './App.css';
import Header from './components/Header';
import UploadFile from './components/UploadFile';
import { Typography, Container } from '@material-ui/core';

const App = () => {
  return (
    <Container className="App" maxWidth="md" disableGutters>
      <Header />
      <br />
      <Typography>Test paragraph, please ignore.</Typography>
      <br />
      <UploadFile />
    </Container>
  );
}

export default App;
