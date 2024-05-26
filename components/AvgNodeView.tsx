import {
  AnimatePresence,
  motion,
  MotionValue,
  useDragControls,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  clearDraggingEdge,
  edgeAdded,
  edgeDeleted,
  edgeModify,
  modifyDraggingEdge,
  nodeAdded,
  nodeDeleted,
  nodeModify,
  selectAvgCanvas,
  selectDraggingEdge,
  selectLanguage,
  setDraggingEdge,
} from "@/stores/store";
import { v1 } from "uuid";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import type AvgNode from "@/models/avg_nodes";
import clsx from "clsx";
import type AvgEdge from "@/models/avg_edges";

export default function AvgNodeView({ node, ...props }: { node?: AvgNode }) {
  const [editMode, setEditMode] = useState(node?.editing ?? false);
  const dispatch = useAppDispatch();

  const textArea = useRef<HTMLTextAreaElement>(null);

  // const [dragingEdge, setDragingEdge] = useState<AvgEdge>();
  const dragingEdge = useAppSelector(selectDraggingEdge);

  function refreshHeight() {
    if (textArea.current) {
      textArea.current.style.height = "auto";
      textArea.current.style.height = `${
        textArea.current.scrollHeight ?? 160
      }px`;
      if (node) {
        dispatch(
          nodeModify({ id: node.id, height: textArea.current.scrollHeight })
        );
      }
    }
  }
  refreshHeight();

  useEffect(() => {
    if (node?.editing) {
      textArea.current?.focus();
    }
  }, [node]);

  useEffect(() => {
    if (node) {
      dispatch(nodeModify({ id: node.id, editing: editMode }));
    }
  }, [node, editMode, dispatch]);

  const x = useMotionValue(node?.x ?? 0);
  const y = useMotionValue(node?.y ?? 0);
  const controls = useDragControls();

  function startDrag(event: PointerEvent | PointerEvent<Element>) {
    controls.start(event);
  }
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;
  return (
    <motion.div
      className="relative flex justify-center"
      drag={!editMode}
      dragMomentum={false}
      dragListener={false}
      dragControls={controls}
      onKeyUp={(e) => {
        if (!editMode) {
          switch (e.key) {
            case "Delete":
              if (node) {
                dispatch(nodeDeleted(node.id));
              }
              break;
          }
        }
      }}
      style={{
        position: "absolute",
        width: node?.width,
        height: node?.height,
        transform,
      }}
      _dragX={x}
      _dragY={y}
      onMouseMove={(e) => {
        // 判断鼠标位置相对于node来说是top | left | right | bottom，然后修改边的方向
        if (node && dragingEdge && dragingEdge.fromNode !== node.id) {
          const deltaX = e.pageX - node.x;
          const deltaY = e.pageY - node.y;
          const side =
            deltaX < node.width / 4
              ? "left"
              : deltaX > (node.width * 3) / 4
              ? "right"
              : deltaY < node.height / 4
              ? "top"
              : "bottom";
          console.log(dragingEdge);
          dispatch(
            edgeModify({
              id: dragingEdge.id,
              toNode: node.id,
              toSide: side,
            })
          );
          dispatch(modifyDraggingEdge({ toNode: node.id, toSide: side }));
        }
      }}
      onMouseLeave={() => {
        if (dragingEdge) {
          dispatch(edgeModify({ id: dragingEdge.id, toNode: null }));
          dispatch(modifyDraggingEdge({ toNode: null }));
        }
      }}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditMode(true);
      }}
      onDrag={(e: MouseEvent, info) => {
        e.preventDefault();
        e.stopPropagation();
        if (node) {
          dispatch(
            nodeModify({
              id: node.id,
              x: node.x + info.delta.x,
              y: node.y + info.delta.y,
            })
          );
        }
      }}
      // onDragEnd={(e: MouseEvent, info) => {

      // }}
      onBlur={() => {
        setEditMode(false);
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      {...props}
    >
      <textarea
        ref={textArea}
        readOnly={!editMode}
        onPointerDown={startDrag}
        className={clsx(
          "textarea textarea-bordered w-64 focus-visible:outline-offset-0 rounded overflow-hidden resize-none",
          {
            "cursor-grab select-none": !editMode,
          }
        )}
        // onMouseDown={(e) => {
        //   if (e.buttons === 1 && node && !editMode) {
        //     setMouseOffset({ x: e.clientX - node.x, y: e.clientY - node.y });
        //     setIsDragging(true);
        //   }
        // }}
        // onMouseUp={() => {
        //   setIsDragging(false);
        // }}
        // onMouseLeave={() => {
        //   setIsDragging(false);
        // }}
        onKeyDown={(e) => {
          if (node) {
            if (editMode) {
              switch (e.key) {
                case "Escape":
                  e.preventDefault();
                  e.stopPropagation();
                  setEditMode(false);

                  break;
              }
            } else {
              switch (e.key) {
                case "Enter": {
                  e.preventDefault();
                  e.stopPropagation();
                  setEditMode(false);
                  const newId = v1();
                  dispatch(
                    nodeAdded({
                      id: newId,
                      x: node.x,
                      y: node.y + 100,
                      text: "",
                      type: "",
                      height: 48,
                      width: 256,
                      editing: true,
                    })
                  );
                  dispatch(
                    edgeAdded({
                      id: v1(),
                      fromNode: node.id,
                      fromSide: "bottom",
                      toNode: newId,
                      toSide: "top",
                    })
                  );
                  break;
                }
              }
            }
          }
        }}
        // onMouseMove={(e) => {
        //   if (e.buttons === 1 && node) {
        //     if (isDragging) {
        //       const deltaX = e.clientX - mouseOffset.x;
        //       const deltaY = e.clientY - mouseOffset.y;
        //       dispatch(
        //         nodeModify({
        //           id: node.id,
        //           x: deltaX,
        //           y: deltaY,
        //         })
        //       );
        //     }
        //   }
        // }}
        onKeyUp={() => {
          refreshHeight();
        }}
        value={node?.text}
        onChange={(e) => {
          if (node) {
            // node.text = e.target.value;
            dispatch(nodeModify({ id: node.id, text: e.target.value }));
          }
        }}
      />
      {/* move */}
      <motion.div
        className="drag-ball"
        onPointerDown={(e) => {
          if (node) {
            const edge: AvgEdge = {
              id: v1(),
              fromNode: node.id,
              fromSide: "bottom",
              x: e.pageX,
              y: e.pageY,
              toSide: "top",
            };
            dispatch(setDraggingEdge(edge));
            dispatch(edgeAdded(edge));
          }
        }}
        onPan={(e) => {
          if (dragingEdge) {
            dispatch(
              edgeModify({
                id: dragingEdge.id,
                x: e.pageX,
                y: e.pageY,
              })
            );
          }
        }}
        onPanEnd={(e, info) => {
          if (dragingEdge) {
            console.log(dragingEdge);
            if (!dragingEdge.toNode) {
              dispatch(edgeDeleted(dragingEdge.id));
            }
            dispatch(clearDraggingEdge());
          }
        }}
      />
    </motion.div>
  );
}
