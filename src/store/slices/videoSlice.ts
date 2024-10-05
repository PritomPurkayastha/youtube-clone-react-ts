import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
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
    commentCount: string;
    favoriteCount?: string;
    likeCount: string;
    viewCount: string;
  }
};

export const fetchVideoList = createAsyncThunk(
  "video/fetchList",
  async (selectedCategoryId: string) => {
    const params: any = {
      key:  import.meta.env.VITE_API_KEY,
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

export const fetchSingleVideoData = createAsyncThunk(
  "video/fetchVideo",
  async (videoId: string) => {
    const params: any = {
      key:  import.meta.env.VITE_API_KEY,
      part: "snippet, statistics",
      id: videoId
    };
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
  currentVideoData: null as YouTubeVideo | null
};

const videoListSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setCurrentVideo: (state, action) => {
      state.currentVideoData = action.payload;
    }
  },
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
      })
      .addCase(
        fetchSingleVideoData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.currentVideoData = action.payload.items[0]
        }
      )
      .addCase(fetchSingleVideoData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const videoListReducer = videoListSlice.reducer;
export type { YouTubeVideo };
export const {setCurrentVideo} = videoListSlice.actions;
