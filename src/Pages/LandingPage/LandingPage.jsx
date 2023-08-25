import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadedCampaign, setNewCampaign } from '../../reducers/campaignReducer';
import { Button, Stack, Typography } from '@mui/joy';
import { loadFile } from '../../services/fileService';
import './LandingPage.scss';
import AppVersioning from '../../components/AppVersioning/AppVersioning';

const LandingPage = () => {
  const campaignState = useSelector(state => state.campaign);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadCampaignRef = useRef();
  const loadGameRef = useRef();
  const handleLoadCampaign = (pageAfterLoad) => (loadFileEvent) => {
    loadFile(loadFileEvent, (loadedCampaign) => {
      dispatch(
        setLoadedCampaign(loadedCampaign.content)
      );

      navigate(pageAfterLoad);
    });
  };

  const handleCreateNewCampaign = () => {
    dispatch(
      setNewCampaign()
    );

    navigate('/create');
  };

  return (
    <Stack id='landing-page-component' spacing='40px'>
      <div>
        <Typography level='h1' textAlign='center'>Quest Board</Typography>
        <Typography>The only campaign companion you'll ever need.</Typography>
      </div>

      <Stack spacing='16px'>
        {campaignState.data &&
          <>
            <Button
              onClick={() => navigate('/game')}
            >
              PLAY
            </Button>
            <Button
              onClick={() => navigate('/create')}
            >
              CONTINUE EDIT
            </Button>
          </>
        }
        <Button
          onClick={handleCreateNewCampaign}
        >
          CREATE NEW
        </Button>
        <Button
          onClick={() => loadCampaignRef.current.click()}
        >
          LOAD & EDIT
        </Button>
        <Button
          onClick={() => loadGameRef.current.click()}
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
