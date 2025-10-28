// Footer.tsx
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import * as React from 'react';
import nitLogo from '../assets/images/download.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5), // 40px
      width: '100%', // Responsive
      padding: theme.spacing(2, 0),
      borderTop: `1px solid ${theme.palette.divider}`, // Nice divider
    },
    logo: {
      marginLeft: theme.spacing(2), // 15px
      maxWidth: '125px',
    },
  }),
);

export const Footer: React.FunctionComponent<any> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid alignItems="center" container={true} direction="row" justify="space-between">
        <Grid item={true} xs={8}>
          <img src={nitLogo} className={classes.logo} />
        </Grid>
      </Grid>
      {/* <Grid alignItems="center" container={true} direction="column" justify="space-evenly">
        <Typography align="center" variant="caption">
          brought to you by CSE 2023-27 Batch
        </Typography>
        <Typography align="center" variant="caption">
          Copyright © CSE@NITAP 2023-27
        </Typography>
      </Grid> */}
    </div>
  );
};