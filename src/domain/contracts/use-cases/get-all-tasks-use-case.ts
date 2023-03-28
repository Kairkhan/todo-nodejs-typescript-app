import {Task} from "../../entities/task";

export interface GetAllTasksUseCase {
    execute(): Promise<Task[]>;
}