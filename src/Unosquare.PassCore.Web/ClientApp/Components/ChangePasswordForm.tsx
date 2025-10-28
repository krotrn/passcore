// ChangePasswordForm.tsx
import { FormGroup } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { TextValidator } from 'uno-material-ui';
import { useStateForModel } from 'uno-react';
import { GlobalContext } from '../Provider/GlobalContext';
import { IChangePasswordFormInitialModel, IChangePasswordFormProps } from '../types/Components';
import { PasswordGenerator } from './PasswordGenerator';
import { PasswordStrengthBar } from './PasswordStrengthBar';
import { ReCaptcha } from './ReCaptcha';

const defaultState: IChangePasswordFormInitialModel = {
    CurrentPassword: '',
    NewPassword: '',
    NewPasswordVerify: '',
    Recaptcha: '',
    Username: new URLSearchParams(window.location.search).get('userName') || '',
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formGroup: {
            width: '100%', // Was 80% + margin
            margin: 0,
        },
        textField: {
            // Replaces all the inline margin/height styles
            marginBottom: theme.spacing(3),
        },
        newPasswordHelp: {
            font: '12px Roboto,Helvetica, Arial, sans-serif',
            marginBottom: theme.spacing(2),
            color: theme.palette.text.secondary, // Get text color from theme
        },
        recaptchaContainer: {
            marginTop: theme.spacing(3),
            display: 'flex',
            justifyContent: 'center', // Center recaptcha
        },
    }),
);

export const ChangePasswordForm: React.FunctionComponent<IChangePasswordFormProps> = ({
    submitData,
    toSubmitData,
    parentRef,
    onValidated,
    shouldReset,
    changeResetState,
    setReCaptchaToken,
    ReCaptchaToken,
}: IChangePasswordFormProps) => {
    const classes = useStyles();
    const [fields, handleChange] = useStateForModel({ ...defaultState });

    const { changePasswordForm, errorsPasswordForm, usePasswordGeneration, useEmail, showPasswordMeter, recaptcha } =
        React.useContext(GlobalContext);

    // ... (All your logic and variables remain the same) ...
    const {
        currentPasswordHelpblock,
        currentPasswordLabel,
        newPasswordHelpblock,
        newPasswordLabel,
        newPasswordVerifyHelpblock,
        newPasswordVerifyLabel,
        usernameDefaultDomainHelperBlock,
        usernameHelpblock,
        usernameLabel,
    } = changePasswordForm;

    const { fieldRequired, passwordMatch, usernameEmailPattern, usernamePattern } = errorsPasswordForm;

    const userNameValidations = ['required', useEmail ? 'isUserEmail' : 'isUserName'];
    const userNameErrorMessages = [fieldRequired, useEmail ? usernameEmailPattern : usernamePattern];
    const userNameHelperText = useEmail ? usernameHelpblock : usernameDefaultDomainHelperBlock;

    React.useEffect(() => {
        if (submitData) {
            toSubmitData(fields);
        }
    }, [submitData]);

    React.useEffect(() => {
        if (parentRef.current !== null && parentRef.current.isFormValid !== null) {
            parentRef.current.isFormValid().then((response: any) => {
                let validated = response;
                if (recaptcha.siteKey && recaptcha.siteKey !== '') {
                    validated = validated && ReCaptchaToken !== '';
                }
                onValidated(!validated);
            });
        }
    });

    React.useEffect(() => {
        if (shouldReset) {
            handleChange({ ...defaultState });
            changeResetState(false);
            if (parentRef.current && parentRef.current.resetValidations) {
                parentRef.current.resetValidations();
            }
        }
    }, [shouldReset]);

    const setGenerated = (password: any) =>
        handleChange({
            NewPassword: password,
            NewPasswordVerify: password,
        });

    return (
        <FormGroup row={false} className={classes.formGroup}>
            <TextValidator
                autoFocus={true}
                inputProps={{ tabIndex: 1 }}
                id="Username"
                label={usernameLabel}
                helperText={userNameHelperText}
                name="Username"
                onChange={handleChange}
                validators={userNameValidations}
                value={fields.Username}
                className={classes.textField}
                margin="normal"
                fullWidth={true}
                errorMessages={userNameErrorMessages}
            />
            <TextValidator
                inputProps={{ tabIndex: 2 }}
                label={currentPasswordLabel}
                helperText={currentPasswordHelpblock}
                id="CurrentPassword"
                name="CurrentPassword"
                onChange={handleChange}
                type="password"
                validators={['required']}
                value={fields.CurrentPassword}
                className={classes.textField}
                margin="normal"
                fullWidth={true}
                errorMessages={[fieldRequired]}
            />
            {usePasswordGeneration ? (
                <PasswordGenerator value={fields.NewPassword} setValue={setGenerated} />
            ) : (
                <>
                    <TextValidator
                        inputProps={{ tabIndex: 3 }}
                        label={newPasswordLabel}
                        id="NewPassword"
                        name="NewPassword"
                        onChange={handleChange}
                        type="password"
                        validators={['required']}
                        value={fields.NewPassword}
                        className={classes.textField}
                        margin="normal"
                        fullWidth={true}
                        errorMessages={[fieldRequired]}
                    />
                    {showPasswordMeter && <PasswordStrengthBar newPassword={fields.NewPassword} />}
                    <div
                        dangerouslySetInnerHTML={{ __html: newPasswordHelpblock }}
                        className={classes.newPasswordHelp}
                    />
                    <TextValidator
                        inputProps={{ tabIndex: 4 }}
                        label={newPasswordVerifyLabel}
                        helperText={newPasswordVerifyHelpblock}
                        id="NewPasswordVerify"
                        name="NewPasswordVerify"
                        onChange={handleChange}
                        type="password"
                        validators={['required', `isPasswordMatch:${fields.NewPassword}`]}
                        value={fields.NewPasswordVerify}
                        className={classes.textField}
                        margin="normal"
                        fullWidth={true}
                        errorMessages={[fieldRequired, passwordMatch]}
                    />
                </>
            )}

            {recaptcha.siteKey && recaptcha.siteKey !== '' && (
                <div className={classes.recaptchaContainer}>
                    <ReCaptcha setToken={setReCaptchaToken} shouldReset={false} />
                </div>
            )}
        </FormGroup>
    );
};