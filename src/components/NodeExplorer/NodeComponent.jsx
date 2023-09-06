import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Box, Checkbox, Divider, IconButton, Tooltip, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { deselectNode, setSelectedNode } from "../../reducers/campaignReducer";
import { useMemo, useState } from "react";

const indentation = 16;

const NodeComponent = ({
  node,
  level = 0
}) => {
  const nodes = useSelector(state => state.campaign.data.nodes);
  const selectedNodeId = useSelector(state => state.campaign.selectedNode.id);
  const [isExpanded, setIsExpanded] = useState(true);

  const dispatch = useDispatch();
  const isSelected = useMemo(
    () => node.id === selectedNodeId,
    [selectedNodeId]
  );

  const handleClickedEdit = (event) => {
    if (event.target.checked) {
      dispatch(
        setSelectedNode(node)
      );
    }
    else {
      dispatch(
        deselectNode()
      );
    }
  };

  return (
    <AccordionGroup size="small" sx={{ marginTop: '4px' }}>
      <Accordion defaultExpanded
        expanded={isExpanded}
        className='node-accordion'
      >
        <AccordionSummary
          indicator={null}
          className='accordion-summary'
          sx={{
            position: 'relative',
            left: `${indentation * level}px`
          }}
        >
          <Box display='flex' alignItems='center' gap='4px'>
            <Tooltip disableInteractive
              title={isSelected ? 'Deselect node' : 'Select node'}
            >
              <Checkbox size="sm"
                checked={isSelected}
                onChange={handleClickedEdit}
                className='selection-checkbox'
                sx={isSelected && {
                  visibility: 'visible !important'
                }}
              />
            </Tooltip>


            <Box display='flex'
              gap='4px'
              flexGrow='1'
              onClick={() => setIsExpanded(state => !state)}
            >
              <Tooltip disableInteractive
                title='Toggle inner section'
              >
                <span
                  className='expanded-carret'
                  style={isExpanded
                    ? {
                      transform: 'rotate(30deg)',
                      top: '-3px',
                    }
                    : {
                      transform: 'rotate(-150deg)',
                      top: '3px',
                    }}
                >
                  🍕
                </span>
              </Tooltip>

              <Tooltip disableInteractive title={node.name}>
                <Typography noWrap>
                  {node.name}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        </AccordionSummary>

        <AccordionDetails
        >
          {node.childrenIds.map(childId => (
            <NodeComponent
              key={childId}
              node={nodes[childId]}
              level={level + 1}
            />
          ))}
          {node.childrenIds.length === 0 &&
            <Box textAlign='center'
              color='white'
            >
              <i>empty</i>
              <Divider sx={{
                bottom: '6px'
              }} />
            </Box>
          }
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
};

export default NodeComponent;