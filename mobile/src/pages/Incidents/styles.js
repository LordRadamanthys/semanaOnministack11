import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errorMessage: {
        fontSize: 25,
        alignItems: "center",
    },

    headerText: {
        fontSize: 15,
        color: "#737380"
    },

    headerTextBold: {
        fontWeight: "bold"
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 30,
        color: "#13131a",
        fontWeight: "bold"
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#737380",
        marginBottom: 15
    },

    incidentList: {
        marginTop: 15,
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 16,
    },

    incidentProprety: {
        fontSize: 14,
        color: "#414d",
        fontWeight: "bold"
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: "#737380"
    },

    detailsButtom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    detailsButtonText: {
        color: "#e02071",
        fontSize: 15,
        fontWeight: "bold"
    },
    tabBackground: {
        backgroundColor: "#e02041"
    },

    textCreatIncident:{
        marginTop:20,
        color: "#e02071",
        fontSize: 15,
        fontWeight: "bold"
    }



})