import { TodoModel, ListModel, List } from '../models';

export enum ActionTypes {
	FETCH_TODOS = 'FETCH_TODOS',
	CREATE_LIST = 'CREATE_LIST',
	COMPLETE_TODO = 'COMPLETE_TODO',
	DELETE_LIST = 'DELETE_LIST',
	CREATE_TODO = 'CREATE_TODO',
	DELETE_TODO = 'DELETE_TODO',
	EDIT_TODO = 'EDIT_TODO',
}

interface FetchDataAction {
	readonly type: ActionTypes.FETCH_TODOS;
	payload: List[];
}

interface CreateListAction {
	readonly type: ActionTypes.CREATE_LIST;
}

interface CompleteTodoAction {
	readonly type: ActionTypes.COMPLETE_TODO;
}

interface DeleteListAction {
	readonly type: ActionTypes.DELETE_LIST;
}

interface CreateTodoAction {
	readonly type: ActionTypes.CREATE_TODO;
}

interface DeleteTodoAction {
	readonly type: ActionTypes.DELETE_TODO;
}

interface EditTodoAction {
	readonly type: ActionTypes.EDIT_TODO;
}

export type TodosActions =
	| FetchDataAction
	| CreateListAction
	| CompleteTodoAction
	| DeleteListAction
	| CreateTodoAction
	| DeleteTodoAction
	| EditTodoAction;

export interface UserState {
	lists: any[];
	loading: boolean;
	error: boolean | null;
}
