import { useSelector } from 'react-redux';
import { Box, Divider, Typography } from '@mui/material';
import NodeComponent from './NodeComponent';
import './NodeExplorer.scss';

const NodeExplorer = () => {
  const nodes = useSelector(state => state.campaign.data.nodes);

  return (
    <Box>
      <Typography level='h4'>Node Explorer</Typography>

      <Divider />

      <Box paddingY='20px'>
        {nodes?.Root?.childrenIds && nodes.Root.childrenIds.map(childId => (
          <NodeComponent key={childId} node={nodes[childId]} />
        ))}

        {nodes?.Root?.childrenIds?.length === 0 &&
          <Typography>
            <i>empty</i>
          </Typography>
        }
      </Box>
    </Box>
  );
};

export default NodeExplorer;