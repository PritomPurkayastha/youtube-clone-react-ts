import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./slices/homeSlice";
import { videoListReducer } from "./slices/videoSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    video: videoListReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];

export default store;
