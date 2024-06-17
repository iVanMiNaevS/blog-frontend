import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk(
	"auth/fetchUserData",
	async (params) => {
		const { data } = await axios.post("/auth/login", params);
		return data;
	}
);

const initialState = {
	data: null,
	status: "loading",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
		},
	},
	extraReducers: {
		[fetchUserData.pending]: (state, action) => {
			state.status = "loading";
			state.data = null;
		},
		[fetchUserData.fulfilled]: (state, action) => {
			state.status = "loaded";
			state.data = action.payload;
		},
		[fetchUserData.rejected]: (state) => {
			state.posts.status = "error";
			state.data = null;
		},
	},
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authreducer = authSlice.reducer;
export const { logout } = authSlice.actions;