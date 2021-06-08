import { NavigationContainerRef } from '@react-navigation/core';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigate = (screenName: string, props: any) => {
	navigationRef.current?.navigate(screenName, props);
};
