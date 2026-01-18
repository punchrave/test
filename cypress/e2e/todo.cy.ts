describe('Todo App', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('should display the app title', () => {
		cy.contains('h1', 'Todo App')
	})

	it('should create a new todo', () => {
		cy.get('input[type="text"]').type('Купить молоко')
		cy.get('button[type="submit"]').click()
		cy.contains('Купить молоко')
	})

	// 👇 НОВЫЕ ТЕСТЫ 👇

	it('should show validation error for short title', () => {
		cy.get('input[type="text"]').type('ab') // 2 символа
		cy.get('button[type="submit"]').click()
		cy.contains('Минимальная длина 3 символа')
	})

	it('should toggle todo completion', () => {
		// Создаём задачу
		cy.get('input[type="text"]').type('Тестовая задача')
		cy.get('button[type="submit"]').click()

		// Находим чекбокс рядом с задачей и кликаем
		cy.contains('li', 'Тестовая задача').find('input[type="checkbox"]').click()

		// Проверяем, что появилась секция "Выполненные"
		cy.contains('Выполненные')
	})

	it('should delete a todo', () => {
		// Создаём задачу
		cy.get('input[type="text"]').type('Удалить меня')
		cy.get('button[type="submit"]').click()
		cy.contains('Удалить меня')

		// Нажимаем "Удалить"
		cy.contains('Удалить меня').parent().contains('button', 'Удалить').click()

		// Проверяем, что задачи нет
		cy.contains('Удалить меня').should('not.exist')
	})
})
