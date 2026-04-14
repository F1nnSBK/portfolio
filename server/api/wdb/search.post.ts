export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const config = useRuntimeConfig(event);

  const backendUrl = config.wdbBaseUrl || "http://localhost:8080";
  const apiKey = config.wdbApiKey;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "WDB_API_KEY is missing in server environment.",
    });
  }

  try {
    const response = await $fetch(`${backendUrl}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: body,
    });

    return response;
  } catch (error: any) {
    console.error("[WDB Search Error]:", error.data || error.message);
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: "Failed to fetch from WDB backend",
      data: error.data,
    });
  }
});
