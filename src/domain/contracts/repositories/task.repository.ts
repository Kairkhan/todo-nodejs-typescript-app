import {Task} from "../../entities/task";

export interface TaskRepository {
    createTask(task: Task): Promise<boolean>;
    getTasks(): Promise<Task[]>;
}