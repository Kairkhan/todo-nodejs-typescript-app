import {TaskDataSource} from "../../contracts/data-sources/task-data-source";
import {SqlDatabaseWrapper} from "../../contracts/data-sources/sql-database-wrapper";
import {Task} from "../../../domain/entities/task";

const DB_TABLE = "tasks";
export class PostgresTaskDataSource implements TaskDataSource {
    constructor(private readonly database: SqlDatabaseWrapper) {}

    async create(task: Task): Promise<boolean> {
        const result = await this.database.query(`
            insert into ${DB_TABLE} (title, description, status) values ($1, $2, $3) 
                            `, [task.title, task.description, task.status]);
        return result !== null;
    }

    async getAll(): Promise<Task[]> {
        const result = await this.database.query(`select * from ${DB_TABLE}`);
        return result.rows.map(item => ({
            id: item.id.toString(),
            title: item.title,
            description: item.description,
            status: item.status
        }));
    }

    async getOneById(id: string): Promise<Task> {
        const result = await this.database.query(`select * from ${DB_TABLE} where id = ${id}`);
        const first = result.rows[0];
        return Promise.resolve({
            id: first.id.toString(),
            title: first.title,
            description: first.description,
            status: first.status
        });
    }

    async update(task: Task): Promise<boolean> {
        const result = await this.database.query(`
            update ${DB_TABLE}
            SET title = $1,
                description = $2
            WHERE id = $3;
        `, [task.title, task.description, task.id]);

        return result !== null;
    }
}