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
  combineReducers,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";

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
    nodeDeleted(state, action: PayloadAction<string>) {
      state.nodes = state.nodes.filter((n) => n.id !== action.payload);
      // 同时删除与该节点相关的边
      state.edges = state.edges.filter(
        (e) => e.fromNode !== action.payload && e.toNode !== action.payload
      );
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
    edgeDeleted(state, action: PayloadAction<string>) {
      state.edges = state.edges.filter((e) => e.id !== action.payload);
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

const draggingEdgeSlice = createSlice({
  name: "draggingEdge",
  initialState: { draggingEdge: null as AvgEdge | null },
  reducers: {
    setDraggingEdge(state, action: PayloadAction<AvgEdge | null>) {
      state.draggingEdge = action.payload;
    },
    modifyDraggingEdge(state, action) {
      const edge = state.draggingEdge;
      if (edge) {
        Object.assign(edge, action.payload);
      }
    },
    clearDraggingEdge(state) {
      state.draggingEdge = null;
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

// 持久化配置
const persistConfig = {
  key: "root",
  storage,
  // whitelist: [], // 需要持久化保存的模块，默认保存所有模块（语义：白名单）
  // blacklist: [], // 不需要持久化保存的模块，默认不保存任何模块（语义：黑名单）
};

// 创建reducer(合并拆分的reducer)
const rootReducer = combineReducers({
  canvas: canvasSlice.reducer,
  selection: selectionSlice.reducer,
  language: languageSlice.reducer,
  draggingEdge: draggingEdgeSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export const selectAvgCanvas = (state: RootState) => state.canvas;
export const selectLanguage = (state: RootState) => state.language.lang;
export const selectSelected = (state: RootState) => state.selection.selected;
export const selectDraggingEdge = (state: RootState) =>
  state.draggingEdge.draggingEdge;

export const {
  nodeModify,
  nodeAdded,
  edgeAdded,
  edgeModify,
  nodeDeleted,
  edgeDeleted,
} = canvasSlice.actions;
export const { select, deselect } = selectionSlice.actions;
export const { setLanguage } = languageSlice.actions;
export const { setDraggingEdge, modifyDraggingEdge, clearDraggingEdge } = draggingEdgeSlice.actions;
export default canvasSlice.reducer;
