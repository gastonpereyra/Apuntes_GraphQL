// Aqui van los Schemas
import { buildSchema } from 'graphql';
import { importSchema } from 'graphql-import';

const types = `
""" Meses del Año """
type Mes {
    id: ID
    nombre: String
    dias: Int
    """ Nombres de las personas que cumplen Años """
    cumple: [String]
}
type Query {
    """ Busca los meses """
    mes(id: ID, nombre: String, dias: Int): [Mes]
}
type Mutation {
    """ Agrega los nombres de las personas que cumplen años en el mes """
    cumple(id: ID!, nombre: String!): Mes
}
`;

// Definir un Schema con JS
export const schemasConJS = buildSchema(types);

// Definir Schema con GraphQL-import
const types2 = importSchema('./graphql/schemas.graphql');
export const schemasConGQL = buildSchema(types2);
