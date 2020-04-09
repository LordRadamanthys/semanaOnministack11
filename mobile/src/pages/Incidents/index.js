import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import LogoImg from '../../assets/logo.png'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api'
import { formatCurrency } from '../../util/formatTools'



const initialLayout = { width: Dimensions.get('window').width };

export default function Incidents() {
    const routeParam = useRoute()
    const ongId = routeParam.params.id
    const name = routeParam.params.name

    async function loadIncidents() {
        if (loading) {
            return
        }

        if (total > 0 && incidents === total) {
            return
        }

        setLoading(true)


        const response = await api.get('incidents', {
            params: { page }
        })

        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    async function loadMyIncidents() {

        setLoading(true)


        const response = await api.get('profile', {
            headers: {
                Authorization: ongId
            }
        })

        console.log(response.data)

        setMyIncidents([...myIncidents, ...response.data])
        setLoading(false)
    }


    function navigationToDetail(incident) {
        navigation.navigate('Details', { incident, name })
    }

    useEffect(() => {
        loadIncidents()
        loadMyIncidents()
    }, [])

    const emptyData = () => (
        <View style={styles.container}>
            <Text style={styles.errorMessage}>Ops, parece que você não tem nenhum caso</Text>
        </View>
    )
    const FirstRoute = () => (
        <FlatList
            data={myIncidents}
            style={styles.incidentList}
            keyExtractor={myincident => String(myincident.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: myincident }) => (
                <View style={styles.incident}>


                    <Text style={styles.incidentProprety} >CASO:</Text>
                    <Text style={styles.incidentValue} >{myincident.title}</Text>

                    <Text style={styles.incidentProprety} >Valor:</Text>
                    <Text style={styles.incidentValue} >{formatCurrency(myincident.value)}</Text>

                    <TouchableOpacity
                        style={styles.detailsButtom}
                        onPress={() => navigationToDetail(myincident, name)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={17} color="#e02041" />
                    </TouchableOpacity>
                </View>)
            }
        />
    );

    const SecondRoute = () => (
        <FlatList
            data={incidents}
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: incident }) => (
                <View style={styles.incident}>
                    <Text style={styles.incidentProprety} >ONG:</Text>
                    <Text style={styles.incidentValue} >{incident.name}</Text>

                    <Text style={styles.incidentProprety} >CASO:</Text>
                    <Text style={styles.incidentValue} >{incident.title}</Text>

                    <Text style={styles.incidentProprety} >Valor:</Text>
                    <Text style={styles.incidentValue} >{formatCurrency(incident.value)}</Text>

                    <TouchableOpacity
                        style={styles.detailsButtom}
                        onPress={() => navigationToDetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={17} color="#e02041" />
                    </TouchableOpacity>
                </View>)
            }
        />
    );

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Meus Casos' },
        { key: 'second', title: 'Todos os Casos' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [myIncidents, setMyIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    //styles tabbar
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={styles.tabBackground}
        />
    );

    function navigateToCreateIncidents(){
        navigation.navigate('CreateIncidents', { id:ongId})
    }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={LogoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold} >{total} casos</Text>
                </Text>
            </View>
            <TouchableOpacity onPress={navigateToCreateIncidents} >
                <Text style={styles.textCreatIncident}>Criar <Feather name="plus" size={17} color="#e02041" /></Text>
            </TouchableOpacity>
            

            <Text style={styles.title}>Bem-Vindo {name}</Text>
            <Text style={styles.description}>Escolha um dos casos a baixo e salve o dia</Text>

            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />


        </View>
    )
}
