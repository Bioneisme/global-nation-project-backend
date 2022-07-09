import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import API from "../../api"

export const loginUser = createAsyncThunk(
    'auth/login',
    async (body, thunkAPI) => {
        try {
            const response = await API.post('/login', body)
            let data = await response.data
            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue({message: "Incorrect email or password"});
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (body, thunkAPI) => {
        try {
            const response = await API.post('/register', body)
            let data = await response.data
            if (response.status === 200) {
                console.log(data)
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log(e.response.data)
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);
// TODO: DELETE
export const thirdAuth = createAsyncThunk(
    'auth/third',
    async (_, thunkAPI) => {
        try {
            return true
        } catch (e) {
            return thunkAPI.rejectWithValue({message: "Internal server error!"});
        }
    }
);

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, thunkAPI) => {
        try {
            const response = await API.get('/getUser')
            let data = await response.data
            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    try {
        await API.get('/logout')
        window.location.href = '/login'
    }
    catch (e) {
        console.log('Error', e.response.data)
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isSuccess: false,
        isError: false,
        isThirdPartyAuth: false,
        isAuth: false,
        errorMessage: "",
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.errorMessage = "";

            return state;
        },
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, {payload}) => {
            state.currentUser = payload;
            state.isSuccess = true;
            state.isError = false;
            state.isAuth = true;
            return state;
        },
        [loginUser.rejected]: (state, {payload}) => {
            state.currentUser = null;
            state.isError = true;
            state.isSuccess = false;
            state.errorMessage = payload.message;
        },
        [registerUser.fulfilled]: (state, {payload}) => {
            state.currentUser = payload;
            state.isSuccess = true;
            state.isError = false;
            state.isAuth = true;
            return state;
        },
        [registerUser.rejected]: (state, {payload}) => {
            state.currentUser = null;
            state.isError = true;
            state.isSuccess = false;
            state.errorMessage = payload.message;
        },
        [thirdAuth.fulfilled]: (state) => {
            state.isThirdPartyAuth = true;
            return state;
        },
        [thirdAuth.rejected]: (state, {payload}) => {
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getUser.fulfilled]: (state, {payload}) => {
            state.currentUser = payload;
            state.isAuth = true;
            return state;
        },
        [getUser.rejected]: (state, {payload}) => {
            state.currentUser = null;
            state.isAuth = false;
            state.errorMessage = payload.message;
        },
        [logoutUser.fulfilled]: (state) => {
            state.currentUser = null;
            state.isAuth = false;
        },
    },
})

export const {clearState} = userSlice.actions;

export const userSelector = state => state.user