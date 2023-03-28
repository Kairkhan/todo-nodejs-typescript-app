import {GetTaskByIdUseCase} from "../../contracts/use-cases/get-one-task";
import {Task} from "../../entities/task";
import {GetTaskByIdRepository} from "../../contracts/repositories/get-task-by-id-repository";

export class GetOneTask implements GetTaskByIdUseCase {
    constructor(private readonly repository: GetTaskByIdRepository) {}
    async execute(id: string): Promise<Task> {
        return await this.repository.getTaskById(id);
    }
}