import { Box, Button, Divider, Input, Stack, Textarea, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateNode } from '../../reducers/campaignReducer';

const NodeCreationForm = () => {
  const selectedNode = useSelector(state => state.campaign.selectedNode);

  const [formNode, setFormNode] = useState(selectedNode);

  const dispatch = useDispatch();

  useEffect(
    () => {
      setFormNode(prev => selectedNode);
    },
    [selectedNode]
  );

  const handleNameChanged = (event) => {
    const node = { ...formNode };

    node.name = event.target.value;

    setFormNode(node);
  };

  const handleDescriptionChanged = (event) => {
    const node = { ...formNode };

    node.description = event.target.value;

    setFormNode(node);
  };

  const handleTypeChanged = (event) => {
    const node = { ...formNode };

    node.type = event.target.value;

    setFormNode(node);
  };

  const handleIsUnlockedChanged = () => {

  };

  const handleIsAvailableChanged = () => {

  };

  const handleSaveClicked = () => {
    dispatch(updateNode(formNode));
  };

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
        <Box>
          <Stack color='white' paddingY={2} gap={2}>
            <InputWithLabel
              label='Name:'
              value={formNode.name}
              placeholder='Enter node name...'
              onChange={handleNameChanged}
            />
            <TextAreaWithLabel
            label='Description:'
            value={formNode.description}
            placeholder='Enter node description...'
            onChange={handleDescriptionChanged}
          />
          <InputWithLabel
            label='Type:'
            value={formNode.type}
            placeholder='Enter node type...'
            onChange={handleTypeChanged}
          />
          </Stack>
          <Box>
            <Button
              startDecorator='💾'
              onClick={handleSaveClicked}
            >
              Save
            </Button>
          </Box>
        </Box>

      }
    </Box>
  );
};

export default NodeCreationForm;

const InputWithLabel = ({
  label,
  value,
  placeholder,
  onChange
}) => {
  return (
    <Box>
      <Typography level='body-xs'>{label}</Typography>
      <Input size='sm'
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Box>
  );
};

const TextAreaWithLabel = ({
  label,
  value,
  placeholder,
  onChange
}) => {
  return (
    <Box>
      <Typography level='body-xs'>{label}</Typography>
      <Textarea size='sm'
        minRows={2}
        maxRows={4}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Box>
  );
};