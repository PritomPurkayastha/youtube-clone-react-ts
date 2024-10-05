import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type YouTubeSearchResult = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    channelId?: string;
    videoId?: string;
    playlistId?: string
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

type Thumbnails = {
  default: {
    url: string;
    width?: number;
    height?: number;
  };
  medium: {
    url: string;
    width?: number;
    height?: number;
  };
  high: {
    url: string;
    width?: number;
    height?: number;
  };
}

const initialState: any = {
  searchQuery: '' as string,
  searchResult: null as YouTubeSearchResult[] | null,
};

export const fetchSearchResult = createAsyncThunk(
  "search/fetchList",
  async (params: any) => {
    const response = await axios.get(
      "/youtube-api/search",
      { params }
    );
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchSearchResult.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.searchResult = action.payload.items;
        }
      )
      .addCase(fetchSearchResult.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const searchListReducer = searchSlice.reducer;
export type { YouTubeSearchResult, Thumbnails };
export const { setSearchQuery } = searchSlice.actions;
