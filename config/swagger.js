import swaggerJSDoc from "swagger-jsdoc";
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List Management Social Media",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  apis: ["./routes/*js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
