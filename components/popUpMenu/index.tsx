import { Menu, MenuItem } from '@mui/material';

interface PopUpMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: any;
}
export default function PopUpMenu(props: PopUpMenuProps): JSX.Element {
  const { anchorEl, open, handleClose } = props;
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <MenuItem onClick={handleClose}>Update SIM</MenuItem>
    </Menu>
  );
}
