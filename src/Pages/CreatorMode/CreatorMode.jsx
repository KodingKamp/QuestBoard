import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Input } from '@mui/joy';
import { setCampaign } from '../../reducers/campaignReducer';
import { saveCampaign } from '../../services/fileService';
import './CreatorMode.scss';

const CreatorMode = () => {
  const campaignDataState = useSelector(state => state.campaign.data);

  const campaignNameRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!campaignDataState) {
      navigate('/');
    }
  }, [campaignDataState]);

  const handleClickedSaveCampaign = () => {
    let campaignName = campaignDataState.name,
      campaignNameInputValue = campaignNameRef.current.childNodes[0].value;

    if (campaignNameInputValue && campaignName !== campaignNameInputValue) {
      campaignName = campaignNameInputValue;
    }

    const savedCampaign = saveCampaign(campaignName, campaignDataState);
    if (saveCampaign.error) {
      return;
    }

    dispatch(
      setCampaign(savedCampaign.content)
    );
  };

  return (
    <div id='creator-mode-component'>
      {campaignDataState &&
        <>
          <div>
            <Link to='/'>
              <Button variant='plain'>
                Back
              </Button>
            </Link>
          </div>
          <h1>Creator Mode</h1>
          <Box display='flex'>
            <Input placeholder="Enter name of campaign..." ref={campaignNameRef} />
            <Button onClick={handleClickedSaveCampaign}>
              Save Campaign
            </Button>
          </Box>
        </>
      }
    </div>
  );
};

export default CreatorMode;
