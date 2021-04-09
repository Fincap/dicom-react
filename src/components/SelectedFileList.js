import List from "@material-ui/core/List";
import { Typography } from "@material-ui/core";
import SelectedFileInfo from "./SelectedFileInfo";

const SelectedFileList = ({ selectedFiles }) => {
  return (
    <>
      <Typography variant="overline" display="block" align="left">
        {selectedFiles.length} files selected
      </Typography>
      <List>
        {selectedFiles.map((file) => (
          <SelectedFileInfo key={file.name} fileInfo={file} />
        ))}
      </List>
    </>
  );
};

export default SelectedFileList;
