import {Task} from "../../entities/task";

export interface UpdateTaskRepository {
    update(task: Task): Promise<boolean>;
}