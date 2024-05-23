import type { I18nContent } from "@/components/LanguageSelector";
import type AVGCanvas from "@/models/avg_canvas";
import type AvgEdge from "@/models/avg_edges";
import type AvgNode from "@/models/avg_nodes";
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

const canvasSlice = createSlice({
  name: "nodes",
  initialState: {
    nodes: [],
    edges: [],
  } as AVGCanvas,
  reducers: {
    nodeModify(state, action) {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        Object.assign(node, action.payload);
      }
    },
    nodeAdded(state, action: PayloadAction<AvgNode>) {
      state.nodes.push(action.payload);
    },
    edgeAdded(state, action: PayloadAction<AvgEdge>) {
      state.edges.push(action.payload);
    },
    edgeModify(state, action) {
      const edge = state.edges.find((e) => e.id === action.payload.id);
      if (edge) {
        Object.assign(edge, action.payload);
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

const selectionSlice = createSlice({
  name: "selection",
  initialState: { selected: [] as string[] },
  reducers: {
    select(state, action: PayloadAction<string[]>) {
      state.selected.push(...action.payload);
    },
    deselect(state, action: PayloadAction<string[]>) {
      state.selected = state.selected.filter(
        (id) => !action.payload.includes(id)
      );
    },
  },
});

export const store = configureStore({
  reducer: {
    canvas: canvasSlice.reducer,
    selection: selectionSlice.reducer,
    language: languageSlice.reducer,
  },
});

export const selectAvgCanvas = (state: RootState) => state.canvas;
export const selectLanguage = (state: RootState) => state.language.lang;
export const selectSelected = (state: RootState) => state.selection.selected;

export const { nodeModify, nodeAdded, edgeAdded, edgeModify } =
  canvasSlice.actions;
export const { select, deselect } = selectionSlice.actions;
export const { setLanguage } = languageSlice.actions;
export default canvasSlice.reducer;
