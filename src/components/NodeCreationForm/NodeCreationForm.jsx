import { Box, Divider, Typography } from '@mui/joy';
import React from 'react'
import { useSelector } from 'react-redux';

const NodeCreationForm = () => {
  const selectedNode = useSelector(state => state.campaign.selectedNode);

  return (
    <Box>
      <Typography level='h4'>
        Node Creation Form
      </Typography>

      <Divider />

      {selectedNode.id === 'Root'
        ? <Box color='white'>No node selected.</Box>
        : <Box color='white'>{selectedNode.name ?? '~New Node~'}</Box>
      }
    </Box>
  );
};

export default NodeCreationForm;