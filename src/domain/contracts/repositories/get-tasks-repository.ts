import {Task} from "../../entities/task";

export interface GetTasksRepository {
    getTasks(): Promise<Task[]>;
}