import { Box, Button, Stack } from '@mui/joy';
import './LandingPage.scss';

const LandingPage = () => {  
  return (
    <Box id='landing-page-component'>
      <Stack direction='row' gap='10px'>
        <Button className='mode-button' component='a' href='/create'>
          Creator Mode
        </Button>
        <Button className='mode-button' component='a' href='/game'>
          Game Mode
        </Button>
      </Stack>
    </Box>
  );
};

export default LandingPage;
