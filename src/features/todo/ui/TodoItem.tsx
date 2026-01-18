import { deleteTodo, updateTodo } from '@/shared/api/query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Todo } from '../types'
import styles from './TodoItem.module.scss'
interface TodoItemProps {
	todo: Todo
}

const TodoItem = ({ todo }: TodoItemProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const [newTitle, setNewTitle] = useState(todo.title)
	const handleEdit = () => {
		setIsEditing(true)
	}
	const queryClient = useQueryClient()

	const deleteMutation = useMutation({
		mutationFn: deleteTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['todos']
			})
		}
	})
	const updateMutation = useMutation({
		mutationFn: updateTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['todos']
			})
		}
	})

	const handleSave = () => {
		if (newTitle.trim() !== '') {
			updateMutation.mutate({ id: todo.id, title: newTitle })
			setIsEditing(false)
		}
	}
	const handleCancel = () => {
		setIsEditing(false)
		setNewTitle(todo.title)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSave()
		} else if (e.key === 'Escape') {
			handleCancel()
		}
	}

	return (
		<li className={styles.item}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() =>
					updateMutation.mutate({ id: todo.id, completed: !todo.completed })
				}
			/>
			{isEditing ? (
				<input
					type="text"
					value={newTitle}
					onChange={e => setNewTitle(e.target.value)}
					onKeyDown={handleKeyDown}
					className={styles.title}
					onBlur={handleSave}
					autoFocus
				/>
			) : (
				<div>
					<span
						onDoubleClick={handleEdit}
						className={`${styles.title} ${
							todo.completed ? styles.completed : ''
						}`}
					>
						{todo.title}
					</span>
					<button
						className={styles.button}
						type="button"
						onClick={handleEdit}
					>
						Редактировать
					</button>
				</div>
			)}
			<button
				className={styles.button}
				type="button"
				onClick={() => deleteMutation.mutate(todo.id)}
			>
				Удалить
			</button>
		</li>
	)
}

export default TodoItem
