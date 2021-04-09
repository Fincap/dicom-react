import { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import SelectedFileList from "./SelectedFileList";

const UploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const readFiles = (files) => {
    setSelectedFiles([...files]);
    setIsFilePicked(true);
  };

  return (
    <div className="upload-file">
      <Button variant="contained" color="primary" component="label">
        Upload
        <input
          accept=".dcm,.dicom"
          id="upload-file"
          multiple
          hidden
          type="file"
          onChange={(e) => readFiles(e.target.files)}
          onClick={(e) => {
            e.currentTarget.value = null;
          }}
        />
      </Button>
      {isFilePicked ? (
        <SelectedFileList selectedFiles={selectedFiles} />
      ) : (
        <Typography>Select a file to show details</Typography>
      )}
    </div>
  );
};

export default UploadFile;
