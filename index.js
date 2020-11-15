const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

// db
mongoose.connect('mongodb://db:27017',(err)=>{
    if (err) throw err;
    console.log("connected to mongo");
})

const db = mongoose.connection
const PokemonSchema = new mongoose.Schema({
  num: Number,
  name: String,
  variations: [{
    name: String,
    descriptions: String,
    types: [String],
    specie: String,
    height: Number,
    weight: Number,
    abilities: [String],
    stats: {
      total: Number,
      hp: Number,
      attack: Number,
      defense: Number,
      speedAttack: Number,
      speedDefense: Number,
      speed: Number
    },
    evolutions: [String],
    link: String
  }]
})

const PokemonModel = db.model('Pokemon', PokemonSchema)

// TODO FIGURE OUT HOW TO SEED A BUNCH OF POKEMON DATA TO THE MONGODB DATABASE

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Pokemon {
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    pokemons(name: String!): [Pokemon]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    pokemons: (_1, {name}) => {
      return [{
        name: 'need to work on pulling a list of pokemons'
      }]
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, context: {
  db
} });

// The `listen` method launches a web server.
server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

