import { forwardRef, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  List,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { updateNode } from '../../reducers/campaignReducer';
import SelectComponent from '../../Common/Select';
import { getAllClasses } from '../../reducers/classReducer';

const NodeCreationForm = () => {
  const selectedNode = useSelector(state => state.campaign.selectedNode);

  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const typeInputRef = useRef(null);
  const classesState = useSelector(state => state.classes);
  const [selectedClass, setSelectedClass] = useState();

  const dispatch = useDispatch();

  useEffect(
    () => {
      if (nameInputRef.current) {
        nameInputRef.current.childNodes[0].childNodes[0].value = selectedNode.name;
      }

      if (descriptionInputRef.current) {
        descriptionInputRef.current.childNodes[0].childNodes[0].value = selectedNode.description;
      }

      if (typeInputRef.current) {
        typeInputRef.current.childNodes[0].childNodes[0].value = selectedNode.type;
      }
    },
    [
      selectedNode.id
    ]
  );

  const handleSaveClicked = () => {
    const replacementNode = { ...selectedNode };

    replacementNode.name = nameInputRef.current.childNodes[0].childNodes[0].value;
    replacementNode.description = descriptionInputRef.current.childNodes[0].childNodes[0].value;
    replacementNode.type = typeInputRef.current.childNodes[0].childNodes[0].value;

    dispatch(updateNode(replacementNode));
  };

  useEffect(
    // Initial fetch of classes.
    () => {
      // Do nothing if we've already fetched for classes.
      if (classesState.isLoading || classesState.results !== null) {
        return;
      }

      dispatch(getAllClasses());
    },
    [classesState, dispatch]
  );

  /**
    * Retrieves the selected value from the SelectedComponent
    * @param {string} value 
    */
  const handleSelect = (value) => {
    setSelectedClass(value);
  }

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

            <List>
              {
                classesState.results &&
                <SelectComponent
                  menuItems={classesState.results}
                  label={"(Optional) Assign specific class"}
                  onSelect={handleSelect}
                />
              }
            </List>

            <Button
              variant='contained'
              startIcon='💾'
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
      <TextField size='small'
        fullWidth
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={ref}
        color='secondary'
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
      <TextField size='small'
        fullWidth
        multiline
        minRows='2'
        maxRows='4'
        defaultValue={defaultValue}
        placeholder={placeholder}
        ref={ref}
        color='secondary'
      />
    </Box>
  );
});