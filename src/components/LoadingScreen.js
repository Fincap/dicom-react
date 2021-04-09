import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const LoadingScreen = ({ loadingText }) => {
  return (
    <div>
      <CircularProgress />
      <Typography>{loadingText}</Typography>
    </div>
  );
};

export default LoadingScreen;
