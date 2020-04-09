import React, { useEffect, useState, Link } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, ImageBackground, ProgressBarAndroid, Dimensions, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import LogoImg from '../../assets/logo.png'
import { Dropdown } from 'react-native-material-dropdown';

import ImageBack from '../../assets/heroes.png'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'
import { simpleAlert, actionsAlert } from '../../util/Alert'

export default function CreateIncidents(){
    const navigation = useNavigation()
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [value, setValue] = useState('')
    const route = useRoute()
    const ongId = route.params.id

    function navigateBack() {
        navigation.goBack()
    }

    async function createIncident(){
        const data = {title, description, value}
        await api.post('incidents',data,{
            headers: {
                Authorization: ongId
            }
        }).then(response=>{
            simpleAlert("Feito :)", "Seu caso foi criado!")
        }).catch(error =>{
            simpleAlert("Erro ):", error.message)
        })
    }
    return(
        <View style={styles.containe} >

            <View style={styles.header}>
                <Image source={LogoImg} />
                <TouchableOpacity
                    onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
           



            <View style={styles.loginContainer}>
                <Text style={[styles.title, { marginTop: 0 }]} >Preencha o formulario</Text>

                <Text style={styles.title_label} >Titulo:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(incidentTitle)=>setTitle(incidentTitle)}
                    value={title}

                    placeholder="Insira um titulo"
                />

                <Text style={styles.title_label} >Descrição:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(incidentDescription)=>setDescription(incidentDescription)}
                    value={description}
                    placeholder="Descreva seu caso"
                />

                <Text style={styles.title_label} >Valor:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(incidentValue) => setValue(incidentValue)}
                    value={value}

                    placeholder="Digite sua meta em R$"
                />


                <View style={styles.actions}>
                    <TouchableOpacity disabled={false} style={styles.action} onPress={createIncident} >
                        <Text style={styles.actionText}>Criar</Text>
                        <ProgressBarAndroid animating={false} styleAttr={'Small'} color="#fff" />
                    </TouchableOpacity>
                </View>

            </View>


        </View>
    )
}