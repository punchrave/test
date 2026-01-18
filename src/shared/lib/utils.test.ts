import { formatTodoCount } from './utils'

describe('formatTodoCount', () => {
	it('returns "Нет задач" for 0', () => {
		expect(formatTodoCount(0)).toBe('Нет задач')
	})

	it('returns "1 задача" for 1', () => {
		expect(formatTodoCount(1)).toBe('1 задача')
	})

	it('returns "N задачи" for 2-4', () => {
		expect(formatTodoCount(2)).toBe('2 задачи')
		expect(formatTodoCount(4)).toBe('4 задачи')
	})

	it('returns "N задач" for 5+', () => {
		expect(formatTodoCount(5)).toBe('5 задач')
		expect(formatTodoCount(10)).toBe('10 задач')
	})
})
