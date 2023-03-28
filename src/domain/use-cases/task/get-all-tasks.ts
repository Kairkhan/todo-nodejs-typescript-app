import {GetAllTasksUseCase} from "../../contracts/use-cases/get-all-tasks-use-case";
import {Task} from "../../entities/task";
import {GetTasksRepository} from "../../contracts/repositories/get-tasks-repository";

export class GetAllTasks implements GetAllTasksUseCase {
    constructor(private readonly repository: GetTasksRepository) {}

    async execute(): Promise<Task[]> {
        return await this.repository.getTasks();
    }
}