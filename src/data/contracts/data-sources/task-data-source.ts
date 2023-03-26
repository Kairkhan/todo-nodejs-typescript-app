import {Task} from "../../../domain/entities/task";

export interface TaskDataSource {
    create(task: Task): Promise<boolean>;
    getAll(): Promise<Task[]>;
}