import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';

const SwipeLeftAction: React.FunctionComponent<{
	scale: any;
	onEditPress: () => void;
}> = ({ scale, onEditPress = Function.prototype }) => {
	return (
		<Animated.View style={[{ transform: [{ scale }] }, styles.ActionWrapper]}>
			<TouchableWithoutFeedback onPress={() => onEditPress()}>
				<Animated.View>
					<List.Icon icon="pencil" color="#7f7f7f" />
				</Animated.View>
			</TouchableWithoutFeedback>
		</Animated.View>
	);
};

export default SwipeLeftAction;

const styles = StyleSheet.create({
	ActionWrapper: {
		borderRightWidth: 1,
		borderColor: '#f3f3f3',
		justifyContent: 'center',
	},
});
