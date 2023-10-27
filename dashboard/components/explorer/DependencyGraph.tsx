import React, { useState, memo } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import Cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
// @ts-ignore
import nodeHtmlLabel from 'cytoscape-node-html-label';
// @ts-ignore
import COSEBilkent from 'cytoscape-cose-bilkent';
import EmptyState from '@components/empty-state/EmptyState';
import Tooltip from '@components/tooltip/Tooltip';
import WarningIcon from '@components/icons/WarningIcon';
import { ReactFlowData } from './hooks/useDependencyGraph';
import {
  edgeStyleConfig,
  graphLayoutConfig,
  leafStyleConfig,
  maxZoom,
  minZoom,
  nodeHTMLLabelConfig,
  nodeStyeConfig,
  zoomLevelBreakpoint
} from './config';
import { animateEdges } from './animateEdge';

export type DependencyGraphProps = {
  data: ReactFlowData;
};

nodeHtmlLabel(Cytoscape.use(COSEBilkent));
Cytoscape.use(popper);
const DependencyGraph = ({ data }: DependencyGraphProps) => {
  const [initDone, setInitDone] = useState(false);

  const dataIsEmpty: boolean = data.nodes.length === 0;

  const cyActionHandlers = (cy: Cytoscape.Core) => {
    // make sure we did not init already, otherwise this will be bound more than once
    if (!initDone) {
      // Add HTML labels for better flexibility
      // @ts-ignore
      cy.nodeHtmlLabel([
        {
          ...nodeHTMLLabelConfig,
          tpl(templateData: Cytoscape.NodeDataDefinition) {
            return `<div><p style="font-size: 10px; text-shadow: 0 0 5px #F4F9F9,0 0 5px #F4F9F9,
                 0 0 5px #F4F9F9,0 0 5px #F4F9F9,
                 0 0 5px #F4F9F9,0 0 5px #F4F9F9,
                 0 0 5px #F4F9F9,0 0 5px #F4F9F9;" class="text-black-700 text-ellipsis max-w-[100px] overflow-hidden whitespace-nowrap text-center" title="${
                   templateData.label
                 }">${templateData.label || '&nbsp;'}</p>
              <p style="font-size: 10px; text-shadow: 0 0 5px #F4F9F9,0 0 5px #F4F9F9,
                 0 0 5px #F4F9F9,0 0 5px #F4F9F9,
                 0 0 5px #F4F9F9,0 0 5px #F4F9F9,
                 0 0 5px #F4F9F9,0 0 5px #F4F9F9;" class="text-black-400 text-ellipsis max-w-[100px] overflow-hidden whitespace-nowrap text-center font-thin" title="${
                   templateData.label
                 }">${templateData.service || '&nbsp;'}</p></div>`;
          }
        }
      ]);
      // Add class to leave nodes so we can make them smaller
      cy.nodes().leaves().addClass('leaf');
      // same for root notes
      cy.nodes().roots().addClass('root');

      // Add hover tooltip on edges
      cy.edges().bind('mouseover', event => {
        if (cy.zoom() >= zoomLevelBreakpoint) {
          // eslint-disable-next-line no-param-reassign
          event.target.popperRefObj = event.target.popper({
            content: () => {
              const content = document.createElement('div');
              content.classList.add('popper-div');
              content.innerHTML = event.target.data('label');

              document.body.appendChild(content);
              return content;
            }
          });
        }
      });
      // Hide Edges tooltip on mouseout
      cy.edges().bind('mouseout', event => {
        if (cy.zoom() >= zoomLevelBreakpoint && event.target.popperRefObj) {
          event.target.popperRefObj.state.elements.popper.remove();
          event.target.popperRefObj.destroy();
        }
      });

      // Hide labels when being zoomed out
      cy.on('zoom', () => {
        const opacity = cy.zoom() <= zoomLevelBreakpoint ? 0 : 1;

        Array.from(
          document.querySelectorAll<HTMLDivElement>(
            '.dependency-graph-node-label'
          ),
          e => {
            e.style.opacity = opacity.toString();
            return e;
          }
        );
      });
      // Make sure to tell we inited successfully and prevent another init
      setInitDone(true);
    } else {
      // Because the animation requires the DOM, we need to wait until the DOM is ready
      animateEdges(
        {
          direction: 'alternate',
          mode: 'speed',
          modeValue: 0.2,
          randomOffset: true
        },
        cy
      );
    }
  };

  return (
    <div className="relative h-full flex-1 bg-dependency-graph bg-[length:40px_40px]">
      {dataIsEmpty ? (
        <>
          <div className="translate-y-[201px]">
            <EmptyState
              title="No results for this filter"
              message="It seems like you have no cloud resources matching the filters you added"
              mascotPose="tablet"
            />
          </div>
        </>
      ) : (
        <>
          <CytoscapeComponent
            className="h-full w-full"
            elements={CytoscapeComponent.normalizeElements({
              nodes: data.nodes,
              edges: data.edges
            })}
            maxZoom={maxZoom}
            minZoom={minZoom}
            layout={graphLayoutConfig}
            stylesheet={[
              {
                selector: 'node',
                style: nodeStyeConfig
              },
              {
                selector: 'edge',
                style: edgeStyleConfig
              },
              {
                selector: '.leaf',
                style: leafStyleConfig
              }
            ]}
            cy={(cy: Cytoscape.Core) => cyActionHandlers(cy)}
          />
        </>
      )}
      <div className="absolute bottom-0 left-0 flex gap-2 overflow-visible bg-black-100 text-black-400">
        {data?.nodes?.length} Resources
        {!dataIsEmpty && (
          <div className="relative">
            <WarningIcon className="peer" height="16" width="16" />
            <Tooltip bottom="xs" align="left" width="lg">
              Only AWS resources are currently supported on the explorer.
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(DependencyGraph);
