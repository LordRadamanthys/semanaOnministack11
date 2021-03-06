import React, { useEffect, useState, Link } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, ImageBackground, ProgressBarAndroid ,Dimensions} from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import LogoImg from '../../assets/logo.png'

import ImageBack from '../../assets/heroes.png'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'
import { simpleAlert, actionsAlert } from '../../util/Alert'


export default function Login() {
    const navigation = useNavigation()
    const [id, setOngID] = useState('')
    const [keyProgress, setKeyProgress] = useState(false)

    function createAccout() {
        navigation.navigate('CreateOng')
    }

    async function handleLogin() {

        if (!id) return simpleAlert('Aviso', 'O campo ID deve ser preenchido!')

        setKeyProgress(true)

        const response = await api.post('sessions', { id })
            .then((response) => {
                setKeyProgress(false)

                navigation.navigate('Incidents', { name: response.data.name, id:response.data.id })
            }).catch((erro) => {
                simpleAlert('Ops!', erro.response.data.erro)
                setKeyProgress(false)
            })
        // localStorage.setItem('ongId',id)
        // localStorage.setItem('ongName',response.data.name)


    }
    return (
        <View style={styles.containe} >

            <View style={styles.header}>
                <Image source={LogoImg} />
            </View>

            <ImageBackground source={ImageBack} style={styles.image}>
            </ImageBackground>

            <View style={styles.loginContainer}>
                <Text style={[styles.title, { marginTop: 0 }]} >Bem-Vindo</Text>
                <Text style={styles.title_login} >Login:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(ongID) => setOngID(ongID)}
                    value={id}
                    
                    placeholder="Insira seu ID ou E-Mail"
                />


                <View style={styles.actions}>
                    <TouchableOpacity disabled={keyProgress} style={styles.action} onPress={handleLogin} >
                        <Text style={styles.actionText}>Entrar</Text>
                        <ProgressBarAndroid animating={keyProgress} styleAttr={'Small'} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={createAccout} disabled={keyProgress} >
                        <Text style={styles.creatText}><Feather name="user-plus" size={19} color="#e02041" /> Crie uma conta</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>



    )
}