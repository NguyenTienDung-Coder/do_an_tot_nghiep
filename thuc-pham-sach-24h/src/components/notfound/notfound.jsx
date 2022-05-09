import React from "react";
import { Container404, Wrapper, H404, A} from "./style/notfound.styled";
import Homepage from "../home/Homepage";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Category from "../category";
Notfound.proTypes = {};

function Notfound () {
    return (
        <Container404>
            <Box
            sx={{ maxWidth: 480, margin: 'auto', marginTop: '50px', marginBottom: '50px', textAlign: 'center' }}>
            <Typography
            variant="h3" paragraph>
                Sorry, page not found!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL?
              Be sure to check your spelling.
            </Typography>
            <Box
                component="img"
                src="https://raw.githubusercontent.com/minimal-ui-kit/material-kit-react/2596d7fb3315112bb383c94c4d94f5906e4acf40/public/static/illustrations/illustration_404.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
              <Button
            href="/"
            sx={{ backgroundColor: "#43a047" }}
            size="large" variant="contained" color="success">
                Go to Home
            </Button>
            </Box>
        </Container404>
    )
}
export default Notfound;