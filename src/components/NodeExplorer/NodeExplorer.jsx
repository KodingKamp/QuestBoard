import { useSelector } from 'react-redux';
import NodeComponent from './NodeComponent';
import './NodeExplorer.scss';

const NodeExplorer = () => {
  const nodes = useSelector(state => state.campaign.data.nodes);

  return (
    <div>
      <NodeComponent node={nodes.Root} />
    </div>
  );
};

export default NodeExplorer;