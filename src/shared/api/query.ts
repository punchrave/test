export const fetchTodos = async () => {
	const response = await fetch('/api/todos')
	if (!response.ok) {
		throw new Error('Failed to fetch todos')
	}
	return response.json()
}

export async function createTodo(title: string) {
	const response = await fetch('/api/todos', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title })
	})
	if (!response.ok) {
		throw new Error('Failed to create todo')
	}
	return response.json()
}

export async function updateTodo(data: {
	id: number
	title?: string
	completed?: boolean
}) {
	const response = await fetch(`/api/todos`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	if (!response.ok) {
		throw new Error('Failed to update todo')
	}
	return response.json()
}

export async function deleteTodo(id: number) {
	const response = await fetch(`/api/todos?id=${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	if (!response.ok) {
		throw new Error('Failed to delete todo')
	}
	return response.json()
}
