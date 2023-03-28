import express from 'express'
import { Request, Response } from 'express'
import {GetAllTasksUseCase} from "../domain/contracts/use-cases/get-all-tasks";
import {CreateTaskUseCase} from "../domain/contracts/use-cases/create-task";
import {GetTaskByIdUseCase} from "../domain/contracts/use-cases/get-one-task";


export default function TaskRouter(
    getAllTasksUseCase: GetAllTasksUseCase,
    getOneTaskUseCase: GetTaskByIdUseCase,
    createTaskUseCase: CreateTaskUseCase
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

    return router
}