const express = require('express')
const {ApolloServer} = require('apollo-server-express');
const http = require('http')
const path = require('path')
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge")
const { loadFilesSync } = require("@graphql-tools/load-files")
const mongoose = require('mongoose');



require('dotenv').config()

const app = express();

// execute database connection

async function connectToDb(url) {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB Connected')
  }

connectToDb(process.env.MONGO_URL);

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs")));
// resolvers

const resolvers = mergeResolvers(
    loadFilesSync(path.join(__dirname, "./resolvers"))
  );



//grapql server

let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

//server
const httpserver =http.createServer(app)

app.get('/rest', function(req,res){
    res.json({
        data:'you hit rest endpoint'
    })
})

// port

app.listen(process.env.PORT, function(){
    console.log(`server is ready at http://localhost:${process.env.PORT}`)
    console.log(`graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`)
})