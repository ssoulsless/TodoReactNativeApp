import axios from 'axios';
import { plainToClass } from 'class-transformer';

import { API_URL } from '../../utils';

import { Dispatch } from 'react';

import { ListModel, TodoModel, List, Todo } from '../models';
import { TodosActions, ActionTypes } from '../types';

export const fetchData = () => {
	return async (dispatch: Dispatch<TodosActions>) => {
		try {
			const response = await axios.get<ListModel[]>(API_URL + '/list');
			const realLists = plainToClass(List, response.data);
			console.log(realLists);
			dispatch({ type: ActionTypes.FETCH_TODOS, payload: realLists });
		} catch (err) {
			console.error(err);
		}
	};
};
export const createList = (title: string) => {
	return async (dispatch: Dispatch<TodosActions>) => {
		try {
			await axios.post(API_URL + '/list', {
				title: title,
			});
			dispatch({ type: ActionTypes.CREATE_LIST });
		} catch (err) {
			console.error(err);
		} finally {
		}
	};
};
export const deleteList = (id: number) => {
	return async (dispatch: Dispatch<TodosActions>) => {
		try {
			await axios.delete(`${API_URL}/list/${id}`);
			dispatch({ type: ActionTypes.DELETE_LIST });
		} catch (err) {
			console.error(err);
		}
	};
};
export const createTodo = (listId: number, title: string) => {
	return async (dispatch: Dispatch<TodosActions>) => {
		try {
			await axios.post(`${API_URL}/list/${listId}/todo`, {
				list_id: listId,
				text: title,
			});
			dispatch({ type: ActionTypes.CREATE_TODO });
		} catch (err) {
			console.error(err);
		}
	};
};
export const editTodo = (listId: number, title: string, todoId: number) => {
	return async (dispatch: Dispatch<TodosActions>) => {
		try {
			await axios.patch(`${API_URL}/list/${listId}/todo/${todoId}`, {
				text: title,
				checked: false,
			});
			dispatch({ type: ActionTypes.EDIT_TODO });
		} catch (err) {
			console.error(err);
		}
	};
};
export const completeTodo = (listId: number, todoId: number) => {
	return async (dispatch: Dispatch<TodosActions>) => {
		try {
			await axios.patch(`${API_URL}/list/${listId}/todo/${todoId}`, {
				checked: true,
			});
			dispatch({ type: ActionTypes.COMPLETE_TODO });
		} catch (err) {
			console.error(err);
		}
	};
};
export const deleteTodo = (listId: number, todoId: number) => {
	return async (dispatch: Dispatch<TodosActions>) => {
		try {
			await axios.delete(`${API_URL}/list/${listId}/todo/${todoId}`);
			dispatch({ type: ActionTypes.DELETE_TODO });
		} catch (err) {
			console.error(err);
		}
	};
};
