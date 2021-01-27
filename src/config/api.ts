export default {
  API_BASE_ENDPOINT: process.env.VUE_APP_URL || "https://localhost:8100",
  API_GRAPHQL:
    process.env.VUE_APP_GRAPHQL_HTTP ||
    "https://dashboard-api.artisandigital.xyz/",
};
