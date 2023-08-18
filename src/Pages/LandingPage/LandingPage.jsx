import { Link } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/joy';
import './LandingPage.scss';

const LandingPage = () => {  
  return (
    <Box id='landing-page-component'>
      <Stack direction='row' gap='10px'>
        <Link to="/create" relative='path'>
          <Button className='mode-button'>
            Creator Mode
          </Button>
        </Link>
        <Link to="/game" relative='path'>
          <Button className='mode-button'>
            Game Mode
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default LandingPage;
