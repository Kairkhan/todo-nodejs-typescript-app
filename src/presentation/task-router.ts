import express from 'express'
import { Request, Response } from 'express'
import {GetAllTasksUseCase} from "../domain/contracts/use-cases/get-all-tasks-use-case";
import {CreateTaskUseCase} from "../domain/contracts/use-cases/create-task-use-case";
import {GetTaskByIdUseCase} from "../domain/contracts/use-cases/get-one-task-use-case";
import {UpdateTaskUseCase} from "../domain/contracts/use-cases/update-task-use-case";


export default function TaskRouter(
    getAllTasksUseCase: GetAllTasksUseCase,
    getOneTaskUseCase: GetTaskByIdUseCase,
    createTaskUseCase: CreateTaskUseCase,
    updateTaskUseCase: UpdateTaskUseCase,
) {
    const router = express.Router()

    router.get('/', async (req: Request, res: Response) => {
        try {
            const tasks = await getAllTasksUseCase.execute();
            res.send(tasks);
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const task = await getOneTaskUseCase.execute(req.params.id);
            res.send(task);
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            await createTaskUseCase.execute(req.body)
            res.statusCode = 201
            res.json({ message: "Created" })
        } catch (err) {
            res.status(500).send({ message: "Error saving data" })
        }
    })

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            await updateTaskUseCase.execute(req.params.id, req.body)
            res.statusCode = 201
            res.json({ message: "Updated" })
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Error updating data" })
        }
    })

    return router
}