import React, { useCallback, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
	TextInput,
} from 'react-native';
import { List, FAB, Modal } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import {
	completeTodo,
	createList,
	createTodo,
	deleteList,
	fetchData,
} from '../redux/actions/todosActions';

import { useFocusEffect } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTypedSelector } from '../utils/hooks/useTypedSelector';
import { TodoModel } from '../redux/models';
import ListItem from '../components/ListItem';
import Animated from 'react-native-reanimated';

const Landing: React.FunctionComponent<{ navigation: any }> = (props) => {
	const { navigation } = props;

	const [expanded, setExpanded] = useState<number[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [textValue, setTextValue] = useState<string>('');
	const [isFieldValid, setIsFieldValid] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const todosLists = useTypedSelector((state) => state.todosLists.lists);

	const dispatch = useDispatch();

	useFocusEffect(
		useCallback(() => {
			dispatch(fetchData());
		}, [])
	);

	const handleValidField = (value: string): void => {
		if (value === '') {
			setIsFieldValid(false);
			setErrorMessage('Введите название категории');
		} else if (value.length >= 30) {
			setIsFieldValid(false);
			setErrorMessage('Значение не должно превышать 30 символов');
		} else {
			setIsFieldValid(true);
		}
	};

	const createCategory = async () => {
		handleValidField(textValue);
		if (isFieldValid) {
			await dispatch(createList(textValue));
			dispatch(fetchData());
			setIsModalOpen(false);
			setTextValue('');
		}
	};

	const completeTask = async (listId: number, todoId: number) => {
		await dispatch(completeTodo(listId, todoId));
		dispatch(fetchData());
	};

	const deleteCategory = async (listId: number) => {
		await dispatch(deleteList(listId));
		dispatch(fetchData());
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.wrapper}>
					<View style={styles.header}>
						<View style={{ flex: 1 }} />
						<View style={styles.headerContentWrapper}>
							<Text style={styles.titleText}>Задачи</Text>
							<TouchableOpacity onPress={() => setIsModalOpen(true)}>
								<MaterialCommunityIcons name="folder-plus" size={26} />
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.contentWrapper}>
						<FlatList
							showsVerticalScrollIndicator={false}
							data={todosLists}
							renderItem={({ item, index }) => (
								<List.Section>
									<List.Subheader style={styles.subheader}>
										{item.title}
									</List.Subheader>
									{item.todos.map(
										(todo: TodoModel) =>
											!todo.checked && (
												<TouchableOpacity
													key={todo.id}
													onPress={() => completeTask(item.id, todo.id)}>
													<ListItem
														listId={item.id}
														id={todo.id}
														text={todo.text}
														isChecked={todo.checked}
													/>
												</TouchableOpacity>
											)
									)}
									<List.Accordion
										onPress={() =>
											expanded.includes(index)
												? setExpanded(expanded.filter((e) => e !== index))
												: setExpanded(expanded.concat(index))
										}
										style={{ backgroundColor: '#fff' }}
										title="Завершенные"
										titleStyle={{ color: '#000' }}
										right={() => <View />}
										left={() => (
											<List.Icon
												icon={
													expanded.includes(index)
														? 'chevron-up'
														: 'chevron-down'
												}
											/>
										)}>
										{item.todos.map(
											(todo: TodoModel) =>
												todo.checked && (
													<ListItem
														listId={item.id}
														id={todo.id}
														text={todo.text}
														isChecked={todo.checked}
														key={todo.id}
													/>
												)
										)}
									</List.Accordion>
								</List.Section>
							)}
							keyExtractor={(item) => item.id.toString()}
						/>
					</View>
					<FAB
						onPress={() => navigation.navigate('CreateTodo')}
						icon="plus"
						animated={true}
						color="#fff"
						style={styles.fab}
					/>
					<Modal
						style={styles.modal}
						dismissable={true}
						visible={isModalOpen}
						onDismiss={() => setIsModalOpen(false)}>
						<View style={styles.modalWrapper}>
							{todosLists.map((listItem) => (
								<List.Item
									title={listItem.title}
									key={listItem.id}
									right={() => (
										<TouchableOpacity
											onPress={() => deleteCategory(listItem.id)}>
											<List.Icon
												icon="trash-can-outline"
												color="#b47786"
												style={styles.Icon}
											/>
										</TouchableOpacity>
									)}
								/>
							))}
							<View style={styles.inputWrapper}>
								<TextInput
									placeholder="Новая категория"
									placeholderTextColor={isFieldValid ? '#c2c2c2' : '#f00'}
									style={
										isFieldValid
											? styles.categoryNameInput
											: styles.invalidInput
									}
									value={textValue}
									onChangeText={(value) => setTextValue(value)}
									onSubmitEditing={(e) => handleValidField(e.nativeEvent.text)}
								/>
								<TouchableWithoutFeedback
									onPress={async () => createCategory()}>
									<View>
										<List.Icon
											icon="plus"
											style={styles.Icon}
											color="#a5a5a5"
										/>
									</View>
								</TouchableWithoutFeedback>
							</View>
							{!isFieldValid && (
								<Text style={styles.errorMessage}>{errorMessage}</Text>
							)}
						</View>
					</Modal>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default Landing;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 1,
		paddingHorizontal: 16,
	},
	contentWrapper: {
		flex: 6,
		paddingHorizontal: 16,
	},
	titleText: {
		fontSize: 26,
		fontWeight: '500',
		marginBottom: 24,
	},
	headerContentWrapper: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		flex: 4,
	},
	fab: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		margin: 16,
		backgroundColor: '#1e76fb',
	},
	modal: {
		flexShrink: 1,
		justifyContent: 'flex-end',
		marginBottom: 0,
	},
	modalWrapper: {
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		borderRadius: 9,
		paddingBottom: 32,
	},
	Icon: {
		margin: 0,
	},
	buttonTitle: {
		color: '#a5a5a5',
	},
	subheader: {
		textTransform: 'uppercase',
		color: '#b9b9b9',
		marginLeft: 0,
	},
	categoryNameInput: {
		fontSize: 16,
	},
	inputWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 16,
		paddingRight: 8,
	},
	errorMessage: {
		color: '#f00',
		fontSize: 12,
		textAlign: 'center',
		marginTop: 10,
	},
	invalidInput: {
		flex: 1,
		borderColor: '#f00',
		borderBottomWidth: 0.5,
		fontSize: 16,
	},
});
