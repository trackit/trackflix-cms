import {
  Box,
  Typography,
  Container,
  Button,
  Modal,
  TextField,
  Autocomplete,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from "react";
import users from '../../draft/users.json';
import { Save } from "@mui/icons-material";

interface User {
  name: string;
  email: string;
  role: string;
}

const NewUserModal = (props: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Container>
      <Modal
        open={props.open}
        onClose={() => props.setOpen(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            p: 4,
            backgroundColor: 'white',
            border: 'none',
          }}
        >
          <Typography id="user-modal-title" variant="h6" component="h2" sx={{ paddingBottom: 2 }}>
            Create a new user
          </Typography>
          <TextField
            required
            id='name'
            label='Name'
            color='primary'
            sx={{ paddingBottom: 2, margin: 'auto' }}
          />
          <TextField
            required
            id='email'
            label='Email'
            color='primary'
            sx={{ paddingBottom: 2 }}
          />
          <Autocomplete
            id='role'
            options={users['available-roles']}
            renderInput={(params) => <TextField {...params} label='Role' />}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 2,
            }}
          >
            <Button variant="contained" sx={{ marginRight: 2 }} onClick={() => props.setOpen(!props.open)} color='inherit'>
              Cancel
            </Button>
            <Button variant="contained" endIcon={<Save />} color='inherit'>
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export const Users = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User>();

  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>();
  const gridFields: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      editable: false,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      editable: false,
    },
  ];

  return (
    <Container>
      {
        openModal ? (
          <NewUserModal
            open={openModal}
            setOpen={setOpenModal}
          />
        ) : null
      }
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Typography variant='h5'>Users</Typography>
        <Button variant='contained' color='inherit' onClick={() => setOpenModal(!openModal)}>Create</Button>
      </Box>
      <DataGrid
        rows={users.users}
        columns={gridFields}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
      />
    </Container>
  );
}
