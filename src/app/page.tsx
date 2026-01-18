'use client'
import type { Todo } from '@/features/todo/types'
import TodoForm from '@/features/todo/ui/TodoForm'
import TodoList from '@/features/todo/ui/TodoList'
import { fetchTodos } from '@/shared/api/query'
import { useQuery } from '@tanstack/react-query'
import styles from './page.module.scss'

export default function Home() {
	const { data: todos = [] } = useQuery<Todo[]>({
		queryKey: ['todos'],
		queryFn: fetchTodos
	})
	const activeTodos = todos.filter(todo => !todo.completed)
	const completedTodos = todos.filter(todo => todo.completed)
	return (
		<div className={styles.container}>
			<h1>Todo App</h1>
			<TodoForm />

			<div className={styles.activeTodos}>
				<h2>Активные ({activeTodos.length})</h2>
				<TodoList todos={activeTodos} />
			</div>

			{completedTodos.length > 0 && (
				<div className={styles.completedTodos}>
					<h2>Выполненные ({completedTodos.length})</h2>
					<TodoList todos={completedTodos} />
				</div>
			)}
		</div>
	)
}
