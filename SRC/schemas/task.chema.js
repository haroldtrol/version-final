import {date, z} from 'zod';
 export const createTasksSchema = z.object({
    title: z.string({
        required_error: 'Name is required'
    }),
    description: z.string({
        required_error: 'Description is required'
    })
    .optional(),
    date: z.string().datetime().optional(),
});