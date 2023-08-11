import { useState } from 'react';
import ToolBar from '../ToolBar';
import Drawer from '../Drawer';
import {
  IconButton,
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

export const drawerWidth = 260;

const DrawerHeader = ({children}: {children: JSX.Element[] | JSX.Element}) => (
  <div className="flex justify-end align-center p-4 ">
    {children}
  </div>
)

interface DrawerButtonProps {
  text: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const DrawerButton = (props: DrawerButtonProps) => (
  <div onClick={props.onClick}
  className="flex flex-row justify-start p-3 pl-4 transition cursor-pointer duration-200 hover:bg-gray-200">
    {props.icon}
    <div className='ml-8 grow'>
    {props.text}
    </div>
  </div>
)

interface CategoryTextProps {
  primary: string;
  //secondary?: string;
}
const CategoryText = ({primary}: CategoryTextProps) => (
  <span
    className='flex justify-start pt-0 pb-3 pr2 pl-4 font-bold'
  >
    {primary}
  </span>
)


const Divider = ({ size = "small" }: {size? : "small" | "medium" | "large"}) => (
  <hr className={
    size === "small" ? "h-0.5" :
    size === "medium" ? "h-1/2" :
    size === "large" ? "h-1" :
    "w-1/4"
  } />
)

const List = ({children}: {children: JSX.Element[] | JSX.Element}) => (
  <div>
    <Divider />
    <div className='flex flex-col pt-4 pb-4'>
      {children}
    </div>
  </div>
)

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <div className="flex">
      <ToolBar style={{ backgroundColor: '#E63946' }}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          sx={{ mr: 2, ...(open && { display: 'none' })}}
        >
          <Menu />
        </IconButton>
      </ToolBar>
      <Drawer widthPx={drawerWidth} open={open}>
        <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </DrawerHeader>
          <List>
            <CategoryText primary='Content' />
            <DrawerButton text='Live channels' icon={<LiveTv />} onClick={() => window.location.href = '/content/live-channels'} />
            <DrawerButton text='VOD' icon={<OndemandVideo />} onClick={() => window.location.href = '/content/vod'} />
          </List>
          <List>
            <CategoryText primary='Reporting' />
            <DrawerButton text='Metrics' icon={<QueryStats />} onClick={() => window.location.href = '/reporting/metrics'} />
          </List>
          <List>
            <CategoryText primary='Configuration' />
            <DrawerButton text='Genres' icon={<Category />} onClick={() => window.location.href = '/configuration/genres'} />
            <DrawerButton text='Categories' icon={<Class />} onClick={() => window.location.href = '/configuration/categories'} />
            <DrawerButton text='Platforms' icon={<Movie />} onClick={() => window.location.href = '/configuration/platforms'} />
          </List>
          <List>
            <CategoryText primary='Admin' />
            <DrawerButton text='Users' icon={<Person />} onClick={() => window.location.href = '/admin/users'} />
            <DrawerButton text='Permissions' icon={<AdminPanelSettings />} onClick={() => window.location.href = '/admin/permissions'} />
          </List>
      </Drawer>
    </div>
  );
}