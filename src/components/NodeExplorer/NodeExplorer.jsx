import { useDispatch, useSelector } from 'react-redux';
import { Box, IconButton, Typography } from '@mui/joy';
import { addNode } from '../../reducers/campaignReducer';
import NodeComponent from './NodeComponent';
import './NodeExplorer.scss';

const NodeExplorer = () => {
  const nodes = useSelector(state => state.campaign.data.nodes);

  const dispatch = useDispatch();

  const handleClickedAddNewNode = () => {
    dispatch(addNode({
      nodeName: '~New Node~'
    }));
  };

  return (
    <div>
      <Box display='flex' justifyContent='flex-end' gap='8px'>
        <Typography
          textColor='white'
        >
          Add new node
        </Typography>
        <span>
          <IconButton variant='soft' size='small' onClick={handleClickedAddNewNode}>
            ➕
          </IconButton>
        </span>
      </Box>

      {nodes?.Root?.childrenIds && nodes.Root.childrenIds.map(childId => (
        <NodeComponent key={childId} node={nodes[childId]} />
      ))}
    </div>
  );
};

export default NodeExplorer;