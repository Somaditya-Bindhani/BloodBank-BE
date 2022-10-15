const config = {
  origin: "*",
  allowedHeaders: [
    "Authorization",
    "X-Requested-With",
    "Content-Type",
    "x-auth-token",
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
};
module.exports = { config };
