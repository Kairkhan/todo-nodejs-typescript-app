import express from 'express'
import { Request, Response } from 'express'
import {GetAllTasksUseCase} from "../domain/contracts/use-cases/get-all-tasks";
import {CreateTaskUseCase} from "../domain/contracts/use-cases/create-task";


export default function TaskRouter(
    getAllTasksUseCase: GetAllTasksUseCase,
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