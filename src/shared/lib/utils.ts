export function formatTodoCount(count: number): string {
	if (count === 0) return 'Нет задач'
	if (count === 1) return '1 задача'
	if (count >= 2 && count <= 4) return `${count} задачи`
	return `${count} задач`
}
