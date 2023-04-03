import {Pool} from "pg";
import {PostgresTaskDataSource} from "./data/data-sources/postgres/postgres-task-data-source";

export default function getPDGS() {
    const db = new Pool({
        user: 'root',
        host: 'localhost',
        database: 'todoapp',
        password: 'docker',
        port: 5432,
    })
    return new PostgresTaskDataSource(db)
}