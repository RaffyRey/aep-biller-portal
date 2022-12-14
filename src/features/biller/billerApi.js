import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const billerApi = createApi({
	reducerPath: 'billerApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_BILLER_PROD}`,
		credentials: 'include',
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;

			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		// biller group admin
		admin: builder.query({
			query: () => `/biller_group_admin`,
		}),
		biller: builder.query({
			query: (params) => `/biller_group_admin/${params}`,
		}),
		profile: builder.query({
			query: (billerId) => `/biller_group_admin/biller/${billerId}`,
		}),
		settlementParam: builder.query({
			query: (page) => `/biller_group_admin/settlement?page=${page}`,
		}),
		summary: builder.query({
			query: () => '/biller_group_admin/summary',
		}),
		summaryBillerParam: builder.query({
			query: (biller) => `/biller_group_admin/summary?biller=${biller}`,
		}),
		summaryParam: builder.query({
			query: (page) => `/biller_group_admin/summary?page=${page}`,
		}),
		// biller transaction
		transactionParamsDay: builder.query({
			query: (page = 1) =>
				`/biller_group_admin/transaction/v2?page=${page}&group_by=day`,
		}),
		transactionParams: builder.query({
			query: (page = 1) => `/biller_group_admin/transaction/v2?page=${page}`,
		}),
		// total transaction
		totalParams: builder.query({
			query: (group) => `/biller_group_admin/total_transactions?group_by=${group}`,
		}),
		// chart transaction
		chartParams: builder.query({
			query: (group) => `/biller_group_admin/aggregate?group_by=${group}`,
		}),
		chartLoopParams: builder.query({
			// query: ({ from, to }) =>
			query: (loopDateData) =>
				// `/biller_group_admin/aggregate?from=${from}&to=${to}`,
				`/biller_group_admin/aggregate?${loopDateData}`,
		}),
		listingParams: builder.query({
			query: () => `/biller_group_admin/listings`,
		}),
	}),
});

export const {
	useBillerQuery,
	useSummaryQuery,
	useProfileQuery,
	useSummaryParamQuery,
	useSettlementParamQuery,
	useTransactionParamsDayQuery,
	useTransactionParamsQuery,
	useTotalParamsQuery,
	useChartParamsQuery,
	useChartLoopParamsQuery,
	useAdminQuery,
	useListingParamsQuery,
	useSummaryBillerParamQuery,
} = billerApi;
