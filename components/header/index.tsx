import { Box, BoxProps, Typography } from '@mui/material';
import { styled } from '@mui/system';

export default function Header(): JSX.Element {
  const HeaderContainer = styled('header')<>({
    backgroundColor: 'white',
    width: '100%',
    height: '4.5rem',
    borderBottom: '1px solid grey',
    display: 'flex',
    alignItems: 'center',
    padding: '0rem 2rem',
  });
  return (
    <HeaderContainer role="banner">
      <Typography
        variant="body1"
        sx={{
          fontSize: '2rem',
        }}
      >
        OXIO Skills Test
      </Typography>
    </HeaderContainer>
  );
}
