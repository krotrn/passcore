// EntryPoint.tsx
import * as React from 'react';
import { ChangePassword } from './ChangePassword';
import { ClientAppBar } from './ClientAppBar';
import { Footer } from './Footer';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Container } from '@material-ui/core';
import { theme } from '../Utils/theme';

export const EntryPoint: React.FunctionComponent<any> = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* Applies dark background and normalizes styles */}
    <React.Fragment>
      <ClientAppBar />
      <Container component="main" maxWidth="sm">
        <ChangePassword />
        <Footer />
      </Container>
    </React.Fragment>
  </ThemeProvider>
);