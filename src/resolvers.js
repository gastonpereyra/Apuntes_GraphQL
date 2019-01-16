import { meses } from '../data/data.js'; // importamos los datos

// Creamos los resolver
export const resolvers = {
  // Query
  mes: ({id= 0, nombre= "", dias= 0}) => {

        const m = meses.filter(mes => 
            (   (mes.dias === (dias !== 0 ? dias : mes.dias)) &&
                (mes.id === (id !== 0 ? parseInt(id) : mes.id)) &&
                (mes.nombre === (nombre ? nombre : mes.nombre))
            ) 
        );
        
        return (m.map( mes => ({
            "id": mes.id,
            "nombre": mes.nombre,
            "dias": mes.dias,
            "cumple": mes.cumple
            })
            )
        )
    },
  // Mutation
  cumple: ({id, nombre}) => {
        const mes = meses.find( m => m.id === parseInt(id) );
    
        if (mes) {
          
          mes.cumple.push(nombre);

          return ({
            "id": mes.id,
            "nombre": mes.nombre,
            "dias": mes.dias,
            "cumple": mes.cumple
          });
        }
        return (null);
  }
};
