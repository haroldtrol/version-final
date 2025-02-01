import { Router } from "express";
import { authRequired } from "../middlewares/validate_token.js";
import {
getTasks,
getTask,
createTasks,
upadateTasks,
deleteTasks} from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTasksSchema } from "../schemas/task.chema.js"; 
const router = Router();

router.get('/task', authRequired, getTasks);
router.get('/task/:id', authRequired, getTask);
router.post('/task', authRequired, validateSchema( createTasksSchema), createTasks  );
router.delete('/task/:id', authRequired,deleteTasks  );
router.put('/task/:id', authRequired, upadateTasks );


export default router;