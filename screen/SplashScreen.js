import React from 'react'
import {
    View,
    Text,
    Image,
    Platform,
    BackHandler
} from 'react-native'
var moment = require('moment')
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    primaryColor,
    API_KEY,
    BASEURL,
    REVIEW_URL,
} from '../utils/contants'

import {
    tokenControll,
    userInfoControll,
    indicatorControll,
    CheckTypeControll
} from '../actions'


import styles from '../style/style'
import image from '../img/logo.png'

import Helper from '../utils/Helper'

class SplashScreen extends React.Component {

    onAppreview() {
        Helper.post(BASEURL + REVIEW_URL, '', '', (results) => {
            if (results.data == 'PROD') {
                setTimeout(() => {
                    this.props.navigation.replace('Login')
                }, 1500)
            } else {
                setTimeout(() => {
                    this.props.navigation.replace('Review')
                }, 1500)
            }
        })
    }

    handleBack = () => {
        return true
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            // this.onAppreview()
            setTimeout(() => {
                this.props.navigation.replace('Login')
            }, 1500)
        } else {
            setTimeout(() => {
                this.props.navigation.replace('Login')
            }, 1500)
        }
        
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        return (
            <View style={[styles.center, { flex: 1, backgroundColor: primaryColor }]}>
                <Image source={image} style={{ resizeMode: 'contain', width: 250, height: '35%', margin: 10 }} />
                {/* <View style={[styles.positionBottom, { alignItems: 'center', justifyContent: 'center', bottom: 5 }]}>
                    <Text style={[styles.bodythai,{ fontSize: 18, color: 'white' }]}>{`Copyright © 2022 by Thiensurat Public Company Limited.`}</Text>
                </View> */}
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    tokenControll,
    userInfoControll,
    indicatorControll,
    CheckTypeControll
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)