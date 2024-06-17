import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authreducer } from "./slices/auth";

const store = configureStore({
	reducer: {
		posts: postsReducer,
		auth: authreducer,
	},
});

export default store;
