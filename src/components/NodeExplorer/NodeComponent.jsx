import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Box, Typography } from "@mui/joy";
import { useSelector } from "react-redux";

const indentation = 16;

const NodeComponent = ({
  node,
  level = 0
}) => {
  const nodes = useSelector(state => state.campaign.data.nodes);

  return (
    <AccordionGroup size="small"
      sx={{
        marginLeft: `${level * indentation}px`
      }}
    >
      <Accordion defaultExpanded>
        <AccordionSummary>
          <Typography
            noWrap
          >
            {node.name}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          {node.childrenIds.map(childId => (
            <NodeComponent
              key={childId}
              node={nodes[childId]}
              level={level + 1}
            />
          ))}
          {node.childrenIds.length === 0 &&
            <Typography
              sx={{
                fontStyle: 'italic',
                marginLeft: `${indentation}px`,
              }}
            >
              &#123;empty&#125;
            </Typography>
          }
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
};

export default NodeComponent;