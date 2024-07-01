import axios from "axios";

export const fetchWorkers = async (query) => {
  try {
    const response = await axios.get(
      `https://randomuser.me/api/?results=10&seed=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.log("Error fetching workers:", error);
    throw error;
  }
};
