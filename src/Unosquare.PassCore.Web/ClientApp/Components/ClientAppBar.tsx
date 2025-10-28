// ClientAppBar.tsx
import { AppBar, Grid, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import * as React from 'react';
import { GlobalContext } from '../Provider/GlobalContext';
import nitLogo from '../assets/images/download.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // AppBar color will come from theme.palette.primary.main
    appBar: {
      minHeight: theme.mixins.toolbar.minHeight, // was 64px
    },
    gridContainer: {
      minHeight: theme.mixins.toolbar.minHeight, // was 64px
      width: '100%',
    },
    logoContainer: {
      paddingLeft: theme.spacing(2), // was 1.5%
      // Removed fixed width
    },
    logo: {
      marginLeft: theme.spacing(2), // 15px
      maxWidth: '125px',
      verticalAlign: 'middle', // Aligns logo better with text
    },
    helpIcon: {
      paddingRight: theme.spacing(2), // was 1%
    },
  }),
);

export const ClientAppBar: React.FunctionComponent<any> = () => {
  const classes = useStyles();
  const { changePasswordForm, changePasswordTitle } = React.useContext(GlobalContext);
  const { helpText } = changePasswordForm;

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Grid
        container={true}
        className={classes.gridContainer}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography variant="h6" color="secondary" className={classes.logoContainer}>
          <img src={nitLogo} className={classes.logo} />
        </Typography>
        <Tooltip title={helpText} placement="left">
          <HelpIcon color="secondary" className={classes.helpIcon} />
        </Tooltip>
      </Grid>
    </AppBar>
  );
};