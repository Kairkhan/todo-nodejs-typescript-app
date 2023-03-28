export interface DeleteTaskUseCase {
    execute(id: string): Promise<boolean>;
}