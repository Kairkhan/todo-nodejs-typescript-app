import {GetAllTasksUseCase} from "../../contracts/use-cases/get-all-tasks";
import {TaskRepository} from "../../contracts/repositories/task.repository";
import {Task} from "../../entities/task";

export class GetAllTasks implements GetAllTasksUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(): Promise<Task[]> {
        return await this.taskRepository.getTasks();
    }
}