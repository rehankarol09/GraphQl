const { projects, clients } = require('../sampledata')


const Client = require("../models/Client");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
const Project = require('../models/Project');

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString }
    })
})

const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: GraphQLID },
        description: { type: GraphQLString },
        name: { type: GraphQLString },
        status: { type: GraphQLString },
        client:{type:ClientType,
        resolve(parent,args){
           // return clients.find((client)=>client.id === parent.id)
           return Client.findById(parent.id)
        }
        }
    })

})
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {

        projects:{
          type:new GraphQLList(ProjectType),
          resolve(parent,args){
            return Project.find()
          }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return projects.find((project) => args.id === project.id)

                return Project.findById(args.id)
            }
        },

        

        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find()
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
               // return clients.find(client => client.id === args.id)

               return Client.findById(args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema(
    {
        query: RootQuery
    }
)