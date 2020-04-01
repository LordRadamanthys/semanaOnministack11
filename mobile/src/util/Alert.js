import { View, Image, Text, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native'

module.exports = {
    simpleAlert(title, message) {
        Alert.alert(
            title,
            message,
        )
    },


    actionsAlert(title, message, okFunc, cancelFunc) {
        Alert.alert(
            'Aviso',
            'O campo ID deve ser preenchido!',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]
        )
    },
}