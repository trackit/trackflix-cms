import { Box, AppBar, Typography, Container, Button } from "@mui/material";

export const Users = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black', alignItems: 'center' }}>
        <Typography>Users</Typography>
        <Button variant='contained' color='inherit'>Create</Button>
      </Box>
    </Container>
  );
}
