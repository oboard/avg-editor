import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { nodeAdded, selectAvgCanvas } from "@/stores/store";
import { v1 } from "uuid";
import AvgNodeView from "./AvgNodeView";

export default function AvgCanvasView() {
  const data = useAppSelector(selectAvgCanvas);
  const dispatch = useAppDispatch();

  return (
    <div
      className="w-full h-full"
      onDoubleClick={(e) => {
        dispatch(
          nodeAdded({
            x: Math.round(e.clientX - 128),
            y: Math.round(e.clientY - 24),
            id: v1(),
            type: "say",
            text: "",
          })
        );
      }}
    >
      {data.nodes.map((node) => (
        <AvgNodeView key={node.id} node={node} />
      ))}

    </div>
  );
}
