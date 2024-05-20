export default interface AvgEdge {
  id: string;
  fromNode: string;
  fromSide: "top" | "bottom" | "left" | "right";
  toNode: string;
  toSide: "top" | "bottom" | "left" | "right";
}
