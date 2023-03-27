import {CreateTaskUseCase} from "../../contracts/use-cases/create-task";
import {TaskRepository} from "../../contracts/repositories/task-repository";
import {Task} from "../../entities/task";

export class CreateTask implements CreateTaskUseCase {
    constructor(private readonly repository: TaskRepository) {}

    async execute(task: Task): Promise<boolean> {
        return await this.repository.createTask(task);
    }
}