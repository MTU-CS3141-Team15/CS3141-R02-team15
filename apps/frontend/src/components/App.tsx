import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, Typography } from "@mui/material";
import { lightTheme } from "../themes/light";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box>
        <Typography>
          Hello World: {process.env.REACT_APP_BACKEND_URL}
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default App;
