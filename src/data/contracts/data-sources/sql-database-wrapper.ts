export interface SqlDatabaseWrapper {
    query(query: String, config?: any[]): Promise<{ rows: any[] }>;
}