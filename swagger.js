
import swaggerJsdoc from 'swagger-jsdoc';
import {PORT} from "./config/env.config.js";

const swaggerOptions = {
    swaggerDefinition: {
        myapi: '3.0.0',
        info: {
            title: 'Express | Node',
            version: '1.0.0',
            description: 'API documentation',
        },
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(swaggerOptions)

export default openapiSpecification;