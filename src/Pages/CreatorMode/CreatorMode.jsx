import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, IconButton, Input, Stack, Tooltip, Typography } from '@mui/joy';
import { addNode, setCampaign } from '../../reducers/campaignReducer';
import { saveCampaign } from '../../services/fileService';
import NodeExplorer from '../../components/NodeExplorer/NodeExplorer';
import './CreatorMode.scss';

const CreatorMode = () => {
  const campaignDataState = useSelector(state => state.campaign.data);
  const [viewState, setViewState] = useState(0);

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

  const handleClickedAddNewNode = () => {
    dispatch(addNode({
      nodeName: 'test'
    }));
  };

  return (
    <div id='creator-mode-component'>
      {campaignDataState &&
        <>
          <Box display='flex' justifyContent='space-between' className='page-header'>
            <Box display='flex' gap='30px' alignItems='center'>
              <Link to='/'>
                <IconButton variant='plain' size='lg' className='home-btn'>
                  🏠
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

          <div className='body-container'>
            <Stack className='icon-bar-left icon-bar' spacing={2}>
              <Tooltip title='Campaign' disableInteractive>
                <span className='icon'>📓</span>
              </Tooltip>
              <Tooltip title='Quests' disableInteractive>
                <span className='icon'>📜</span>
              </Tooltip>
              <Tooltip title='Settings' disableInteractive>
                <span className='icon'>⚙️</span>
              </Tooltip>
            </Stack>

            <div className='content-container-left content-container'>
              Test
            </div>

            <div className='content-container-right content-container'>
              Test
            </div>

            <Stack className='icon-bar-right icon-bar' spacing={2}>
              <Tooltip title='Nodes' disableInteractive>
                <span className='icon'>📄</span>
              </Tooltip>
              <Tooltip title='Intel' disableInteractive>
                <span className='icon'>ℹ️</span>
              </Tooltip>
              <Tooltip title='Notes' disableInteractive>
                <span className='icon'>📝</span>
              </Tooltip>
            </Stack>
          </div>
        </>
      }
    </div>
  );
};

export default CreatorMode;
