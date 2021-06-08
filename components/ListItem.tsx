import React from 'react';
import { useDispatch } from 'react-redux';
import { List } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SwipeRightAction from './SwipeRightAction';
import SwipeLeftAction from './SwipeLeftAction';

import { navigate } from '../utils/navigation';
import { deleteTodo, fetchData } from '../redux/actions/todosActions';

const ListItem: React.FunctionComponent<{
	text: string;
	isChecked: boolean;
	id: number;
	listId: number;
}> = ({ text, isChecked, id, listId }) => {
	const dispatch = useDispatch();

	return (
		<Swipeable
			rightThreshold={100}
			friction={2}
			renderLeftActions={(progress, dragX) => {
				const trans = dragX.interpolate({
					inputRange: [0, 75],
					outputRange: [0, 1.25],
					extrapolate: 'clamp',
				});
				return !isChecked ? (
					<SwipeLeftAction
						onEditPress={() => navigate('CreateTodo', { id, text, listId })}
						scale={trans}
					/>
				) : null;
			}}
			renderRightActions={(progress, dragX) => {
				const trans = dragX.interpolate({
					inputRange: [-75, 0],
					outputRange: [1.25, 0],
					extrapolate: 'clamp',
				});
				return (
					<SwipeRightAction
						onDeletePress={async () => {
							await dispatch(deleteTodo(listId, id));
							dispatch(fetchData());
						}}
						scale={trans}
					/>
				);
			}}>
			<List.Item
				title={text}
				titleStyle={
					isChecked && {
						textDecorationLine: 'line-through',
						color: '#8b8b8b',
					}
				}
				left={() => (
					<List.Icon
						icon={!isChecked ? 'circle-outline' : 'check'}
						color="#000"
					/>
				)}
			/>
		</Swipeable>
	);
};

export default ListItem;
