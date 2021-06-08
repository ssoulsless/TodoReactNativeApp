import React, { useState, useCallback } from 'react';
import {
	StyleSheet,
	TextInput,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListModel } from '../redux/models';

import { useTypedSelector } from '../utils/hooks/useTypedSelector';
import { createTodo, editTodo, fetchData } from '../redux/actions/todosActions';

const CreateTodo: React.FunctionComponent<{ navigation: any; route?: any }> = ({
	navigation,
	route,
}) => {
	const [checked, setChecked] = useState<number>(0);
	const [textValue, setTextValue] = useState<string>('');
	const [isFieldValid, setIsFieldValid] = useState<boolean>(true);
	const [isSelected, setIsSelected] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const dispatch = useDispatch();

	const todosLists = useTypedSelector((state) => state.todosLists.lists);

	useFocusEffect(
		useCallback(() => {
			if (route.params !== undefined) {
				setTextValue(route.params.text);
				setChecked(route.params.listId);
			}
		}, [])
	);

	const handleIsValidField = (value: string): void => {
		if (value === '') {
			setIsFieldValid(false);
			setErrorMessage('Введите название задачи');
		} else if (value.length >= 30) {
			setIsFieldValid(false);
			setErrorMessage('Значение не должно превышать 30 символов');
		} else {
			setIsFieldValid(true);
		}
	};
	const handleIsSelected = () => {
		checked === 0 ? setIsSelected(false) : setIsSelected(true);
	};
	const onDoneClick = async () => {
		handleIsValidField(textValue);
		handleIsSelected();
		if (isSelected && isFieldValid) {
			route.params === undefined
				? await dispatch(createTodo(checked, textValue))
				: await dispatch(editTodo(checked, textValue, route.params.id));
			dispatch(fetchData());
			navigation.navigate('Landing');
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
						<MaterialCommunityIcons
							name="arrow-left"
							color="#ababab"
							size={25}
						/>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={() => onDoneClick()}>
						<MaterialCommunityIcons name="check" color="#ababab" size={25} />
					</TouchableWithoutFeedback>
				</View>
				<View style={styles.contentWrapper}>
					<TextInput
						placeholder="Название задачи"
						autoFocus={true}
						placeholderTextColor={isFieldValid ? '#c2c2c2' : '#f00'}
						style={isFieldValid ? styles.taskNameInput : styles.invalidInput}
						value={textValue}
						onChangeText={(value) => setTextValue(value)}
						onEndEditing={(e) => handleIsValidField(e.nativeEvent.text)}
					/>
					{!isFieldValid && (
						<Text style={styles.errorMessage}>{errorMessage}</Text>
					)}
					<List.Subheader
						style={isSelected ? styles.subheader : styles.subheaderInvalid}>
						Категория
					</List.Subheader>
					{!isSelected && (
						<Text style={styles.errorMessage}>Выберите категорию</Text>
					)}
					<FlatList
						showsVerticalScrollIndicator={false}
						data={todosLists}
						renderItem={({ item }) => (
							<List.Item
								onPress={() => {
									setChecked(item.id);
									setIsSelected(true);
								}}
								titleStyle={styles.listItemTitle}
								style={styles.listItem}
								title={item.title}
								right={() => (
									<List.Icon
										style={{ margin: 0 }}
										icon={
											!(checked === item.id)
												? 'radiobox-blank'
												: 'radiobox-marked'
										}
									/>
								)}
							/>
						)}
						keyExtractor={(item: ListModel) => item.id.toString()}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default CreateTodo;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: '#fff',
	},
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	contentWrapper: {
		flex: 6,
		marginTop: 35,
	},
	taskNameInput: {
		fontSize: 30,
	},
	invalidInput: {
		// flex: 1,
		borderColor: '#f00',
		borderBottomWidth: 0.5,
		fontSize: 30,
	},
	subheader: {
		textTransform: 'uppercase',
		color: '#b9b9b9',
		marginLeft: 0,
		paddingLeft: 0,
		marginTop: 25,
	},
	subheaderInvalid: {
		textTransform: 'uppercase',
		color: '#f00',
		marginLeft: 0,
		paddingLeft: 0,
		marginTop: 25,
	},
	listItem: {
		paddingLeft: 0,
	},
	listItemTitle: {
		fontSize: 20,
	},
	errorMessage: {
		color: '#f00',
		fontSize: 14,
		textAlign: 'center',
		marginTop: 10,
	},
});
