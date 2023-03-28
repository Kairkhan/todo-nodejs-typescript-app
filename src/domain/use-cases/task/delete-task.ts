import {DeleteTaskUseCase} from "../../contracts/use-cases/delete-task-use-case";
import {GetTaskByIdRepository} from "../../contracts/repositories/get-task-by-id-repository";
import {DeleteTaskRepository} from "../../contracts/repositories/delete-task-repository";

export class DeleteTask implements DeleteTaskUseCase {
    constructor(
        private readonly getOneRepository: GetTaskByIdRepository,
        private readonly deleteRepository: DeleteTaskRepository,
    ) { }
    async execute(id: string): Promise<boolean> {
        const task = await this.getOneRepository.getTaskById(id);

        return await this.deleteRepository.delete(task);
    }

}