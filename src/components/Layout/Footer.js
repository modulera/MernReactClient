
import { Link } from 'react-router-dom';

import {
    Box,
    Container,
    Typography,
} from '@mui/material';

const Footer = (props) => {
    return (
        <Box component="footer" {...props}>
            <Container maxWidth="sm">
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    {"Copyright © "}
                    <Link to='/'>AppName</Link>
                    {" " + new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
}


export default Footer;