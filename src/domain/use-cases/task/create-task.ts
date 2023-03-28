import {CreateTaskUseCase} from "../../contracts/use-cases/create-task-use-case";
import {Task} from "../../entities/task";
import {CreateTaskRepository} from "../../contracts/repositories/create-task-repository";

export class CreateTask implements CreateTaskUseCase {
    constructor(private readonly repository: CreateTaskRepository) {}

    async execute(task: Task): Promise<boolean> {
        return await this.repository.create(task);
    }
}