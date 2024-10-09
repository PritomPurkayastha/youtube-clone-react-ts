import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type CommentThread = {
  kind: string;
  etag: string;
  id: string;
  snippet: CommentThreadSnippet;
  replies: Replies[]
};

type CommentThreadSnippet = {
  channelId: string;
  videoId: string;
  topLevelComment: TopLevelComment;
  canReply: boolean;
  totalReplyCount: number;
  isPublic: boolean;
};

type TopLevelComment = {
  kind: string;
  etag: string;
  id: string;
  snippet: CommentSnippet;
};

type CommentSnippet = {
  channelId: string;
  videoId: string;
  textDisplay: string;
  textOriginal: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: AuthorChannelId;
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: string;
  updatedAt: string;
};

type AuthorChannelId = {
  value: string;
};
type Replies = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    textDisplay: string;
    textOriginal: string;
    parentId: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: {
      value: string;
    };
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
  };
}

const initialState: any = {
  comments: [] as CommentThread[],
  nextPageToken: '' as string
}

export const fetchTopLevelComments = createAsyncThunk(
  "comment/fetchList",
  async ({ videoId, nextPageToken = "" }: { videoId: string; nextPageToken?: string | null }) => {
    const params: any = {
      key: import.meta.env.VITE_API_KEY,
      part: "snippet",
      maxResults: 20,
      videoId: videoId,
    };
    if (nextPageToken) {
      params.pageToken = nextPageToken;
    }
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/commentThreads",
      { params }
    );
    return response.data;
  }
);

export const fetchCommentReplies = createAsyncThunk(
  'reply/fetchList',
  async (commentId: string) => {
    const params: any = {
      key: import.meta.env.VITE_API_KEY,
      part: "snippet",
      maxResults: 20,
      parentId: commentId,
    }
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/comments",
      {params}
    );
    return response.data;
  }
)

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetComments: (state) => {
      state.comments.length = 0;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(
      fetchTopLevelComments.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.comments.push(...action.payload.items);
        if(action.payload.nextPageToken) {
          state.nextPageToken = action.payload.nextPageToken;
        } else {
          state.nextPageToken = '';
        }
      }
    )
    .addCase(fetchTopLevelComments.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Unknown error";
    })
    .addCase(fetchCommentReplies.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.comments.forEach((comment: CommentThread) => {
          if(comment.id === action.payload.items[0].snippet.parentId) {
            comment.replies = action.payload.items;
          }
        });
      }
    )
    .addCase(fetchCommentReplies.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Unknown error";
    })
  }
});

export const { resetComments } = commentSlice.actions;
export const commentListReducer = commentSlice.reducer;
export type { CommentThread, Replies };