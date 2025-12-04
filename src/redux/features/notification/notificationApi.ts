import { baseApi } from "../../base/baseAPI";

const notificationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query({
            query: () => `/notifications${location?.search}`,
            providesTags: ['notifications'],
            transformResponse: (response: { data: any }) => response.data,
        }),

        readNotification: build.mutation({
            query: () => ({
                url: `/notifications/read`,
                method: "PATCH",
            }),
            invalidatesTags: ['notifications']
        })

    })
})

export const { useGetNotificationsQuery, useReadNotificationMutation } = notificationApi;