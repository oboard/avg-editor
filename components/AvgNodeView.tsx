import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  nodeAdded,
  nodeModify,
  selectAvgCanvas,
  selectLanguage,
} from "@/stores/store";
import { v1 } from "uuid";
import { useEffect, useRef, useState } from "react";
import type AvgNode from "@/models/avg_nodes";
import clsx from "clsx";

export default function AvgNodeView({ node, ...props }: { node?: AvgNode }) {
  const [editMode, setEditMode] = useState(true);
  const dispatch = useAppDispatch();

  const textArea = useRef<HTMLTextAreaElement>(null);

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
    if (node) {
      textArea.current?.focus();
    }
  }, [node]);

  const x = useMotionValue(node?.x ?? 0);
  const y = useMotionValue(node?.y ?? 0);
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;
  console.log("node", node);
  return (
    <motion.div
      className="relative flex justify-center"
      drag
      dragMomentum={false}
      style={{
        position: "absolute",
        width: node?.width,
        height: node?.height,
        transform,
      }}
      _dragX={x}
      _dragY={y}
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
          if (node && !editMode) {
            switch (e.key) {
              case "Enter":
                e.preventDefault();
                e.stopPropagation();
                setEditMode(false);
                dispatch(
                  nodeAdded({
                    id: v1(),
                    x: node.x,
                    y: node.y + 100,
                    text: "",
                    type: "",
                    height: 48,
                    width: 128,
                  })
                );
                break;
              case "Escape":
                e.preventDefault();
                e.stopPropagation();
                setEditMode(false);

                break;
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
      {/* <div className="absolute top-0 right-0 z-10">
        <Icon icon="mdi:cursor-move" className="cursor-move" />
      </div> */}
    </motion.div>
  );
}
