import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import prettyBytes from "pretty-bytes";

const UploadInfo = ({ fileInfo }) => {
  const fileSize = prettyBytes(fileInfo.size);

  return (
    <ListItem divider>
      <ListItemText primary={fileInfo.name} secondary={fileSize} />
    </ListItem>
  );
};

export default UploadInfo;
