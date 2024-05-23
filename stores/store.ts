import type { I18nContent } from "@/components/LanguageSelector";
import type AVGCanvas from "@/models/avg_canvas";
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
    nodes: [
      {
        id: "d6a7bf968785936f",
        type: "text",
        text: "Widget",
        x: 1184,
        y: 740,
        width: 250,
        height: 60,
      },
      {
        id: "ba8f977cb8a8257f",
        type: "text",
        text: "StatefulWidget",
        x: 1056,
        y: 880,
        width: 250,
        height: 60,
      },
      {
        id: "fe43c784451d8351",
        type: "text",
        text: "StatelessWidget",
        x: 1385,
        y: 880,
        width: 250,
        height: 60,
      },
      {
        id: "ed72572aaa3b71b4",
        type: "text",
        text: "Page1",
        x: 965,
        y: 983,
        width: 250,
        height: 60,
      },
      {
        id: "28f3ed451c82e9dd",
        type: "text",
        text: "center",
        x: 280,
        y: 1646,
        width: 250,
        height: 60,
      },
      {
        id: "27e8a7c1d50820b1",
        type: "text",
        text: "MainAxisAlignment",
        x: 345,
        y: 1533,
        width: 250,
        height: 60,
      },
      {
        id: "ca34d5a6db1f61ef",
        type: "text",
        text: "Alignment",
        x: 520,
        y: 1413,
        width: 250,
        height: 60,
      },
      {
        id: "6b0e3e8608023a38",
        type: "text",
        text: "mainAxisAlignment",
        x: 645,
        y: 1282,
        width: 250,
        height: 60,
      },
      {
        id: "cd2c21029a739bfd",
        type: "text",
        text: "CrossAxisAlignment",
        x: 668,
        y: 1539,
        width: 250,
        height: 60,
      },
      {
        id: "92e5c22aa42e1566",
        type: "text",
        text: "center",
        x: 625,
        y: 1676,
        width: 250,
        height: 60,
      },
      {
        id: "3e22c9930bd25331",
        type: "text",
        text: "Column",
        x: 1057,
        y: 1252,
        width: 250,
        height: 60,
      },
      {
        id: "1f873c8b232d05cc",
        type: "text",
        text: "Text",
        x: 1365,
        y: 1646,
        width: 250,
        height: 60,
      },
      {
        id: "536fd914d110ae15",
        type: "text",
        text: "ElevatedButton",
        x: 1405,
        y: 1503,
        width: 250,
        height: 60,
      },
      {
        id: "63a5034481bed557",
        type: "text",
        text: "Row",
        x: 1465,
        y: 1312,
        width: 250,
        height: 60,
      },
      {
        id: "1bba22968eb27563",
        type: "text",
        text: "crossAxisAlignment",
        x: 965,
        y: 1616,
        width: 250,
        height: 60,
      },
    ],
    edges: [
      {
        id: "5984a3c9890e6942",
        fromNode: "d6a7bf968785936f",
        fromSide: "bottom",
        toNode: "ba8f977cb8a8257f",
        toSide: "top",
      },
      {
        id: "fab684078308a173",
        fromNode: "d6a7bf968785936f",
        fromSide: "bottom",
        toNode: "fe43c784451d8351",
        toSide: "top",
      },
      {
        id: "691dbf5f3af73ce4",
        fromNode: "ba8f977cb8a8257f",
        fromSide: "bottom",
        toNode: "ed72572aaa3b71b4",
        toSide: "top",
      },
      {
        id: "9077cba1b299d616",
        fromNode: "fe43c784451d8351",
        fromSide: "bottom",
        toNode: "3e22c9930bd25331",
        toSide: "top",
      },
      {
        id: "39c08ea0c1c09874",
        fromNode: "fe43c784451d8351",
        fromSide: "bottom",
        toNode: "63a5034481bed557",
        toSide: "top",
      },
      {
        id: "41099cb929596ded",
        fromNode: "3e22c9930bd25331",
        fromSide: "bottom",
        toNode: "536fd914d110ae15",
        toSide: "left",
      },
      {
        id: "16839bd4c58a0f08",
        fromNode: "3e22c9930bd25331",
        fromSide: "bottom",
        toNode: "1f873c8b232d05cc",
        toSide: "left",
      },
      {
        id: "e98a9e3eeba70c25",
        fromNode: "3e22c9930bd25331",
        fromSide: "left",
        toNode: "6b0e3e8608023a38",
        toSide: "top",
      },
      {
        id: "080a3b0100cdfdcc",
        fromNode: "63a5034481bed557",
        fromSide: "left",
        toNode: "1bba22968eb27563",
        toSide: "top",
      },
      {
        id: "25b0c9673aaf6e38",
        fromNode: "ca34d5a6db1f61ef",
        fromSide: "bottom",
        toNode: "27e8a7c1d50820b1",
        toSide: "top",
      },
      {
        id: "56b22b50f743cd7f",
        fromNode: "ca34d5a6db1f61ef",
        fromSide: "bottom",
        toNode: "cd2c21029a739bfd",
        toSide: "top",
      },
      {
        id: "ce21e04bd4039a5b",
        fromNode: "27e8a7c1d50820b1",
        fromSide: "bottom",
        toNode: "28f3ed451c82e9dd",
        toSide: "top",
      },
      {
        id: "ca9905a20439d02a",
        fromNode: "cd2c21029a739bfd",
        fromSide: "bottom",
        toNode: "92e5c22aa42e1566",
        toSide: "top",
      },
      {
        id: "e16eafc646ed2bf7",
        fromNode: "3e22c9930bd25331",
        fromSide: "left",
        toNode: "1bba22968eb27563",
        toSide: "top",
      },
    ],
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

export const { nodeModify, nodeAdded } = canvasSlice.actions;
export const { select, deselect } = selectionSlice.actions;
export const { setLanguage } = languageSlice.actions;
export default canvasSlice.reducer;
