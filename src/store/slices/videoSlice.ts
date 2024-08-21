import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type thumbnail = {
  url: string;
  width: number;
  height: number;
};
type YouTubeVideo = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: thumbnail;
      medium: thumbnail;
      high: thumbnail;
      standard: thumbnail;
      maxres?: thumbnail;
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent?: string;
    defaultLanguage?: string;
    localized?: {
      title: string;
      description: string;
    };
    defaultAudioLanguage?: string;
  };
  statistics: {
    commentcount: string;
    favoriteCount?: string;
    likeCount: string;
    viewCount: string;
  }
};

export const fetchVideoList = createAsyncThunk(
  "video/fetchList",
  async (selectedCategoryId: string) => {
    const params: any = {
      key: "AIzaSyCFDi1fdQUIPk72YFZ4sjtBAzR7FHh-xeg",
      part: "snippet, statistics",
      maxResults: 30,
      chart: "mostPopular",
    };
    if (selectedCategoryId !== "0") {
      params.videoCategoryId = selectedCategoryId;
    }
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      { params }
    );
    return response.data;
  }
);

const initialState: any = {
  homeVideoList: [] as YouTubeVideo[],
  nextPageToken: "" as string,
};

const videoListSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchVideoList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.homeVideoList.length = 0;
          state.homeVideoList.push(...action.payload.items);
        }
      )
      .addCase(fetchVideoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const videoListReducer = videoListSlice.reducer;
export type { YouTubeVideo };
