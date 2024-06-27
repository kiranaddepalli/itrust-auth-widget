import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    //padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    flexGrow: 1,
  },
}));

export default function Workspace({ children }) {
  const classes = useStyles();


  return <Box className={classes.container}>{children}</Box>;
}
