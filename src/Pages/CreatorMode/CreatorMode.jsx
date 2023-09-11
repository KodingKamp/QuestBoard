import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, IconButton, Input, Stack, Tab, Tabs, TextField, Tooltip, Typography } from '@mui/material';
import { AutoStories, HistoryEdu, HomeOutlined, Settings, TipsAndUpdates } from '@mui/icons-material';
import { addNode, setCampaign } from '../../reducers/campaignReducer';
import { saveCampaign } from '../../services/fileService';
import NodeExplorer from '../../components/NodeExplorer/NodeExplorer';
import NodeCreationForm from '../../components/NodeCreationForm/NodeCreationForm';
import './CreatorMode.scss';

const CreatorMode = () => {
  const campaignDataState = useSelector(state => state.campaign.data);
  const selectedNode = useSelector(state => state.campaign.selectedNode);
  const [leftViewState, setLeftViewState] = useState(0);

  const campaignNameRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!campaignDataState) {
      navigate('/');
      return;
    } else {
      if (campaignNameRef.current) {
        campaignNameRef.current.childNodes[0].value = campaignDataState.name
      }
    }
  }, [campaignDataState]);

  const hasNodeSelected = useMemo(
    () => selectedNode.id !== 'Root',
    [selectedNode.id]
  );

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
    dispatch(addNode());
  };

  return (
    <Box id='creator-mode-component' color='text.primary'>
      {campaignDataState &&
        <>
          <Box display='flex' justifyContent='space-between' className='page-header'>
            <Box display='flex' gap='30px' alignItems='center'>
              <Link to='/'>
                <IconButton size='large' className='home-btn' color='primary'>
                  <HomeOutlined />
                </IconButton>
              </Link>
              <Typography variant='h3'>Creator Mode</Typography>
            </Box>

            <Box display='flex' gap='10px' alignItems='center'>
              <TextField variant='outlined' color='primary' size='small' sx={{ width: '400px' }}
                placeholder="Enter name of campaign..."
                ref={campaignNameRef}
              />
              <Button onClick={handleClickedSaveCampaign} variant='contained'>
                Export
              </Button>
            </Box>
          </Box>

          <Divider />

          <div className='body-container'>
            <Box
              className='icon-container-left icon-container'
            >
              <Tabs value={leftViewState}
                onChange={(event, value) => setLeftViewState(value)}
                orientation='vertical'
                className='icon-bar-left icon-bar'
              >
                <Tab className='tab-icon'
                  label={
                    <Tooltip title='Node Explorer' disableInteractive>
                      <AutoStories />
                    </Tooltip>
                  }
                />
                <Tab className='tab-icon'
                  label={
                    <Tooltip title='Quests' disableInteractive>
                      <HistoryEdu />
                    </Tooltip>
                  }
                />
                <Tab className='tab-icon'
                  label={
                    <Tooltip title='Intel' disableInteractive>
                      <TipsAndUpdates />
                    </Tooltip>
                  }
                />
                <Tab className='tab-icon'
                  label={
                    <Tooltip title='Settings' disableInteractive>
                      <Settings />
                    </Tooltip>
                  }
                />
              </Tabs>

              <Box
                className='content-container content-container-left'
              >
                {leftViewState === 0 &&
                  <NodeExplorer />
                }
                {leftViewState === 1 &&
                  <span>Quest Explorer</span>
                }
                {leftViewState === 2 &&
                  <span>Intel settings</span>
                }
                {leftViewState === 3 &&
                  <span>Settings</span>
                }
              </Box>
            </Box>

            <Box className='icon-container-right icon-container'
            >
              <div className='content-container-right content-container'>
                <NodeCreationForm />
              </div>

              <Stack className='icon-bar-right icon-bar' gap='20px'>
                <Tooltip title={`Add new node to ${hasNodeSelected ? 'selected node' : 'the root'}`} disableInteractive>
                  <IconButton component='span'
                    variant='soft'
                    onClick={handleClickedAddNewNode}
                  >
                    ➕
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </div>
        </>
      }
    </Box>
  );
};

export default CreatorMode;
