import { baseApi } from "../../base/baseAPI";

const notificationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query({
            query: () => `/notifications${location?.search}`,
            providesTags: ['notifications'],            
        }),

        notificationCount: build.query({
            query: () => `/notifications${location?.search}`,
            providesTags: ['notifications'],
            transformResponse: (response: { data: any }) => response?.data?.unreadCount,
        }),

        readAllNotification: build.mutation<void, void>({
            query: () => ({
                url: `/notifications`,
                method: "PATCH",
            }),
            invalidatesTags: ['notifications']
        })
    })
})

export const { useGetNotificationsQuery, useNotificationCountQuery, useReadAllNotificationMutation } = notificationApi;