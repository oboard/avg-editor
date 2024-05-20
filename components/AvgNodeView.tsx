import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  nodeAdded,
  nodeModify,
  selectAvgNode,
  selectLanguage,
} from "@/stores/store";
import { v1 } from "uuid";
import { useRef, useState } from "react";

export default function AvgNodeView({ nodes, ...props }: { nodes?: AvgNode }) {
  const globaNodes = useAppSelector(selectAvgNode);
  const dispatch = useAppDispatch();
  nodes ??= globaNodes;
  // const lang = useAppSelector(selectLanguage);

  const textArea = useRef<HTMLTextAreaElement>(null);

  function refreshHeight() {
    if (textArea.current) {
      textArea.current.style.height = "auto";
      textArea.current.style.height = `${
        textArea.current.scrollHeight ?? 160
      }px`;
    }
  }
  refreshHeight();

  return (
    <AnimatePresence {...props}>
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, filter: "blur(10px)", height: 0 }}
        animate={{ opacity: 1, filter: "blur(0px)", height: "auto" }}
        exit={{ opacity: 0 }}
      >
        {nodes && (
          <div className="relative flex justify-center">
            <textarea
              ref={textArea}
              className="textarea textarea-bordered w-64 focus-visible:outline-offset-0 rounded overflow-hidden resize-none"
              onKeyUp={() => {
                refreshHeight();
              }}
              value={nodes.content[lang]}
              onChange={(e) => {
                if (!nodes) return;
                if (nodes.content[lang] !== e.target.value) {
                  dispatch(
                    nodeModify({
                      id: nodes.id,
                      content: {
                        [lang]: e.target.value,
                      },
                    })
                  );
                }
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 text-xs text-base-content"
              style={{ height: "24px" }}
            >
              <div>
                <motion.button
                  className="btn btn-circle"
                  onClick={() => {
                    // 记录现在浏览器横轴坐标

                    const x = window.scrollX;
                    dispatch(
                      nodeAdded({
                        id: v1(),
                        text: "",
                        type: "",
                      })
                    );
                    // 还原

                    window.scrollTo(x, window.scrollY);
                  }}
                >
                  <Icon icon="mdi:add" width={24} />
                </motion.button>
              </div>
            </div>
          </div>
        )}
        {nodes?.children.length !== 0 && (
          <div className="w-0.5 h-4 m-2 bg-base-content bg-opacity-20 self-center" />
        )}
        <motion.div className="flex flex-row items-start gap-2">
          {nodes?.children.map((child, index) => (
            <AvgNodeView key={child.id} nodes={child} />
          ))}
        </motion.div>
        {/* {nodes?.children.length === 0 && (
          <div>
            <motion.button
              className="btn btn-ghost btn-circle"
              onClick={() => {
                dispatch(
                  nodeAdded({
                    id: v1(),
                    content: {
                      zh_CN: "",
                      en_US: "",
                    },
                    children: [],
                    parentId: nodes.id,
                    type: "",
                  })
                );
              }}
            >
              <Icon icon="mdi:add" width={24} />
            </motion.button>
          </div>
        )} */}
      </motion.div>
    </AnimatePresence>
  );
}
