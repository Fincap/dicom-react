import './App.css';
import Header from './components/Header';
import { Typography } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Header />
      <br />
      <Typography>Test paragraph, please ignore.</Typography>
    </div>
  );
}

export default App;
