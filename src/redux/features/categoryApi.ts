import { baseApi } from "../base/baseAPI";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET all categories (with query params if any in URL)
    getCategories: build.query({
      query: () => `/category${location?.search || ""}`,
      providesTags: ["category"],
    //   transformResponse: (res: { data: any }) => res.data,
    }),

    // GET single category by id
    getCategoryById: build.query({
      query: (id) => `/category/${id}`,
      providesTags: ["category"],
      transformResponse: (res: { data: any }) => res.data,
    }),

    // CREATE category
    addCategory: build.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    // UPDATE category
    updateCategory: build.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: "PATCH",
        body: data.formData,
      }),
      invalidatesTags: ["category"],
    }),

    // DELETE category
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
