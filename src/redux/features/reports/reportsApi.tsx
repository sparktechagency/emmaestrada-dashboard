import { baseApi } from "../../base/baseAPI";

const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: () => `/reports${location?.search}`,
      transformResponse: (res: { data: any }) => res?.data,
    }),
    updateReport: builder.mutation({
      query: ({id, ...data})=>{
        return {
          url: `/reports/update-status/${id}`,
          method: "PATCH",
          body: data,
        }
      }
    })
  }),
});

export const {
  useGetReportsQuery,
  useUpdateReportMutation,
} = reportsApi;
