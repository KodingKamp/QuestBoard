import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCampaign } from '../../reducers/campaignReducer';
import { Button, Stack } from '@mui/joy';
import { loadFile } from '../../services/fileService';
import './LandingPage.scss';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadCampaignRef = useRef();
  const loadGameRef = useRef();

  const handleLoadCampaign = (pageAfterLoad) => (loadFileEvent) => {
    loadFile(loadFileEvent, (loadedCampaign) => {
      dispatch(
        setCampaign(loadedCampaign)
      );

      navigate(pageAfterLoad);
    });
  };

  return (
    <Stack id='landing-page-component' spacing='20px'>
      <Button onClick={() => loadGameRef.current.click()}>
        PLAY CAMPAIGN
      </Button>
      <Button>
        CREATE NEW CAMPAIGN
      </Button>
      <Button onClick={() => loadCampaignRef.current.click()}>
        EDIT CAMPAIGN
      </Button>

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
