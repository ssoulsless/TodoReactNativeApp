import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './utils/navigation';
const Stack = createStackNavigator();

import CreateTodoScreen from './screens/CreateTodo';
import LandingScreen from './screens/Landing';

import 'reflect-metadata';

import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator initialRouteName="Landing">
					<Stack.Screen
						name="Landing"
						component={LandingScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="CreateTodo"
						component={CreateTodoScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
