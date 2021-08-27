const {gql} = require('apollo-server-express');

const me= ()=> 'Akua';

module.exports ={
    Query: {
        me
    }
};