import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import { List } from 'react-native-paper';

const SwipeRightAction: React.FunctionComponent<{
	scale: any;
	onDeletePress: () => void;
}> = ({ scale, onDeletePress }) => {
	return (
		<Animated.View style={[{ transform: [{ scale }] }, styles.ActionWrapper]}>
			<TouchableWithoutFeedback onPress={() => onDeletePress()}>
				<Animated.View>
					<List.Icon icon="trash-can-outline" color="#b47786" />
				</Animated.View>
			</TouchableWithoutFeedback>
		</Animated.View>
	);
};

export default SwipeRightAction;

const styles = StyleSheet.create({
	ActionWrapper: {
		borderLeftWidth: 1,
		borderColor: '#f3f3f3',
		justifyContent: 'center',
	},
});
