import {UpdateTaskUseCase} from "../../contracts/use-cases/update-task-use-case";
import {Task} from "../../entities/task";
import {UpdateTaskRepository} from "../../contracts/repositories/update-task-repository";
import {GetTaskByIdRepository} from "../../contracts/repositories/get-task-by-id-repository";

export class UpdateTask implements UpdateTaskUseCase {
    constructor(
        private readonly getOneRepository: GetTaskByIdRepository,
        private readonly updateRepository: UpdateTaskRepository,
    ) { }
    async execute(id: string, task: Task): Promise<boolean> {
        const model = await this.getOneRepository.getTaskById(id);

        model.title = task.title;
        model.description = task.description;

        return await this.updateRepository.update(model);
    }

}