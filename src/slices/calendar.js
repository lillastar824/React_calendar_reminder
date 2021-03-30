import { createSlice } from "@reduxjs/toolkit";
import { isBefore } from "date-fns";

const initialState = {};

const slice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent(state, actions) {
      let index = (state[actions.payload.id] ?? []).findIndex((item) => {
        return isBefore(
          new Date(`2020-09-13T${actions.payload.event.from}:00Z`),
          new Date(`2020-09-13T${item.from}:00Z`)
        );
      });
      if (index === -1) index = (state[actions.payload.id] ?? []).length;
      return {
        ...state,
        [actions.payload.id]: [
          ...(state[actions.payload.id] ?? []).slice(0, index),
          actions.payload.event,
          ...(state[actions.payload.id] ?? []).slice(index),
        ],
      };
    },
    deleteEvent(state, actions) {
      return {
        ...state,
        [actions.payload.id]: [
          ...state[actions.payload.id].slice(0, actions.payload.index),
          ...state[actions.payload.id].slice(actions.payload.index + 1),
        ],
      };
    },
    editEvent(state, actions) {
      return {
        ...state,
        [actions.payload.id]: [
          ...state[actions.payload.id].slice(0, actions.payload.index),
          actions.payload.event,
          ...state[actions.payload.id].slice(actions.payload.index + 1),
        ],
      };
    },
  },
});

export const reducer = slice.reducer;

export default slice;
