import React from 'react'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import LogoImg from '../../assets/logo.png'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import {formatCurrency} from '../../util/formatTools'

export default function Detail() {
    const route = useRoute()
    const navigation = useNavigation()
    const incident = route.params.incident
    const name = !incident.name ? route.params.name : incident.name
    const ongTitleValue = incident.name ? `${incident.name} de ${incident.city}/${incident.uf}` : name
    const message = `Olá ${name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${formatCurrency(incident.value)}`
    function navigateBack() {
        // navigation.navigate('Incidents')
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function senWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
        // Linking.openURL(`whatsapp://send?phone=5511966511067&text=${message}`)
    }
    return (
        <View style={styles.containe} >

            <View style={styles.header}>
                <Image source={LogoImg} />

                <TouchableOpacity
                    onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProprety, { marginTop: 0 }]} >ONG:</Text>
                <Text style={styles.incidentValue} >{ongTitleValue}</Text>

                <Text style={styles.incidentProprety} >CASO:</Text>
                <Text style={styles.incidentValue} >{incident.title}</Text>

                <Text style={styles.incidentProprety} >DESCRIÇÃO:</Text>
                <Text style={styles.incidentValue} >{incident.description}</Text>

                <Text style={styles.incidentProprety} >Valor:</Text>
                <Text style={styles.incidentValue} >{formatCurrency(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso</Text>


                <Text style={styles.heroDescription}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={senWhatsApp} >
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail} >
                        <Text style={styles.actionText}>E-Mail</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}