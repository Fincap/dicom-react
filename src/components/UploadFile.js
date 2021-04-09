import { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import SelectedFileList from "./SelectedFileList";
import Alert from "./Alert";

const UploadFile = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [currentAlertText, setCurrentAlertText] = useState("");
  const [currentAlertOpen, setCurrentAlertOpen] = useState(false);

  const handleAlertClose = () => {
    setCurrentAlertOpen(false);
  };

  const readFiles = (files) => {
    setSelectedFiles([...files]);
    setIsFilePicked(true);
  };

  const loadSelectedFiles = () => {
    if (selectedFiles.length === 0) {
      setCurrentAlertText("No files selected.");
      setCurrentAlertOpen(true);
    } else {
      onUpload(selectedFiles);
    }
  };

  return (
    <div className="upload-file">
      <Alert
        open={currentAlertOpen}
        handleClose={handleAlertClose}
        text={currentAlertText}
      />
      <Button variant="contained" color="primary" component="label">
        Choose Files
        <input
          accept="*"
          id="upload-file"
          multiple
          hidden
          type="file"
          onChange={(e) => readFiles(e.target.files)}
        />
      </Button>
      {isFilePicked ? (
        <>
          <SelectedFileList selectedFiles={selectedFiles} />
          <Button
            variant="contained"
            color="primary"
            component="label"
            onClick={loadSelectedFiles}
          >
            Load Selected Files
          </Button>
        </>
      ) : (
        <Typography>Select a file to show details</Typography>
      )}
    </div>
  );
};

export default UploadFile;
