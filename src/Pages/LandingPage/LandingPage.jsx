import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadedCampaign, setNewCampaign } from '../../reducers/campaignReducer';
import { Box, Button, Stack, Typography } from '@mui/material';
import { loadFile } from '../../services/fileService';
import AppVersioning from '../../components/AppVersioning/AppVersioning';
import './LandingPage.scss';

const LandingPage = () => {
  const campaignState = useSelector(state => state.campaign);

  const loadCampaignRef = useRef();
  const loadGameRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLoadCampaign = (pageAfterLoad) => (loadFileEvent) => {
    loadFile(
      loadFileEvent,
      (loadedCampaign) => {
        dispatch(setLoadedCampaign(loadedCampaign.content));
        navigate(pageAfterLoad);
      }
    );
  };

  const handleCreateNewCampaign = () => {
    dispatch(setNewCampaign());
    navigate('/create');
  };

  return (
    <Stack id='landing-page-component' spacing='40px'>
      <Box textAlign='center'>
        <Typography variant='h1' textAlign='center' color='text.primary'>Quest Board</Typography>
        <Typography color='text.secondary'>The only campaign companion you'll ever need.</Typography>
      </Box>

      <Stack spacing='16px'>
        {campaignState.data &&
          <>
            <Button
              onClick={() => navigate('/game')}
              variant='contained'
            >
              PLAY
            </Button>
            <Button
              onClick={() => navigate('/create')}
              variant='outlined'
            >
              CONTINUE EDIT
            </Button>
          </>
        }
        <Button
          onClick={handleCreateNewCampaign}
          variant={campaignState.data ? 'outlined' : 'contained'}
        >
          CREATE NEW
        </Button>
        <Button
          onClick={() => loadCampaignRef.current.click()}
          variant='outlined'
          >
          LOAD & EDIT
        </Button>
        <Button
          onClick={() => loadGameRef.current.click()}
          variant='outlined'
        >
          LOAD & PLAY
        </Button>
      </Stack>

      <AppVersioning />

      {/* Used for loading a quest board campaign (.qbc) file */}
      <input type='file'
        style={{ display: 'none' }}
        ref={loadCampaignRef}
        onChange={handleLoadCampaign('/create')}
        accept='.qbc'
      />
      {/* Used for loading a quest board game or campaign (.qbg|.qbc) file */}
      <input type='file'
        style={{ display: 'none' }}
        ref={loadGameRef}
        onChange={handleLoadCampaign('/game')}
        accept='.qbg, .qbc'
      />
    </Stack>
  );
};

export default LandingPage;
