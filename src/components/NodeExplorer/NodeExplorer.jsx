import { useSelector } from 'react-redux';
import { Box, Divider, Typography } from '@mui/joy';
import NodeComponent from './NodeComponent';
import './NodeExplorer.scss';

const NodeExplorer = () => {
  const nodes = useSelector(state => state.campaign.data.nodes);

  return (
    <div>
      <Typography level='h4'>Node Explorer</Typography>

      <Divider />

      {nodes?.Root?.childrenIds && nodes.Root.childrenIds.map(childId => (
        <NodeComponent key={childId} node={nodes[childId]} />
      ))}
    </div>
  );
};

export default NodeExplorer;