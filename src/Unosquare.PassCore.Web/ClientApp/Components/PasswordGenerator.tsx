// PasswordGenerator.tsx
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FileCopy from '@material-ui/icons/FileCopy';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as React from 'react';
import { LoadingIcon } from 'uno-material-ui/dist/LoadingIcon';
import { SnackbarContext } from '../Provider/GlobalContext';
import { IPasswordGenProps } from '../types/Components';
import { fetchRequest } from '../Utils/FetchRequest';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      paddingTop: theme.spacing(4), // 30px
    },
    textField: {
      height: '20px',
      margin: theme.spacing(4, 0), // 30px 0 30px 0
    },
  }),
);

export const PasswordGenerator: React.FunctionComponent<IPasswordGenProps> = ({
  value,
  setValue,
}: IPasswordGenProps) => {
  const classes = useStyles();
  const { sendMessage } = React.useContext(SnackbarContext);
  const [visibility, setVisibility] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  const onMouseDownVisibility = () => setVisibility(true);
  const onMouseUpVisibility = () => setVisibility(false);

  const copyPassword = () => {
    navigator.clipboard.writeText(value);
    sendMessage('Password copied');
  };

  const retrievePassword = () => {
    fetchRequest('api/password/generated', 'GET').then((response: any) => {
      if (response && response.password) {
        setValue(response.password);
        setLoading(false);
      }
    });
  };

  React.useEffect(() => {
    retrievePassword();
  }, []);

  return isLoading ? (
    <div className={classes.loadingContainer}>
      <LoadingIcon />
    </div>
  ) : (
    <TextField
      id="generatedPassword"
      disabled={true}
      label="New Password"
      value={value}
      type={visibility ? 'text' : 'password'} // Corrected type
      className={classes.textField}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onMouseDown={onMouseDownVisibility}
              onMouseUp={onMouseUpVisibility}
              tabIndex={-1}
            >
              {visibility ? <Visibility /> : <VisibilityOff />}
            </IconButton>
            <IconButton aria-label="Copy password to clipboard" onClick={copyPassword} tabIndex={-1}>
              <FileCopy />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};