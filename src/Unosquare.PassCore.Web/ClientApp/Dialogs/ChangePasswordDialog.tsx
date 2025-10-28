// ChangePasswordDialog.tsx
import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { GlobalContext } from '../Provider/GlobalContext';

interface IChangePasswordDialogProps {
  open: boolean;
  onClose: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: '10px 0 0 75%',
      width: '25%',
    },
  }),
);

export const ChangePasswordDialog: React.FunctionComponent<IChangePasswordDialogProps> = ({
  open,
  onClose,
}: IChangePasswordDialogProps) => {
  const classes = useStyles();
  const { successAlertBody, successAlertTitle } = React.useContext(GlobalContext).alerts;
  return (
    <Dialog open={open} disableEscapeKeyDown={true} disableBackdropClick={true}>
      <DialogTitle>{successAlertTitle}</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">{successAlertBody}</Typography>
        <Button variant="contained" color="primary" onClick={onClose} className={classes.button}>
          Ok
        </Button>
      </DialogContent>
    </Dialog>
  );
};