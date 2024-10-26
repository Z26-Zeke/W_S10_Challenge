
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const pizzaApi = createApi({
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:9009/api/pizza/'}),
    tagTypes: ['pizza'],
    endpoints: build => ({
        getPizzaOrder: build.query({
            query: () => 'history',
            providesTags: ['pizza']
        }),
        MakeOrder: build.mutation({
            query: (pizza) =>( {
                url: 'order',
                method: 'POST',
                body: pizza
            }),
            invalidatesTags: ['pizza']
        })
    })
})
export const {useGetPizzaOrderQuery, useMakeOrderMutation} = pizzaApi
