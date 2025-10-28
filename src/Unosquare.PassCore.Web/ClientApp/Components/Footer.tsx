import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography/Typography';
import * as React from 'react';
import nitLogo from '../assets/images/download.png';

export const Footer: React.FunctionComponent<any> = () => (
    <div
        style={{
            marginTop: '40px',
            width: '650px',
        }}
    >
        <Grid alignItems="center" container={true} direction="row" justify="space-between">
            <Grid item={true} xs={8}>
                <img src={nitLogo} style={{ marginLeft: '15px', maxWidth: '125px' }} />
            </Grid>
        </Grid>
        <Grid alignItems="center" container={true} direction="column" justify="space-evenly">
            <Typography align="center" variant="caption">
                brought to you by CSE 2023-27 Batch
            </Typography>
            <Typography align="center" variant="caption">
                Copyright © CSE@NITAP 2023-27
            </Typography>
        </Grid>
    </div>
);
