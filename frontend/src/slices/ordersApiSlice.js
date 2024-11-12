import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: `${ORDERS_URL}`,
                method: "POST",
                body: order,
            }),
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateOrder: builder.mutation({
            query: (data) => ({
                url: `${ORDERS_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/mine`,
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: "PUT",
            }),
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: "PUT",
                body: { ...details },
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    useGetOrdersQuery,
    useUpdateOrderMutation,
    useGetMyOrdersQuery,
    useDeliverOrderMutation,
    usePayOrderMutation,
} = ordersApiSlice;
