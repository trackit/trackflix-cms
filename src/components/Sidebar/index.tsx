import { useState } from 'react';
import {
  styled,
  Box,
  Drawer,
  ListItem,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ChevronLeft,
  Menu,
  LiveTv,
  OndemandVideo,
  QueryStats,
  Movie,
  Category,
  Person,
  AdminPanelSettings,
  Class,
} from '@mui/icons-material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface ButtonProps {
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => (
  <ListItem key={props.text} disablePadding>
  <ListItemButton onClick={props.onClick}>
    <ListItemIcon>
      {props.icon}
    </ListItemIcon>
    <ListItemText primary={props.text} />
  </ListItemButton>
</ListItem>
)

const CategoryText = styled(ListItemText)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 2),
  fontWeight: 'bold'
}));

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed' open={open}>
        <Toolbar sx={{ backgroundColor: '#E63946' }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' })}}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <CategoryText primary='Content' />
          <Button text='Live channels' icon={<LiveTv />} onClick={() => window.location.href = '/content/live-channels'} />
          <Button text='VOD' icon={<OndemandVideo />} onClick={() => window.location.href = '/content/vod'} />
        </List>
        <Divider />
        <List>
          <CategoryText primary='Reporting' />
          <Button text='Metrics' icon={<QueryStats />} onClick={() => window.location.href = '/reporting/metrics'} />
        </List>
        <Divider />
        <List>
          <CategoryText primary='Configuration' />
          <Button text='Genres' icon={<Category />} onClick={() => window.location.href = '/configuration/genres'} />
          <Button text='Categories' icon={<Class />} onClick={() => window.location.href = '/configuration/categories'} />
          <Button text='Platforms' icon={<Movie />} onClick={() => window.location.href = '/configuration/platforms'} />
        </List>
        <Divider />
        <List>
          <CategoryText primary='Admin' />
          <Button text='Users' icon={<Person />} onClick={() => window.location.href = '/admin/users'} />
          <Button text='Permissions' icon={<AdminPanelSettings />} onClick={() => window.location.href = '/admin/permissions'} />
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}