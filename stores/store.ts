import type { AvgNode, I18nContent } from "@/app/page";

import {
  configureStore,
  type ThunkAction,
  type Action,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const nodesSlice = createSlice({
  name: "nodes",
  initialState: {
    id: "root",
    type: "root",
    content: {
      zh_CN: "根节点",
      en_US: "Root Node",
    },
    children: [],
    parentId: "",
  } as AvgNode,
  reducers: {
    nodeModify(state, action) {
      const { id, content } = action.payload;
      function findNode(node: AvgNode): AvgNode | undefined {
        if (node.id === id) {
          return node;
        }

        for (const child of node.children) {
          const result = findNode(child);
          if (result) {
            return result;
          }
        }

        return undefined;
      }

      const node = findNode(state);
      if (node) {
        node.content = Object.assign(node.content, content);
      }
    },
    nodeAdded(state, action: PayloadAction<AvgNode>) {
      function findParent(node: AvgNode, id: string): AvgNode | undefined {
        if (node.id === id) {
          return node;
        }

        for (const child of node.children) {
          const result = findParent(child, id);
          if (result) {
            return result;
          }
        }

        return undefined;
      }

      const node = action.payload;
      const parent = findParent(state, node.parentId);
      if (parent) {
        parent.children.push(node);
      }
    },
  },
});

const languageSlice = createSlice({
  name: "language",
  initialState: { lang: "zh_CN" },
  reducers: {
    setLanguage(state, action: PayloadAction<I18nContent>) {
      state.lang = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    nodes: nodesSlice.reducer,
    language: languageSlice.reducer,
  },
});

export const selectAvgNode = (state: RootState) => state.nodes;
export const selectLanguage = (state: RootState) => state.language.lang;

export const { nodeModify, nodeAdded } = nodesSlice.actions;
export const { setLanguage } = languageSlice.actions;
export default nodesSlice.reducer;
