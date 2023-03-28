export interface UpdateStatusTaskUseCase {
    execute(id: string, status: string): Promise<boolean>;
}