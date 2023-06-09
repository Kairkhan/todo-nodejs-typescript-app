import server from './server'
import { Pool } from 'pg'
import {PostgresTaskDataSource} from "./data/data-sources/postgres/postgres-task-data-source";
import TaskRouter from "./presentation/task-router";
import {GetAllTasks} from "./domain/use-cases/task/get-all-tasks";
import {TaskRepositoryImpl} from "./domain/repositories/task-repository";
import {CreateTask} from "./domain/use-cases/task/create-task";
import {GetOneTask} from "./domain/use-cases/task/get-one-task";
import {UpdateTask} from "./domain/use-cases/task/update-task";
import {UpdateStatusTask} from "./domain/use-cases/task/update-status-task";
import {DeleteTask} from "./domain/use-cases/task/delete-task";

async function getPGDS() {

    const db = new Pool({
        user: 'root',
        host: 'localhost',
        database: 'todoapp',
        password: 'docker',
        port: 5432,
    })
    return new PostgresTaskDataSource(db)
}


(async () => {
    const dataSource = await getPGDS();

    const taskMiddleware = TaskRouter(
        new GetAllTasks(new TaskRepositoryImpl(dataSource)),
        new GetOneTask(new TaskRepositoryImpl(dataSource)),
        new CreateTask(new TaskRepositoryImpl(dataSource)),
        new UpdateTask(new TaskRepositoryImpl(dataSource), new TaskRepositoryImpl(dataSource)),
        new UpdateStatusTask(new TaskRepositoryImpl(dataSource), new TaskRepositoryImpl(dataSource)),
        new DeleteTask(new TaskRepositoryImpl(dataSource), new TaskRepositoryImpl(dataSource))
    );

    server.use("/tasks", taskMiddleware)
    server.listen(4000, () => console.log("Running on http://localhost:4000"))

})()