import express from 'express'; // Modulo para Express
import graphqlHTTP from 'express-graphql'; // Modulo para GraphQL
import { schemasConJS, schemasConGQL } from './graphql/schemas';
import { resolvers } from './graphql/resolvers';
// Configuramos Express
const app = express();

app.use(express.static('public'));

// Rutas
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.use('/playground',graphqlHTTP({
    schema: schemasConGQL,             // Schema a usar
    rootValue: resolvers,    // conectar con el resolver
    graphiql: true      // que se pueda usar la UI de GraphiQL
}))

// Server Escuchando Request
app.listen(process.env.PORT, () => {
    console.log('Servidor en marcha en ' + process.env.PORT);
})
