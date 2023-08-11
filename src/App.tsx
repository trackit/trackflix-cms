import { ThemeProvider, createTheme, CssBaseline, Box, Toolbar } from "@mui/material";
import { Router } from "./Router";
import { Sidebar } from "./components/Sidebar";
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans'
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ p: 3 }}
      >
        <Sidebar />
        <Toolbar />
        <Router />
      </Box>
    </ThemeProvider>
  );
}

export default App;
