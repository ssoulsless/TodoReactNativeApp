import { TodosActions, ActionTypes, UserState } from '../types';

const initialState: UserState = {
	lists: [],
	loading: false,
	error: false,
};

export const todosReducer = (
	state = initialState,
	action: TodosActions
): UserState => {
	switch (action.type) {
		case ActionTypes.FETCH_TODOS:
			return { lists: action.payload, loading: false, error: false };
		default:
			return state;
	}
};
