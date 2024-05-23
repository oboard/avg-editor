import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { nodeAdded, selectAvgCanvas, selectSelected } from "@/stores/store";
import { v1 } from "uuid";
import AvgNodeView from "./AvgNodeView";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AvgCanvasView() {
  const data = useAppSelector(selectAvgCanvas);
  const selected = useAppSelector(selectSelected);
  const dispatch = useAppDispatch();
  // const [transform, setTransform] = useState({
  //   x: 0,
  //   y: 0,
  //   scale: 1,
  // });

  const edgesData = useMemo(() => {
    function getNodePos(nodeId: string, side: string) {
      const node = data.nodes.find((n) => n.id === nodeId);
      const posData = {
        id: nodeId,
        x: 0,
        y: 0,
      };
      if (node) {
        switch (side) {
          case "top":
            posData.x = node.x + node.width / 2;
            posData.y = node.y;
            break;
          case "bottom":
            posData.x = node.x + node.width / 2;
            posData.y = node.y + node.height;
            break;
          case "left":
            posData.x = node.x;
            posData.y = node.y + node.height / 2;
            break;
          case "right":
            posData.x = node.x + node.width;
            posData.y = node.y + node.height / 2;
            break;
          default:
            break;
        }
      }
      return posData;
    }
    return data.edges.map((edge) => ({
      source: getNodePos(edge.fromNode, edge.fromSide),
      target: getNodePos(edge.toNode, edge.toSide),
    }));
  }, [data]);

  return (
    <div
      className="w-full h-full overflow-visible"
      onDoubleClick={(e) => {
        dispatch(
          nodeAdded({
            x: Math.round(e.clientX - 128),
            y: Math.round(e.clientY - 24),
            id: v1(),
            type: "say",
            text: "",
            height: 48,
            width: 256,
          })
        );
      }}
    >
      <div className="overflow-visible">
        {data.nodes.map((node) => (
          <AvgNodeView key={node.id} node={node} />
        ))}
        <svg className="w-full h-full overflow-visible">
          <title>edges</title>
          {edgesData.map((edge) => (
            <path
              key={edge.source.id + edge.target.id}
              d={`M ${edge.source.x} ${edge.source.y} L ${edge.target.x} ${edge.target.y}`}
              stroke="black"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
