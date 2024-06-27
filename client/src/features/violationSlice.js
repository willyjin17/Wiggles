import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../utils/api";

const initialState = {
  warn: false,
  warnings: 0,
  ban: false,
  violationMessage: "",
  status: "idle",
  error: null,
};

export const fetchViolations = createAsyncThunk(
  "violations/fetchViolations",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axios.post("/api/getWarnings", { userID });
      const response = await getData("warnings");
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const violationSlice = createSlice({
  name: "violations",
  initialState,
  reducers: {
    resetViolations: (state) => {
      state.warn = false;
      state.warnings = 0;
      state.ban = false;
      state.violationMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchViolations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchViolations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.warn = action.payload.warn;
        state.warnings = action.payload.warnings;
        state.ban = action.payload.ban;
        state.violationMessage = action.payload.violationMessage;
        console.log("Fetch violations succeeded. Payload:", action.payload);
      })
      .addCase(fetchViolations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Fetch violations failed. Error:", action.payload);
      });
  },
});

export default violationSlice.reducer;
