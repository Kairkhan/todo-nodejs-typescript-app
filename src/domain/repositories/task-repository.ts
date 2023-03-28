import {GetTaskByIdRepository} from "../contracts/repositories/get-task-by-id-repository";
import {Task} from "../entities/task";
import {TaskDataSource} from "../../data/contracts/data-sources/task-data-source";
import {CreateTaskRepository} from "../contracts/repositories/create-task-repository";
import {GetTasksRepository} from "../contracts/repositories/get-tasks-repository";

export class TaskRepositoryImpl implements
    GetTaskByIdRepository,
    CreateTaskRepository,
    GetTasksRepository {

    constructor(private readonly taskDataSource: TaskDataSource) {}

    async create(task: Task): Promise<boolean> {
        return await this.taskDataSource.create(task);
    }

    async getTasks(): Promise<Task[]> {
        return await this.taskDataSource.getAll();
    }

    async getTaskById(id: string): Promise<Task> {
        return await this.taskDataSource.getOneById(id);
    }

}