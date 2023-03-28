import {Task} from "../../entities/task";

export interface DeleteTaskRepository {
    delete(task: Task): Promise<boolean>;
}