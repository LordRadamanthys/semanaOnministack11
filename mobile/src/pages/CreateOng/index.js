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


export default function CreateOng() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [uf, setUF] = useState('')
    const [city, setCity] = useState('')

    const [dataUF, setDataUF] = useState([])
    const [dataCity, setDataCity] = useState([])
    let estados = []
    let arrayUF = []
    let arrayCity = []

    useEffect(() => {
        getUFs()
    }, [])

    async function getUFs() {
        estados = await api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        const teste = estados.data
        var i = 0
        teste.forEach(element => {
            //console.log(element.nome)
            //arrayUF.push({ value: element.nome })
            arrayCity[i] = { value: element.nome }
            arrayUF[i] = { value: element.sigla }

            i++
        });
        // console.log(teste)
        setDataUF(arrayUF)
        setDataCity(arrayCity)
    }
    async function handlerCreateOng() {
        const data = { name, email, whatsapp, city, uf }
        // console.log(data)
        await api.post('ongs', data).then(response => {
            // console.log(response.data)
            simpleAlert("Seu Cadastro foi efetuado", `Seu id é: ${response.data}`)
        }).catch(error => {
            simpleAlert("Ops", error.message)
        })
    }

    return (
        <View style={styles.containe} >

            <View style={styles.header}>
                <Image source={LogoImg} />
            </View>



            <View style={styles.loginContainer}>
                <Text style={[styles.title, { marginTop: 0 }]} >Preencha o formulario</Text>

                <Text style={styles.title_label} >Nome:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(ongName) => setName(ongName)}
                    value={name}

                    placeholder="Insira o nome da ong"
                />

                <Text style={styles.title_label} >E-mail:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(ongEmail) => setEmail(ongEmail)}
                    value={email}

                    placeholder="Ex: ong@teste.com"
                />

                <Text style={styles.title_label} >Whatsapp:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(ongWhatsapp) => setWhatsapp(ongWhatsapp)}
                    value={whatsapp}

                    placeholder="(xx)XXXX-XXXXX"
                />

                <Dropdown
                    label='Cidade'
                    data={dataCity}
                    onChangeText={(ongCity) => setCity(ongCity)}

                />

                <Dropdown
                    label='UF'
                    data={dataUF}
                    onChangeText={(uf) => setUF(uf)}

                />


                <View style={styles.actions}>
                    <TouchableOpacity disabled={false} style={styles.action} onPress={handlerCreateOng} >
                        <Text style={styles.actionText}>Cadastrar</Text>
                        <ProgressBarAndroid animating={false} styleAttr={'Small'} color="#fff" />
                    </TouchableOpacity>
                </View>

            </View>


        </View>
    )
}