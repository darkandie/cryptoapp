import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  'X-RapidAPI-Key': 'fd62c2c9a3mshd36347f2a14587bp109dd9jsn4c95b4c32c13'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getExchanges: builder.query({
      query: () => createRequest(`/coin/Qwsogvtv82FCd/exchanges`)
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?${timeperiod}`)
    })
  })
})

export const {
  useGetCryptosQuery,
  useGetExchangesQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery
} = cryptoApi;