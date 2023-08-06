import { Box, Button, Stack } from '@mui/joy';
import './LandingPage.scss';

const LandingPage = () => {  
  const clickButtonHandler = (page) => () => {
  };

  return (
    <Box id='landing-page-component'>
      <Stack direction='row' gap='10px'>
        <Button className='mode-button' component='a' href='/create'
          onClick={clickButtonHandler('CREATOR_MODE')}
        >
          Creator Mode
        </Button>
        <Button className='mode-button' component='a' href='/game'
          onClick={clickButtonHandler('GAME_MODE')}
        >
          Game Mode
        </Button>
      </Stack>
    </Box>
  );
};

export default LandingPage;
