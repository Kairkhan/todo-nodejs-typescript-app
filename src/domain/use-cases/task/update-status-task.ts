import {UpdateStatusTaskUseCase} from "../../contracts/use-cases/update-status-task-use-case";
import {GetTaskByIdRepository} from "../../contracts/repositories/get-task-by-id-repository";
import {UpdateTaskRepository} from "../../contracts/repositories/update-task-repository";

const availableStatuses = ['backlog', 'in-progress'];
export class UpdateStatusTask implements UpdateStatusTaskUseCase {
    constructor(
        private readonly getOneRepository: GetTaskByIdRepository,
        private readonly updateRepository: UpdateTaskRepository,
    ) { }

    async execute(id: string, status: string): Promise<boolean> {

        if (!availableStatuses.includes(status)) {
            return Promise.resolve(false);
        }

        const task = await this.getOneRepository.getTaskById(id);
        task.status = status;
        console.log(task);

        return this.updateRepository.update(task);
    }

}