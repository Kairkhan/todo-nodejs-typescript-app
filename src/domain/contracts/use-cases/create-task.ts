import {Task} from "../../entities/task";

export interface CreateTaskUseCase {
    execute(task: Task): Promise<boolean>;
}