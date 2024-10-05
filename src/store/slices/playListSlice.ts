import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState: any = {
  
// }

export const fetchPlayListItems = createAsyncThunk(
  "search/playList",
  async (playListId: any) => {
    const params: any = {
      key:  import.meta.env.VITE_API_KEY,
      part: "snippet, contentDetails",
      playlistId: playListId
    };
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      { params }
    );
    return response.data;
  }
);