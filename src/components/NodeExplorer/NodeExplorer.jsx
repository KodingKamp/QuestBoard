import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import NodeComponent from './NodeComponent';
import './NodeExplorer.scss';

const NodeExplorer = () => {
  const nodes = useSelector(state => state.campaign.data.nodes);

  return (
    <Box display='grid' 
      gridTemplateRows='auto 1px 1fr'
      gridTemplateColumns='1fr'
      height='100%'
      minWidth='0'
    >
      <Typography level='h4'>Node Explorer</Typography>

      <Divider />

      <Box paddingY='10px'>
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