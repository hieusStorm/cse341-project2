const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Monsters Api',
        description: 'Monster Weaknesses Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);