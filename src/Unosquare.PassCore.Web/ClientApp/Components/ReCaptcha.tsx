// ReCaptcha.tsx
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { GlobalContext } from '../Provider/GlobalContext';
import GoogleReCaptcha from './GoogleReCaptcha';

interface IRecaptchaProps {
  setToken: any;
  shouldReset: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // This was centered by the parent ChangePasswordForm
      // No additional styles needed, but we keep it for structure
    },
  }),
);

export const ReCaptcha: React.FunctionComponent<IRecaptchaProps> = ({ setToken, shouldReset }: IRecaptchaProps) => {
  const classes = useStyles();
  // tslint:disable-next-line
  let captchaRef: any;

  const { siteKey } = React.useContext(GlobalContext).recaptcha;

  React.useEffect(() => {
    if (captchaRef) {
      captchaRef.reset();
    }
  }, [shouldReset]);

  const onLoadRecaptcha = () => {
    if (captchaRef) {
      captchaRef.reset();
    }
  };

  const verifyCallback = (recaptchaToken: any) => setToken(recaptchaToken);

  return (
    <div className={classes.root}>
      <GoogleReCaptcha
        ref={(el: any) => {
          captchaRef = el;
        }}
        size="normal"
        render="explicit"
        sitekey={siteKey}
        onloadCallback={onLoadRecaptcha}
        onSuccess={verifyCallback}
        theme="dark" // Explicitly set reCaptcha theme to dark
      />
    </div>
  );
};