import { Type } from 'class-transformer';

export interface TodoModel {
	id: number;
	text: string;
	list_id: number;
	checked: boolean;
	created_at: string;
	updated_at: string;
}

export interface ListModel {
	id: number;
	title: string;
	candidate_id: number;
	created_at: string;
	updated_at: string;
	todos: TodoModel[];
}

export class Todo implements TodoModel {
	checked!: boolean;

	created_at!: string;

	id!: number;

	list_id!: number;

	text!: string;

	updated_at!: string;
}

export class List implements ListModel {
	candidate_id!: number;

	updated_at!: string;

	created_at!: string;

	id!: number;

	title!: string;

	@Type(() => Todo)
	todos!: Todo[];
}
