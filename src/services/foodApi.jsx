import apiClient from "./apiClient";

// GET ALL FOOD ITEMS
export const getFoodItems = async () => {
  const response = await apiClient.get(
    "/recipes"
  );

  return response.data.recipes;
};

// GET FOOD BY ID
export const getFoodItemById = async (id) => {
  const response = await apiClient.get(
    `/recipes/${id}`
  );

  return response.data;
};

// ADD FOOD - POST
export const addFoodItem = async (food) => {
  const response = await apiClient.post(
    "/recipes/add",
    food
  );

  return response.data;
};

// UPDATE FOOD - PUT
export const updateFoodItem = async (
  id,
  food
) => {
  const response = await apiClient.put(
    `/recipes/${id}`,
    food
  );

  return response.data;
};

// DELETE FOOD - DELETE
export const deleteFoodItem = async (id) => {
  const response = await apiClient.delete(
    `/recipes/${id}`
  );

  return response.data;
};