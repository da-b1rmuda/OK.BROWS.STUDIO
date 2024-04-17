import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const templatesAPI = createApi({
  reducerPath: "templatesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    keepalive: false,
  }),
  endpoints: (builder) => ({
    fetchAllTemplates: builder.query({
      query: () => ({
        url: `/templates`,
      }),
    }),
    fetchTemplateById: builder.query({
      query: (id) => ({
        url: `/templates/${id}`,
      }),
    }),
    fetchAllTags: builder.query({
      query: () => ({
        url: `/tags`,
      }),
    }),
    fetchTagsById: builder.query({
      query: (id) => ({
        url: `/templates/${id}/tags`,
      }),
    }),
    fetchSourceById: builder.query({
      query: (id, dir = "%2F") => ({
        url: `/sources/${id}/explore/${encodeURI(dir)}`,
      }),
    }),
    fetchSourceFileByPath: builder.query({
      query: (data) => {
        // Проверяем, не является ли результат null перед деструктурированием
        if (data.sourceId === "" || data.path === "") return { url: "" };

        //Проверяем являеться выбранный путь до папки
        const fileExtensionPattern = /\.[0-9a-z]+$/i;
        if (!fileExtensionPattern.test(data?.path)) return { url: "" };

        return {
          url: `/sources/${data?.sourceId}/file/${encodeURI(
            data?.path.replace(/\//g, "%2F")
          )}`,
        };
      },
    }),
    postSource: builder.mutation({
      query: (source) => {
        // var bodyFormData = new FormData();
        // bodyFormData.append("file", source);
        return {
          url: `/sources/upload`,
          method: "POST",
          body: source,
          formData: true,
        };
      },
    }),
    postTemplate: builder.mutation({
      query: (templateData) => {
        return {
          url: `/templates`,
          method: "POST",
          body: templateData,
        };
      },
    }),
    postTagsForTemplates: builder.mutation({
      query: (tagsData) => {
        return {
          url: `/templates/${tagsData.id}/tags`,
          method: "POST",
          body: { tagIdList: tagsData.tagArr },
        };
      },
    }),
  }),
});

export const {
  useFetchAllTemplatesQuery,
  useFetchTemplateByIdQuery,
  useFetchAllTagsQuery,
  useFetchTagsByIdQuery,
  useFetchSourceByIdQuery,
  useFetchSourceFileByPathQuery,
  usePostSourceMutation,
  usePostTemplateMutation,
  usePostTagsForTemplatesMutation,
} = templatesAPI;
