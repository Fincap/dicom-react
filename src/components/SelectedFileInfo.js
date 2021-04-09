import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import prettyBytes from "pretty-bytes";

const UploadInfo = ({ fileInfo }) => {
  const secondaryText =
    prettyBytes(fileInfo.size) +
    " - Last modified " +
    new Date(fileInfo.lastModified).toUTCString();

  return (
    <ListItem divider>
      <ListItemText primary={fileInfo.name} secondary={secondaryText} />
    </ListItem>
  );
};

export default UploadInfo;
