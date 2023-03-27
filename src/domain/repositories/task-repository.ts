import {TaskRepository} from "../contracts/repositories/task-repository";
import {Task} from "../entities/task";
import {TaskDataSource} from "../../data/contracts/data-sources/task-data-source";

export class TaskRepositoryImpl implements TaskRepository {

    constructor(private readonly taskDataSource: TaskDataSource) {}

    async createTask(task: Task): Promise<boolean> {
        return await this.taskDataSource.create(task);
    }

    async getTasks(): Promise<Task[]> {
        return await this.taskDataSource.getAll();
    }

}