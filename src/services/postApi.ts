import axios from "axios";

export const getDivisions = async () => {
    const url = "http://localhost:3000/divisions-districts.json";
    const res = await fetch(url);
    const data = await res.json();
    // console.log("API Response:", data); // Inspect the structure of the data
    return data; // Ensure this matches the expected format
  };

  export const handleDonorSearch = async (
    bloodGroup: string,
    division: string,
    district: string
  ): Promise<any> => {
    const url = "http://localhost:4000/api/donors/";
  
    const params = {
      bloodGroup,
      division,
      district,
    };
  
    try {
      const response = await axios.get(url, { params }); // Include `params` in the request
      return response.data;
    } catch (error) {
      console.error("Error fetching donors:", error);
      throw error;
    }
  };



  

  
  