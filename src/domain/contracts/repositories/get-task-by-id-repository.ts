import {Task} from "../../entities/task";

export interface GetTaskByIdRepository {
    getTaskById(id: string): Promise<Task>;
}