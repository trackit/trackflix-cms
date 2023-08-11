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

import { Modal as NewModal } from "../../components/Modal";
import { TextField as NewTextField } from "../../components/TextField";
import { Button as NewButton } from "../../components/Button";
import { Dropdown as NewDropdown } from "../../components/Dropdown";

interface User {
  name: string;
  email: string;
  role: string;
}

const NewUserModal = (props: {
  open: boolean;
  setOpen: any;
  newUser: User;
  setNewUser: any;
}) => {
  return (
    <NewModal isOpen={props.open} setOpen={props.setOpen}>
      <div className='grid gap-4'>
        <NewTextField
          placeholder='Name'
          value={props.newUser.name}
          onChange={(e: any) => props.setNewUser({ ...props.newUser, name: e.target.value })}
        />
        <NewTextField
          placeholder='Email'
          value={props.newUser.email}
          onChange={(e: any) => props.setNewUser({ ...props.newUser, email: e.target.value })}
        />
          <NewDropdown
            buttonText='Role'
            items={users['available-roles']}
            selectedValue={props.newUser.role}
            onSelect={(value: string) => props.setNewUser({ ...props.newUser, role: value })}
            placeholder='Role'
          />
      </div>
      <div className="flex justify-between pt-4">
        <NewButton
          color='neutral'
          onClick={() => { props.setOpen(!props.open); props.setNewUser({ name: '', email: '', role: '' }) }}
        >
          <p>Cancel</p>
        </NewButton>
        <NewButton
          color='neutral'
          onClick={() => { props.setOpen(!props.open); props.setNewUser({ name: '', email: '', role: '' }) }}
        >
          <p>Create</p>
        </NewButton>
      </div>
    </NewModal>
  );
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
            p: 5,
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
            value={props.newUser.name}
            onChange={(e) => props.setNewUser({ ...props.newUser, name: e.target.value })}
            sx={{ paddingBottom: 2, margin: 'auto', width: '100%' }}
          />
          <TextField
            required
            id='email'
            label='Email'
            color='primary'
            type='email'
            value={props.newUser.email}
            onChange={(e) => props.setNewUser({ ...props.newUser, email: e.target.value })}
            sx={{ paddingBottom: 2, margin: 'auto', width: '100%' }}
          />
          <Autocomplete
            id='role'
            options={users['available-roles']}
            renderInput={(params) => <TextField {...params} label='Role' />}
            sx={{ margin: 'auto', width: '100%' }}
            value={props.newUser.role}
            onChange={(e, value) => props.setNewUser({ ...props.newUser, role: value || '' })}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => { props.setOpen(!props.open); props.setNewUser({name: '', email: '', role: '' })}}
              color='inherit'
            >
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
  const [newUser, setNewUser] = useState<User>({ name: '', email: '', role: '' });

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
            newUser={newUser}
            setNewUser={setNewUser}
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
