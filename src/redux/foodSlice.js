import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";

import {
  getFoodItems
} from "../services/foodApi";

export const fetchFoodItems =
  createAsyncThunk(
    "food/fetchFoodItems",
    async () => {
      const data =
        await getFoodItems();

      return data;
    }
  );

const initialState = {
  items: [],
  loading: false,
  error: ""
};

const foodSlice = createSlice({
  name: "food",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchFoodItems.pending,
        (state) => {
          state.loading = true;
          state.error = "";
        }
      )

      .addCase(
        fetchFoodItems.fulfilled,
        (state, action) => {
          state.loading = false;
          state.items = action.payload;
        }
      )

      .addCase(
        fetchFoodItems.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ||
            "Unable to load food items.";
        }
      );
  }
});

export default foodSlice.reducer;