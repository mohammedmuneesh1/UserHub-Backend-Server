const swaggerAutogen = require("swagger-autogen")()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./router/userRoutes.js']

swaggerAutogen(outputFile, endpointsFiles)