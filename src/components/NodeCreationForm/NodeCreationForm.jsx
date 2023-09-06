import { Box, Divider, Input, Stack, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const NodeCreationForm = () => {
  const selectedNode = useSelector(state => state.campaign.selectedNode);

  const [formNode, setFormNode] = useState(selectedNode);

  useEffect(
    () => {
      console.log(selectedNode);
      setFormNode(prev => selectedNode);
    },
    [selectedNode]
  );

  return (
    <Box>
      <Typography level='h4'>
        Node Creation Form
      </Typography>

      <Divider />

      {selectedNode.id === 'Root'
        ?
        <Stack color='white' gap={2}>
          <Typography>
            No node selected.
          </Typography>

          <Typography>
            Select a node in the <strong>Node Explorer</strong> or create a new one.
          </Typography>
        </Stack>
        :
        <Box color='white' paddingY={2}>
          <Input size='sm' value={formNode.name} placeholder='~New Node~'/>
        </Box>
      }
    </Box>
  );
};

export default NodeCreationForm;