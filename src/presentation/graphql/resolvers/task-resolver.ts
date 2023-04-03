import getPDGS from "../../../pgs-connection";
import {GetAllTasks} from "../../../domain/use-cases/task/get-all-tasks";
import {TaskRepositoryImpl} from "../../../domain/repositories/task-repository";
import {GetOneTask} from "../../../domain/use-cases/task/get-one-task";
import {CreateTask} from "../../../domain/use-cases/task/create-task";
import {UpdateTask} from "../../../domain/use-cases/task/update-task";
import {UpdateStatusTask} from "../../../domain/use-cases/task/update-status-task";
import {DeleteTask} from "../../../domain/use-cases/task/delete-task";

const dataSource = getPDGS();

const Resolvers = {
    Query: {
        getAllTasks: () => new GetAllTasks(new TaskRepositoryImpl(dataSource)).execute(),
        getTask: (_: any, args: any) => {
            return new GetOneTask(new TaskRepositoryImpl(dataSource)).execute(args.id);
        },
    },
    Mutation: {
        addTask: (_: any, args: any) => {
            return new CreateTask(new TaskRepositoryImpl(dataSource)).execute(args);
        },
        updateTask: (_: any, args: any) => {
            return new UpdateTask(new TaskRepositoryImpl(dataSource), new TaskRepositoryImpl(dataSource)).execute(args.id,args);
        },
        setBacklogStatus: (_: any, args: any) => {
            return new UpdateStatusTask(new TaskRepositoryImpl(dataSource), new TaskRepositoryImpl(dataSource)).execute(args.id, 'backlog');
        },
        setInProgressStatus: (_: any, args: any) => {
            return new UpdateStatusTask(new TaskRepositoryImpl(dataSource), new TaskRepositoryImpl(dataSource)).execute(args.id, 'in-progress');
        },
        deleteTask: (_: any, args: any) => {
            return new DeleteTask(new TaskRepositoryImpl(dataSource), new TaskRepositoryImpl(dataSource)).execute(args.id)
        },
    },
};
export default Resolvers;