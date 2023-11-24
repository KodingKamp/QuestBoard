import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Add from '@mui/icons-material/Add';
import AutoStories from '@mui/icons-material/AutoStories';
import HistoryEdu from '@mui/icons-material/HistoryEdu';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import Settings from '@mui/icons-material/Settings';
import TipsAndUpdates from '@mui/icons-material/TipsAndUpdates';
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

  // Redirect to landing page if stateless
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
              <Box
                className=''
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
              
              <SpeedDial
                className='left-menu-button'
                ariaLabel='Node Menu'
                icon={<Menu />}
                direction='down'
              >
                <SpeedDialAction
                  tooltipTitle='Node Explorer'
                  tooltipOpen
                  tooltipPlacement='right'
                  icon={<AutoStories />}
                  FabProps={{
                    variant: 'extended'
                  }}
                  onClick={() => setLeftViewState(0)}
                  />
                <SpeedDialAction
                  tooltipTitle='Quests'
                  tooltipOpen
                  tooltipPlacement='right'
                  icon={<HistoryEdu />}
                  FabProps={{
                    variant: 'extended'
                  }}
                  onClick={() => setLeftViewState(1)}
                  />
                <SpeedDialAction
                  tooltipTitle='Intel'
                  tooltipOpen
                  tooltipPlacement='right'
                  icon={<TipsAndUpdates />}
                  FabProps={{
                    variant: 'extended'
                  }}
                  onClick={() => setLeftViewState(2)}
                  />
                <SpeedDialAction
                  tooltipTitle='Settings'
                  tooltipOpen
                  tooltipPlacement='right'
                  icon={<Settings />}
                  FabProps={{
                    variant: 'extended'
                  }}
                  onClick={() => setLeftViewState(3)}
                />
              </SpeedDial>
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
                    <Add />
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
