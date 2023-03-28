import express from 'express'
import { Request, Response } from 'express'
import {GetAllTasksUseCase} from "../domain/contracts/use-cases/get-all-tasks-use-case";
import {CreateTaskUseCase} from "../domain/contracts/use-cases/create-task-use-case";
import {GetTaskByIdUseCase} from "../domain/contracts/use-cases/get-one-task-use-case";
import {UpdateTaskUseCase} from "../domain/contracts/use-cases/update-task-use-case";
import {UpdateStatusTaskUseCase} from "../domain/contracts/use-cases/update-status-task-use-case";
import {DeleteTaskUseCase} from "../domain/contracts/use-cases/delete-task-use-case";


export default function TaskRouter(
    getAllTasksUseCase: GetAllTasksUseCase,
    getOneTaskUseCase: GetTaskByIdUseCase,
    createTaskUseCase: CreateTaskUseCase,
    updateTaskUseCase: UpdateTaskUseCase,
    updateStatusTaskUseCase: UpdateStatusTaskUseCase,
    deleteTaskUseCase: DeleteTaskUseCase
) {
    const router = express.Router()

    router.get('/', async (req: Request, res: Response) => {
        try {
            const tasks = await getAllTasksUseCase.execute();
            res.send(tasks);
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" })
        }
    });

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const task = await getOneTaskUseCase.execute(req.params.id);
            res.send(task);
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" })
        }
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            await createTaskUseCase.execute(req.body)
            res.statusCode = 201
            res.json({ message: "Created" })
        } catch (err) {
            res.status(500).send({ message: "Error saving data" })
        }
    });

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            await updateTaskUseCase.execute(req.params.id, req.body)
            res.json({ message: "Updated" })
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Error updating data" })
        }
    });

    router.put('/:id/in-progress', async (req: Request, res: Response) => {
        try {
            await updateStatusTaskUseCase.execute(req.params.id, 'in-progress');
            res.json({ message: "Status Updated" })
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Error updating status data" })
        }
    });

    router.put('/:id/backlog', async (req: Request, res: Response) => {
        try {
            await updateStatusTaskUseCase.execute(req.params.id, 'backlog');
            res.json({ message: "Status Updated" })
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Error updating status data" })
        }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            await deleteTaskUseCase.execute(req.params.id);
            res.json({ message: "Deleted" })
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Error deleting data" })
        }
    })

    return router
}