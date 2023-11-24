import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NodeComponent from './NodeComponent';
import './NodeExplorer.scss';

const NodeExplorer = () => {
  const nodes = useSelector(state => state.campaign.data.nodes);

  return (
    <Box display='grid'
      gridTemplateRows='56px 1fr'
      gridTemplateColumns='40px 16px 1fr'
      gap='8px'
      height='100%'
      minWidth='0'
      className='section-container'
    >
      <Typography
        level='h2'
        sx={{
          gridColumn: '3'
        }}
        className='section-title'
      >
        Node Explorer
      </Typography>

      <Box sx={{ gridColumn: '1 / -1', gridRow: '2' }}
        className='section-body'
      >
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