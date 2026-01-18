import { Todo } from '../types'
import TodoItem from './TodoItem'
import styles from './TodoList.module.scss'
interface TodoListProps {
	todos: Todo[]
}

const TodoList = ({ todos }: TodoListProps) => {
	return (
		<ul className={styles.todoList}>
			{todos.map(todo => (
				<TodoItem
					key={todo.id}
					todo={todo}
				/>
			))}
		</ul>
	)
}

export default TodoList
