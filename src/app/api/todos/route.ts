import { NextRequest, NextResponse } from 'next/server'

// In-memory хранилище (для простоты)
// В реальном приложении — база данных
const todos = [{ id: 1, title: 'Пример задачи', completed: false }]

let nextId = 2

// GET /api/todos - получить все задачи
export async function GET() {
	return NextResponse.json(todos)
}

// POST /api/todos - создать задачу
export async function POST(request: NextRequest) {
	const body = await request.json()

	const newTodo = {
		id: nextId++,
		title: body.title,
		completed: false
	}

	todos.push(newTodo)
	return NextResponse.json(newTodo, { status: 201 })
}

// PUT /api/todos - обновить задачу
export async function PUT(request: NextRequest) {
	const body = await request.json()

	const todoIndex = todos.findIndex(t => t.id === body.id)

	if (todoIndex === -1) {
		return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
	}

	todos[todoIndex] = { ...todos[todoIndex], ...body }
	return NextResponse.json(todos[todoIndex])
}

// DELETE /api/todos?id=123 - удалить задачу
export async function DELETE(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const id = parseInt(searchParams.get('id') || '0')

	const todoIndex = todos.findIndex(t => t.id === id)

	if (todoIndex === -1) {
		return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
	}

	todos.splice(todoIndex, 1)
	return NextResponse.json({ success: true })
}
