import { baseApi } from "@/redux/baseApi";
import type { ICreateParcel, IUpdateParcel } from "@/types/parcel.type";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParcel: builder.mutation<null, ICreateParcel>({
      query: (parcelInfo) => ({
        url: "/parcel",
        method: "POST",
        data: parcelInfo,
      }),
    }),
    updateParcel: builder.mutation<
      null,
      { id: string; parcelInfo: IUpdateParcel }
    >({
      query: ({ id, parcelInfo }) => ({
        url: `{/parcel/${id}}`,
        method: "PATCH",
        data: parcelInfo,
      }),
    }),
    getHistory: builder.query({
      query: ({ searchTerm, page, limit }) => {
        let url = `/parcel/history`;

        const params = new URLSearchParams();
        if (searchTerm && searchTerm.trim() !== "")
          params.append("searchTerm", searchTerm);
        if (page != null) params.append("page", page.toString());
        if (limit != null) params.append("limit", limit.toString());
        if ([...params].length > 0) {
          url += `?${params.toString()}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useUpdateParcelMutation,
  useGetHistoryQuery,
  useLazyGetHistoryQuery,
} = parcelApi;
