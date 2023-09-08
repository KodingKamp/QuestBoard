import { Box, Button, Divider, Input, Stack, Textarea, Typography } from '@mui/joy';
import { forwardRef, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateNode } from '../../reducers/campaignReducer';

const NodeCreationForm = () => {
  const selectedNode = useSelector(state => state.campaign.selectedNode);

  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const typeInputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(
    () => {
      if (nameInputRef.current) {
        nameInputRef.current.children[0].value = selectedNode.name;
      }

      if (descriptionInputRef.current) {
        descriptionInputRef.current.children[0].value = selectedNode.description;
      }

      if (typeInputRef.current) {
        typeInputRef.current.children[0].value = selectedNode.type;
      }
    },
    [selectedNode.id]
  );

  const handleSaveClicked = () => {
    const replacementNode = { ...selectedNode };

    replacementNode.name = nameInputRef.current.children[0].value;
    replacementNode.description = descriptionInputRef.current.children[0].value;
    replacementNode.type = typeInputRef.current.children[0].value;

    dispatch(updateNode(replacementNode));
  };

  return (
    <Box>
      <Typography level='h4'>
        Node Creation Form
      </Typography>

      <Divider />

      {selectedNode.id === 'Root'
        ?
        <Stack color='white' paddingY={2} gap={2}>
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
              placeholder='Enter node name...'
              ref={nameInputRef}
            />
            <TextAreaWithLabel
              label='Description:'
              placeholder='Enter node description...'
              ref={descriptionInputRef}
            />
            <InputWithLabel
              label='Type:'
              placeholder='Enter node type...'
              ref={typeInputRef}
            />
            <Button
              startDecorator='💾'
              onClick={handleSaveClicked}
            >
              Save
            </Button>
          </Stack>
        </Box>

      }
    </Box>
  );
};

export default NodeCreationForm;

const InputWithLabel = forwardRef((
  {
    label,
    defaultValue,
    placeholder,
  },
  ref
) => {
  return (
    <Box>
      <Typography level='body-xs'>{label}</Typography>
      <Input size='sm'
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={ref}
      />
    </Box>
  );
});

const TextAreaWithLabel = forwardRef((
  {
    label,
    defaultValue,
    placeholder,
  },
  ref
) => {
  return (
    <Box>
      <Typography level='body-xs'>{label}</Typography>
      <Textarea size='sm'
        minRows={2}
        maxRows={4}
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={ref}
      />
    </Box>
  );
});