import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: ({ searchTerm, page, limit }) => {
        let url = `user/all-users`;
        const params = new URLSearchParams();
        if (searchTerm && searchTerm.trim() !== "") {
          params.append("searchTerm", searchTerm);
        }
        if (page != null) params.append("page", page.toString());
        if (limit != null) params.append("limit", limit.toString());
        if ([...params].length > 0) {
          url += `?${params.toString()}`;
        }
        return { url, method: "GET" };
      },
      providesTags: ["USER"],
    }),
  }),
});

export const { useLazyAllUsersQuery } = userApi;
