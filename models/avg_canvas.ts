import type AvgEdge from "./avg_edges";
import type AvgNode from "./avg_nodes";

export default interface AVGCanvas {
    nodes: AvgNode[];
    edges: AvgEdge[];
}