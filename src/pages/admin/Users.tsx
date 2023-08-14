import {
  Typography,
} from "@mui/material";
import { DataGrid, DataGripsColumnDef } from "../../components/DataGrid";
import { useState } from "react";
import users from '../../draft/users.json';

import { Modal } from "../../components/Modal";
import { TextField } from "../../components/TextField";
import { Button } from "../../components/Button";
import { Dropdown } from "../../components/Dropdown";

interface User {
  name: string;
  email: string;
  role: string;
  id?: number;
}

const UserModal = (props: {
  open: boolean;
  setOpen: any;
  submit: (user: User) => void;
  edit?: User;
}) => {

  const [newUser, setNewUser] = useState<User>(props.edit ? props.edit : { name: '', email: '', role: '' });

  const submitUser = () => {
    const submittedUser: User = {
      ...newUser
    }
    setNewUser({ name: '', email: '', role: '' });
    props.submit(submittedUser);

  };

  return (
    <Modal isOpen={props.open} setOpen={props.setOpen}>
      <TextField
          placeholder='Name'
          value={newUser.name}
          onChange={(e: any) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <TextField
          placeholder='Email'
          value={newUser.email}
          onChange={(e: any) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <Dropdown
          buttonText='Role'
          items={users['available-roles']}
          selectedValue={newUser.role}
          onSelect={(value: string) => setNewUser({ ...newUser, role: value })}
          placeholder='Role'
        />
      <div className="flex justify-between pt-4">
        <Button
          color='danger'
          onClick={() => { props.setOpen(!props.open); setNewUser({ name: '', email: '', role: '' }) }}
        >
          <p>Cancel</p>
        </Button>
        <Button
          color='primary'
          onClick={submitUser}
        >
          <p>
            {props.edit ? 'Save' : 'Create'}
          </p>
        </Button>
      </div>
    </Modal>
  );
}

export const Users = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [targetUser, setTargetUser] = useState<User | undefined>(undefined);
  const gridFields: DataGripsColumnDef[] = [
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

  const submitUser = (user: User) => {
    setOpenModal(false);
    if (user.id) { //update user
      console.log("edited user", user)
      users.users = users.users.map((u: any) => {
        if (u.id === user.id) {
          return user;
        }
        return u;
      });
      console.log(users.users)
      setTargetUser(undefined);
    }
    else { //create user
      const id = users.users.length + 1;
      console.log("created user", user)
      users.users.push({ ...user, id: id });
    }
  }

  const editUser = (user: User) => {
    setTargetUser(user);
    setOpenModal(true);
  }

  return (
    <div className="flex flex-col align-center justify-center w-max m-auto">
      {
        openModal ? (
          <UserModal
            open={openModal}
            setOpen={setOpenModal}
            submit={submitUser}
            edit={targetUser}
          />
        ) : null
      }
        <div className="flex flex-row justify-between mb-4">
          <Typography variant='h5'>Users</Typography>
          <Button color="primary" onClick={() => setOpenModal(!openModal)}>Create</Button>
        </div>
      <DataGrid
        rows={users.users}
        columns={gridFields}
        pageSize={10}
        checkboxSelect
        onSelectChange={(newSelection: any) => setSelectedRows(newSelection)}
        onRowClick={editUser}
      />
    </div>
  );
}
