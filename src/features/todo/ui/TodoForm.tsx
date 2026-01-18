'use client'
import { createTodo } from '@/shared/api/query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { todoSchema, TodoSchema } from '../model/validation'
import styles from './TodoForm.module.scss'
const TodoForm = () => {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: createTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['todos']
			})
		}
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<TodoSchema>({
		resolver: zodResolver(todoSchema)
	})

	const onSubmit = (data: TodoSchema) => {
		mutation.mutate(data.title)
		reset()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.form}
		>
			<input
				type="text"
				placeholder="Введите задачу"
				{...register('title')}
				className={styles.input}
			/>
			{errors.title && (
				<span className={styles.error}>{errors.title.message}</span>
			)}
			<button
				type="submit"
				className={styles.button}
			>
				Добавить
			</button>
		</form>
	)
}

export default TodoForm
