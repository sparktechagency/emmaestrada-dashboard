import { baseApi } from "../../base/baseAPI";

const campaignsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCampaigns: builder.query({
            query: () => ({
                url: `/campaigns${location?.search}`,
            }),            
        }),
        getCampaignById: builder.query({
            query: (id) => `/campaigns/${id}`,
            transformResponse: (res: { data: any }) => res?.data,
        }),
        createCampaign: builder.mutation({
            query: (body) => ({
                url: '/campaigns',
                method: 'POST',
                body,
            }),
        }),
        updateCampaign: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/campaigns/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteCampaign: builder.mutation({
            query: (id) => ({
                url: `/campaigns/${id}`,
                method: 'DELETE',
            }),
        }),
        getCampaignAnalytics: builder.query({
            query: (id) => `/campaigns/${id}/analytics`,
            transformResponse: (res: { data: any }) => res?.data,
        }),
        getCampaignGrowth: builder.query({
            query: () => `/analytics/admin-campaign-growth-chart${location?.search}`,
            transformResponse: (res: { data: any }) => res?.data,
        }),
    }),
});

export const {
    useGetCampaignsQuery,
    useGetCampaignByIdQuery,
    useCreateCampaignMutation,
    useUpdateCampaignMutation,
    useDeleteCampaignMutation,
    useGetCampaignAnalyticsQuery,
    useGetCampaignGrowthQuery,
} = campaignsApi;