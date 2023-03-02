import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    Linking,
    AppState,
    Platform,
    BackHandler,
    TouchableOpacity,
    Dimensions,
    PermissionsAndroid
} from 'react-native'
import { connect } from 'react-redux'
import RNExitApp from 'react-native-exit-app'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Geolocation from '@react-native-community/geolocation'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'
import VersionCheck from 'react-native-version-check';
import FastImage from 'react-native-fast-image'
var RNFS = require('react-native-fs');
var numeral = require('numeral');
var moment = require('moment');

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    darknessColor,
    grayColor,
    API_KEY,
    BASEURL,
    CHECK_URL,
    CHECK_KEY,
    CHECK_TIME,
    TIMESTAMP,
    CHECK_OUT,
    CHECK_TIMEINOUT,
    PICURL
} from '../../utils/contants'

import {
    CheckTypeControll,
    indicatorControll
} from '../../actions'

import styles from '../../style/style'

import Helper from '../../utils/Helper'
import StorageService from '../../utils/StorageServies'

import nophoto from '../../img/nophoto.png'

const DEVICE_WIDTH = Dimensions.get('window').width;

class SelectinoutScreen extends React.Component {

    state = {
        latitude: '',
        longitude: '',
        checkInTime: null,
        checkOutTime: null,
        checkTime: 600000,
        currentTime: new Date(),
        check: false,
        appState: AppState.currentState
    }

    onUpdate(url) {
        Linking.openURL(url);
    }

    async getCheckTimeInOut() {

        let that = this
        await that.setState({ checkInTime: null , checkOutTime: null })
        const props = that.props
        const users = props.reducer.userInfo
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();

        formData.append('empid', users.empId);

        props.indicatorControll(true)
        Helper.post(BASEURL + CHECK_TIMEINOUT, formData, header, async (results) => {
            // alert(JSON.stringify(results))
            // return
            if (results.status == 'SUCCESS') {
                await that.setState({ checkInTime: results.TimeIn , checkOutTime: results.TimeOut })
                await props.indicatorControll(false)
            } else {
                await props.indicatorControll(false)
                await that.setState({ checkInTime: null , checkOutTime: null })
                // await Alert.alert(
                //     'คำเตือน',
                //     `${results.message}`,
                //     [
                //         { text: 'OK', onPress: () => null },
                //     ],
                //     { cancelable: false }
                // )
            }
        })
    }

    // checkVersion = async () => {
    //     let current = await VersionCheck.getCurrentVersion();
    //     if (Platform.OS == 'android') {
    //         await VersionCheck.getLatestVersion({
    //             provider: 'playStore'
    //         }).then(latestVersion => {
    //             let lVersion = latestVersion.replace('.', '')
    //             let cVersion = current.replace('.', '')
    //             if (Number(lVersion.replace('.', '')) > Number(cVersion.replace('.', ''))) {
    //                 Alert.alert(
    //                     `คำเตือน`,
    //                     `แอพฯ ของคุณเก่าเกินไป กรุณาอัพเดท`,
    //                     [
    //                         {
    //                             text: 'ไม่, ขอบคุณ',
    //                             onPress: () => { RNExitApp.exitApp() },
    //                             style: 'cancel',
    //                         },
    //                         {
    //                             text: 'อัพเดท', onPress: () => {
    //                                 this.onUpdate('https://play.google.com/store/apps/details?id=com.hrmobile');
    //                             }
    //                         },
    //                     ],
    //                     { cancelable: false },
    //                 );
    //             }
    //         });
    //     } else {
    //         await VersionCheck.getLatestVersion({
    //             provider: 'appStore'
    //         }).then(latestVersion => {
    //             if (latestVersion > current) {
    //                 Alert.alert(
    //                     `คำเตือน`,
    //                     `แอพฯ ของคุณเก่าเกินไป กรุณาอัพเดท`,
    //                     [
    //                         {
    //                             text: 'ไม่, ขอบคุณ',
    //                             onPress: () => { RNExitApp.exitApp() },
    //                             style: 'cancel',
    //                         },
    //                         {
    //                             text: 'อัพเดท', onPress: () => {
    //                                 this.onUpdate('https://itunes.apple.com/');
    //                             }
    //                         },
    //                     ],
    //                     { cancelable: false },
    //                 );
    //             }
    //         });
    //     }
    // }

    checkLocationEnable() {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
            .then(data => {
                this.requestLocationPermission()
            }).catch(err => {
                RNExitApp.exitApp()
            });
    }

    async checkIOSLocationEnable() {
        const locationServicesAvailable = await ConnectivityManager.areLocationServicesEnabled()
        if (!locationServicesAvailable) {
            Alert.alert(
                'คำเตือน',
                'กรุณาให้แอพพลิเคชั่น TSR HR Mobile เข้าถึงการระบุตำแหน่ง',
                [
                    { text: 'Cancel', onPress: () => RNExitApp.exitApp(), style: 'cancel' },
                    { text: 'OK', onPress: () => Linking.openURL('app-settings:') },
                ],
                { cancelable: false }
            )
        }
    }

    async requestLocationPermission() {
        if (Platform.OS == 'ios') {
            this.watchID = Geolocation.watchPosition(position => {
                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            }, (error) => null,
                { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 10 },
            );
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    'title': 'Location Access Required',
                    'message': 'กรุณาให้แอพพลิเคชั่น TSR HR Mobile เข้าถึงการระบุตำแหน่ง'
                })

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.watchID = Geolocation.watchPosition(position => {
                        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                    }, (error) => null,
                        { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 10 },
                    );

                    Geolocation.getCurrentPosition(position => {
                        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                    })
                } else {
                    Alert.alert(
                        'คำเตือน',
                        'กรุณาให้แอพพลิเคชั่น TSR HR Mobile เข้าถึงการระบุตำแหน่ง',
                        [
                            { text: 'Cancel', onPress: () => RNExitApp.exitApp(), style: 'cancel' },
                            { text: 'OK', onPress: () => PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) },
                        ],
                        { cancelable: false }
                    )
                }
            } catch (err) {
                Alert.alert(
                    'คำเตือน',
                    'กรุณาให้แอพพลิเคชั่น TSR HR Mobile เข้าถึงการระบุตำแหน่ง',
                    [
                        { text: 'Cancel', onPress: () => RNExitApp.exitApp(), style: 'cancel' },
                        { text: 'OK', onPress: () => PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) },
                    ],
                    { cancelable: false }
                )
            }
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            //this.checkVersion()
        }
        this.setState({ appState: nextAppState });
    }

    // checkInDate() {
    //     let that = this
    //     try {
    //         StorageService.get(CHECK_TIME).then(obj => {
    //             if (obj !== null) {
    //                 let date = (JSON.parse(obj))
    //                 let now = moment(new Date()).format('L')
    //                 let chkIn = moment(date).format('LT')
    //                 if (moment(date).format('L') < now) {
    //                     StorageService.remove(CHECK_TIME)
    //                 } else {
    //                     that.setState({ checkInTime: chkIn })
    //                 }
    //             } else {
    //                 null
    //             }
    //         }).catch(function (error) {

    //         });
    //     } catch (error) {

    //     }
    // }

    // checkOutDate() {
    //     let that = this
    //     try {
    //         StorageService.get(CHECK_OUT).then(obj => {
    //             if (obj !== null) {
    //                 let date = (JSON.parse(obj))
    //                 let now = moment(new Date()).format('L')
    //                 let chkOut = moment(date).format('LT')
    //                 // return
    //                 if (moment(date).format('L') < now) {
    //                     StorageService.remove(CHECK_OUT)
    //                 } else {
    //                     that.setState({ checkOutTime: chkOut })
    //                 }
    //             } else {
    //                 null
    //             }
    //         }).catch(function (error) {

    //         });
    //     } catch (error) {

    //     }
    // }

    ComponentLeft = () => {
        return (
            <View>

            </View>
        );
    }

    ComponentCenter = () => {
        const props = this.props.reducer
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`ลงเวลาเข้า/ออกงาน`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View>

            </View>
        );
    }

    handleBack = () => {
        return true
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
        // AppState.removeEventListener('change', this._handleAppStateChange)
    }

    async componentDidMount() {
        //await this.checkVersion();
        if (Platform.OS == 'android') {
            this.checkLocationEnable()
        } else {
            this.requestLocationPermission()
        }
        // this.checkInDate()
        // this.checkOutDate()
        this.getCheckTimeInOut()

        const props = this.props.reducer
        const userInfo = props.userInfo

        this.props.navigation.addListener('focus', () => {
            const props = this.props.reducer
            const userInfo = props.userInfo
            // this.checkInDate()
            // this.checkOutDate()
            this.getCheckTimeInOut()
        })

        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
        AppState.addEventListener('change', this._handleAppStateChange)

    }

    render() {

        const props = this.props.reducer

        return (
            <View style={{ flex: 1, backgroundColor: primaryColor }}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                        marginTop: 15
                    }}
                    statusBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                    <View style={[styles.cruveContainer]}>
                        <View style={[styles.cruveView, { backgroundColor: primaryColor }]} />
                    </View>
                    <View style={[styles.imageContainer, { borderColor: 'white' }]}>
                        {/* <Icon name="user" color={primaryColor} size={60} /> */}
                        {
                            props.userInfo.empForWeb != null ?
                                <FastImage
                                    style={{ width: 92, height: 92, borderWidth: 1, borderRadius: 92, borderColor: 'white', alignItems: 'center', position: 'absolute', backgroundColor: 'white', justifyContent: 'center', marginLeft: -(DEVICE_WIDTH / 2) }}
                                    source={{
                                        // uri: item.SaleImage,
                                        uri: PICURL + props.userInfo.empForWeb + '.jpg',
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                :
                                <FastImage
                                    style={{ width: 92, height: 92, borderWidth: 1, borderRadius: 92, borderColor: 'white', alignItems: 'center', position: 'absolute', backgroundColor: 'white', justifyContent: 'center', marginLeft: -(DEVICE_WIDTH / 2) }}
                                    source={nophoto}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                        }
                    </View>
                    <Text style={[styles.bold, { fontSize: 30, color: primaryColor, width: '100%', textAlign: 'center' }]}>{`${props.userInfo.title}${props.userInfo.firstname} ${props.userInfo.lastname}`}</Text>
                    <Text style={[styles.bold, { fontSize: 24, color: primaryColor, width: '100%', textAlign: 'center' }]}>{`${props.userInfo.position}`}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={[styles.bodythai, { fontSize: 20, color: secondaryColor, width: '100%', textAlign: 'center' }]}>
                                {`${(this.state.checkInTime != null) ? 'เวลาเข้างานที่บันทึก' : ''}`}
                            </Text>
                            <Text style={[styles.bodyeng, { fontSize: 18, color: secondaryColor, width: '100%', textAlign: 'center' }]}>
                                {`${(this.state.checkInTime != null) ? moment(this.state.checkInTime).format('L') : ' '}`}
                            </Text>
                            <Text style={[styles.bodyeng, { fontSize: 20, color: secondaryColor, width: '100%', textAlign: 'center', marginBottom: 15 }]}>
                                {`${(this.state.checkInTime != null) ? moment(this.state.checkInTime).format('LT') : ' '}`}
                            </Text>
                            <TouchableOpacity disabled={props.userInfo.PosID == 1 ? true : false} style={[styles.buttonCheckSmall, styles.shadow, styles.center, { backgroundColor: 'white' }]}
                                onPress={
                                    () => {
                                        this.props.navigation.navigate('CheckIn')
                                    }
                                }>
                                <Text style={[styles.bodyeng, { fontSize: 22, color: props.userInfo.PosID == 1 ? grayColor : secondaryColor }]}>{`CHECK IN`}</Text>
                                <Text style={[styles.bodythai, { fontSize: 22, color: props.userInfo.PosID == 1 ? grayColor : secondaryColor }]}>{`ลงเวลาเข้างาน`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: 20 }} />
                        <View>
                            <Text style={[styles.bodythai, { fontSize: 20, color: darkColor, width: '100%', textAlign: 'center' }]}>
                                {`${(this.state.checkOutTime != null) ? 'เวลาออกงานที่บันทึก' : ''}`}
                            </Text>
                            <Text style={[styles.bodyeng, { fontSize: 18, color: darkColor, width: '100%', textAlign: 'center' }]}>
                                {`${(this.state.checkOutTime != null) ? moment(this.state.checkOutTime).format('L') : ' '}`}
                            </Text>
                            <Text style={[styles.bodyeng, { fontSize: 20, color: darkColor, width: '100%', textAlign: 'center', marginBottom: 15 }]}>
                                {`${(this.state.checkOutTime != null) ? moment(this.state.checkOutTime).format('LT') : ' '}`}
                            </Text>
                            <TouchableOpacity disabled={props.userInfo.PosID == 1 ? true : false} style={[styles.buttonCheckSmall, styles.shadow, styles.center, { backgroundColor: 'white' }]}
                                onPress={
                                    () => {
                                        this.props.navigation.navigate('CheckOut')
                                    }
                                }>
                                <Text style={[styles.bodyeng, { fontSize: 22, color: props.userInfo.PosID == 1 ? grayColor : darkColor }]}>{`CHECK OUT`}</Text>
                                <Text style={[styles.bodythai, { fontSize: 22, color: props.userInfo.PosID == 1 ? grayColor : darkColor }]}>{`ลงเวลาออกงาน`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    CheckTypeControll,
    indicatorControll
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectinoutScreen)