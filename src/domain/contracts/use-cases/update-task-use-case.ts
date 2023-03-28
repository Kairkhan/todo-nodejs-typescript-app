import {Task} from "../../entities/task";

export interface UpdateTaskUseCase {
    execute(id: string, task: Task): Promise<boolean>;
}