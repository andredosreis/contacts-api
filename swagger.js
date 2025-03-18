const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Contatos',
      version: '1.0.0',
      description: 'API para gerenciar contatos',
    },
    servers: [ // Corrected: 'server' should be 'servers' (plural) and inside 'definition'
      {
        url: 'http://localhost:3000', // You can change this later if needed
        description: 'Local Development Server'
      },
      {
        url: 'https://contacts-api-bih9.onrender.com', // Replace with your production URL in Render
        description: 'Render Production Server'
      }
    ],
  },
  apis: ['./routes/*.js'], // Corrected: 'apis' should be outside 'definition' and only once
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
