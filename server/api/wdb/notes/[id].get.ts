export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const config = useRuntimeConfig(event);

  const backendUrl = config.wdbBaseUrl || "http://localhost:8080";
  const apiKey = config.wdbApiKey;

  try {
    const response = await $fetch(`${backendUrl}/notes/${id}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey as string,
      },
    });
    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: "Note not found in WDB",
    });
  }
});
