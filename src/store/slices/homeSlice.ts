import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CategoryType {
  id: string;
  name: string;
}
const initialState: any = {
  categoryList: [],
  selectedCategoryId: "0",
  showSidebar: true,
  isWatchActive: false,
};

export const fetchCategoryList = createAsyncThunk(
  "category/fetchList",
  async () => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videoCategories",
      {
        params: {
          key: import.meta.env.VITE_API_KEY,
          part: "snippet",
          regionCode: "IN",
        },
      }
    );
    return response.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateSelcetedCategory: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setIsWatchActive: (state, action) => {
      state.isWatchActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCategoryList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.categoryList.length = 0;
          state.categoryList.push({
            id: "0",
            name: "All",
          });
          for (let i = 0; i < 20; i++) {
            const data: CategoryType = {
              id: action.payload.items[i].id,
              name: action.payload.items[i].snippet.title,
            };
            state.categoryList.push(data);
          }
        }
      )
      .addCase(fetchCategoryList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { updateSelcetedCategory, toggleSidebar, setIsWatchActive } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
export type { CategoryType };
