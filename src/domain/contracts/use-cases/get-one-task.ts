import {Task} from "../../entities/task";

export interface GetTaskByIdUseCase {
    execute(id: string): Promise<Task>;
}