import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import Incident from './pages/Incidents/index'
import Detail from './pages/Detail/index'

const AppStack = createStackNavigator()
//screenOptions={{ headerShown: false }} tira o header da aplicação

export default function Routes() {
    return (
        <NavigationContainer>                   
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name='Incidents' component={Incident} />
                <AppStack.Screen name='Details' component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}