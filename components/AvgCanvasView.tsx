import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { nodeAdded, selectAvgCanvas, selectSelected } from "@/stores/store";
import { v1 } from "uuid";
import AvgNodeView from "./AvgNodeView";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type AvgNode from "@/models/avg_nodes";
import type AvgEdge from "@/models/avg_edges";

interface PosData {
  id: string;
  x: number;
  y: number;
  side: "top" | "bottom" | "left" | "right";
}

export default function AvgCanvasView() {
  const data = useAppSelector(selectAvgCanvas);
  const selected = useAppSelector(selectSelected);
  const dispatch = useAppDispatch();
  // const [transform, setTransform] = useState({
  //   x: 0,
  //   y: 0,
  //   scale: 1,
  // });

  // const edgesData = useMemo(() => {
  //   function getNodePos(nodeId: string, side: string) {
  //     const node = data.nodes.find((n) => n.id === nodeId);
  //     const posData = {
  //       id: nodeId,
  //       x: 0,
  //       y: 0,
  //     } as PosData;
  //     if (node) {
  //       switch (side) {
  //         case "top":
  //           posData.x = node.x + node.width / 2;
  //           posData.y = node.y;
  //           break;
  //         case "bottom":
  //           posData.x = node.x + node.width / 2;
  //           posData.y = node.y + node.height;
  //           break;
  //         case "left":
  //           posData.x = node.x;
  //           posData.y = node.y + node.height / 2;
  //           break;
  //         case "right":
  //           posData.x = node.x + node.width;
  //           posData.y = node.y + node.height / 2;
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //     return posData;
  //   }
  //   return data.edges.map((edge) => ({
  //     source: getNodePos(edge.fromNode, edge.fromSide),
  //     target: getNodePos(edge.toNode, edge.toSide),
  //   }));
  // }, [data]);

  function createCubicBezier(edge: AvgEdge) {
    const fromNode = data.nodes.find((node) => node.id === edge.fromNode);
    const toNode = data.nodes.find((node) => node.id === edge.toNode);

    if (!fromNode) {
      return "";
    }

    // 计算起始点和结束点
    // const fromX = fromNode.x + fromNode.width / 2;
    // const fromY = fromNode.y + fromNode.height;
    // const toX = toNode ? toNode.x + toNode.width / 2 : edge.x;
    // const toY = toNode ? toNode.y : edge.y ?? 0;
    // 根据edge.fromSide和edge.toSide计算起始点和结束点，top | left | bottom | right
    const fromX =
      edge.fromSide === "top" || edge.fromSide === "bottom"
        ? fromNode.x + fromNode.width / 2
        : edge.fromSide === "left"
        ? fromNode.x
        : fromNode.x + fromNode.width;
    const fromY =
      edge.fromSide === "top"
        ? fromNode.y
        : edge.fromSide === "bottom"
        ? fromNode.y + fromNode.height
        : edge.fromSide === "left" || edge.fromSide === "right"
        ? fromNode.y + fromNode.height / 2
        : 0;
    const toX = toNode
      ? edge.toSide === "top" || edge.toSide === "bottom"
        ? toNode.x + toNode.width / 2
        : edge.toSide === "left"
        ? toNode.x
        : toNode.x + toNode.width
      : edge.x ?? 0;
    const toY = toNode
      ? edge.toSide === "top"
        ? toNode.y
        : edge.toSide === "bottom"
        ? toNode.y + toNode.height
        : edge.toSide === "left" || edge.toSide === "right"
        ? toNode.y + toNode.height / 2
        : 0
      : edge.y ?? 0;

    // 根据连接边的方向计算控制点
    // const controlPoint1X = fromX;
    // const controlPoint1Y = fromY + (toY - fromY) / 2; // 垂直方向的中间点
    // const controlPoint2X = toX;
    // const controlPoint2Y = controlPoint1Y; // 水平方向的中间点
    const controlPoint1X =
    edge.fromSide === "top" || edge.fromSide === "bottom"
      ? fromX
      : edge.fromSide === "left" || edge.fromSide === "right"
      ? fromX + (toX - fromX) / 2
      : fromX + (toX - fromX) * 0.25; // 当fromSide是left或right时，控制点更靠近fromX
  
  const controlPoint1Y =
    edge.fromSide === "top" || edge.fromSide === "bottom"
      ? fromY + (toY - fromY) / 2
      : edge.fromSide === "left" || edge.fromSide === "right"
      ? fromY
      : fromY + (toY - fromY) * 0.25; // 当fromSide是left或right时，控制点更靠近fromY
  
  const controlPoint2X =
    edge.toSide === "top" || edge.toSide === "bottom"
      ? toX
      : edge.toSide === "left" || edge.toSide === "right"
      ? toX + (fromX - toX) / 2
      : toX + (fromX - toX) * 0.25; // 当toSide是left或right时，控制点更靠近toX
  
  const controlPoint2Y =
    edge.toSide === "top" || edge.toSide === "bottom"
      ? toY + (fromY - toY) / 2
      : edge.toSide === "left" || edge.toSide === "right"
      ? toY
      : toY + (fromY - toY) * 0.25; // 当toSide是left或right时，控制点更靠近toY

    // 构建SVG路径命令
    const pathD = `M ${fromX} ${fromY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${toX} ${toY}`;

    return pathD;
  }

  return (
    <div
      className="w-full h-full overflow-visible"
      onDoubleClick={(e) => {
        dispatch(
          nodeAdded({
            x: Math.round(e.pageX - 128),
            y: Math.round(e.pageY - 24),
            id: v1(),
            type: "say",
            text: "",
            height: 48,
            width: 256,
            editing: true,
          })
        );
      }}
    >
      <pre className="fixed z-10 w-1/3 h-1/2 bg-gray-100 overflow-scroll">
        {JSON.stringify(
          data.nodes.map((node) => {
            return {
              TextId: node.id,
              Type: "say",
              Emotion: "happy",
              Character: "lwy",
              SourceText: node.text,
              Interactable: false,
              WatingForComplete: true,
              TaskID: null,
            };
          }),
          null,
          2
        )}
      </pre>
      <div className="overflow-visible">
        <svg className="absolute z-2 w-full h-full overflow-visible">
          <title>edges</title>

          {/* <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,7 L10,3.5 Z" fill="black" />
            </marker>
          </defs> */}
          {data.edges.map((edge) => (
            <path
              key={edge.id}
              d={createCubicBezier(edge)}
              stroke="black"
              fill="none"
              stroke-width="2"
            />
          ))}
        </svg>
        {data.nodes.map((node) => (
          <AvgNodeView key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
