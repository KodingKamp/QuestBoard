import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { deselectNode, setSelectedNode } from "../../reducers/campaignReducer";

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

  const handleSelectNode = (event) => {
    if (event.target.checked) {
      dispatch(setSelectedNode(node));
    } else {
      dispatch(deselectNode());
    }
  };

  const toggleSelection = () => {
    if (isSelected) {
      dispatch(deselectNode());
    } else {
      dispatch(setSelectedNode(node));
    }
  };

  return (
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
            <Checkbox size="small"
              checked={isSelected}
              onChange={handleSelectNode}
              className='selection-checkbox'
              sx={isSelected
                ? {
                  visibility: 'visible !important'
                }
                : {}
              }
            />
          </Tooltip>

          <Box display='flex'
            gap='4px'
            flexGrow='1'
            alignItems='center'
          >
            <Tooltip disableInteractive
              title='Toggle inner section'
            >
              <span
                className='expanded-carret'
                onClick={() => setIsExpanded(state => !state)}
                style={isExpanded
                  ? {
                    top: '2px'
                  }
                  : {
                    transform: 'rotate(180deg)',
                    top: '-2px'
                  }}
              >
                <ExpandMore />
              </span>
            </Tooltip>

            <Tooltip disableInteractive title={node.name}>
              <Typography noWrap
                onClick={toggleSelection}
              >
                {node.name !== '' ? node.name : '~New Node~'}
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
          </Box>
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default NodeComponent;