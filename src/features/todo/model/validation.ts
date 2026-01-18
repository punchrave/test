import { z } from 'zod'

export const todoSchema = z.object({
	title: z
		.string()
		.min(3, 'Минимальная длина 3 символа')
		.max(50, 'Максимальная длина 50 символов')
		.trim()
})

export type TodoSchema = z.infer<typeof todoSchema>
