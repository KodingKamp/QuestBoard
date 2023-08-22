import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Input } from '@mui/joy';
import { addNode, setCampaign } from '../../reducers/campaignReducer';
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
          <h1>Creator Mode</h1>
          <div>
            <Link to='/'>
              <Button variant='plain'>
                Back
              </Button>
            </Link>
          </div>
          <Box display='flex'>
            <Input placeholder="Enter name of campaign..." ref={campaignNameRef} />
            <Button onClick={handleClickedSaveCampaign}>
              Export
            </Button>
          </Box>
          <Button onClick={handleClickedAddNewNode}>
            Add Test Node To Root
          </Button>
          <ul>
            {campaignDataState && campaignDataState.nodes.Root.children.map(childrenNodeId => (
              <li key={childrenNodeId}>
                {campaignDataState.nodes[childrenNodeId].name}
              </li>
            ))}
          </ul>
        </>
      }
    </div>
  );
};

export default CreatorMode;
