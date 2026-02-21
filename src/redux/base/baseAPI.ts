// import { createApi } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
 
    
    // baseUrl: "http://10.10.7.48:5001/api/v1",        
    baseUrl: "https://api.wesound.app/api/v1",    
    prepareHeaders: (headers) => {      
      const token = Cookies.get("accessToken");
      console.log(token)
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: ["user", "notifications", "admin", "category", "slider", "faqs", "withdrawal", "planner"],
});

export const imageUrl = "https://api.wesound.app";
// export const imageUrl = "http://10.10.7.48:5001";

