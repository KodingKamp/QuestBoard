import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, IconButton, Input, Typography } from '@mui/joy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addNode, setCampaign } from '../../reducers/campaignReducer';
import { saveCampaign } from '../../services/fileService';
import './CreatorMode.scss';
import NodeExplorer from '../../components/NodeExplorer/NodeExplorer';

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

    dispatch(setCampaign(savedCampaign.content));
  };

  return (
    <div id='creator-mode-component'>
      {campaignDataState &&
        <>
          <Box display='flex' justifyContent='space-between' className='page-header'>
            <Box display='flex' gap='30px' alignItems='center'>
              <Link to='/'>
                <IconButton variant='plain' size='lg'>
                  🔙
                </IconButton>
              </Link>
              <Typography level='h1'>Creator Mode</Typography>
            </Box>

            <Box display='flex' gap='10px' alignItems='center'>
              <Input sx={{ width: '400px' }}
                placeholder="Enter name of campaign..."
                ref={campaignNameRef}
              />
              <Button onClick={handleClickedSaveCampaign}>
                Export
              </Button>
            </Box>
          </Box>
          <Divider />
          <div>
            <NodeExplorer />
          </div>
        </>
      }
    </div>
  );
};

export default CreatorMode;
