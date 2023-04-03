import {gql} from "apollo-server-core";

const Schema = gql`
  type Task {
    id: String
    title: String!
    description: String!
    status: String!
  }
  type Query {
    getAllTasks: [Task]
    getTask(id: Int): Task
  }
  type Mutation {
    addTask(title: String, description: String): Boolean
    updateTask(title: String, description: String): Boolean
    setBacklogStatus(id: String): Boolean
    setInProgressStatus(id: String): Boolean
    deleteTask(id: String): Boolean
  }
`;
export default Schema;