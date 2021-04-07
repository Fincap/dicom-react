import { Button } from '@material-ui/core';

const UploadFile = () => {
  return (
    <Button variant="contained" color="primary" component="label">
      Upload
      <input accept="image/*" id="upload-file" multiple hidden type="file" />
    </Button>
  )
}

export default UploadFile;
