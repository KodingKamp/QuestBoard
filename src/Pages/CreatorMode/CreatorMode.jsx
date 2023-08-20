import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/joy';
import { setCampaign } from '../../reducers/campaignReducer';
import { saveCampaign } from '../../services/fileService';
import './CreatorMode.scss';

const CreatorMode = () => {
  const campaignState = useSelector(state => state.campaign);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!campaignState.data) {
      navigate('/');
    }
  }, [campaignState.data]);

  const handleClickedSaveCampaign = () => {
    // TODO: Use input file name or existing if no input
    let fileName = campaignState.isALoadedCampaign
      ? campaignState.data.name
      : "test";

    const savedCampaign = saveCampaign(fileName, campaignState.data);
    if (saveCampaign.error) {
      return;
    }

    dispatch(
      setCampaign(savedCampaign.content)
    );
  };

  return (
    <div id='creator-mode-component'>
      {campaignState.data &&
        <>
          <div>
            <Link to='/'>
              <Button variant='plain'>
                Back
              </Button>
            </Link>
          </div>
          <h1>Creator Mode</h1>
          <Button onClick={handleClickedSaveCampaign}>
            Save Campaign
          </Button>
        </>
      }
    </div>
  );
};

export default CreatorMode;
