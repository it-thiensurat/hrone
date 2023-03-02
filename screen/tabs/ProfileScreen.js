import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    AppState,
    Platform,
    TextInput,
    ScrollView,
    BackHandler,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import VersionCheck from 'react-native-version-check'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modalbox'

import {
    TOKEN_KEY,
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    grayColor,
    API_KEY,
    BASEURL,
    GET_NAMETEL,
    SAVE_NICKNAME,
    SAVE_TEL,
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
import pencil from "../../img/pencil.png"

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

class ProfileScreen extends React.Component {

    state = {
        nickname: '',
        tel: '',
        pageid: 0,
        isOpen: false,
        appState: AppState.currentState
    }

    async getData() {

        let that = this
        await that.setState({ nickname: '' , tel: '' })
        const props = that.props
        const users = props.reducer.userInfo
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();

        formData.append('empid', users.empId);

        props.indicatorControll(true)
        Helper.post(BASEURL + GET_NAMETEL, formData, header, async (results) => {
            // alert(JSON.stringify(results))
            // return
            if (results.status == 'SUCCESS') {
                await that.setState({ nickname: results.data[0].Nickname , tel: results.data[0].Tel })
                await props.indicatorControll(false)
            } else {
                await props.indicatorControll(false)
                await that.setState({ nickname: '' , tel: '' })
            }
        })
    }

    async saveDataNickname() {

        let that = this
        const props = that.props
        const users = props.reducer.userInfo
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();

        formData.append('empid', users.empId);
        formData.append('nickname', that.state.nickname);

        props.indicatorControll(true)
        await Helper.post(BASEURL + SAVE_NICKNAME, formData, header, async (results) => {
            // alert(JSON.stringify(results))
            // return
            if (results.status == 'SUCCESS') {
                await props.indicatorControll(false)
                await Alert.alert(
                    'ข้อความ',
                    `${results.message}`,
                    [
                        {
                            text: 'OK', onPress: () => that.getData()
                        },
                    ],
                    { cancelable: false }
                )
            } else {
                await props.indicatorControll(false)
                await Alert.alert(
                    'คำเตือน',
                    `${results.message}`,
                    [
                        { text: 'OK', onPress: () => that.getData() },
                    ],
                    { cancelable: false }
                )
            }
        })
    }

    async saveDataTel() {

        let that = this
        const props = that.props
        const users = props.reducer.userInfo
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();

        formData.append('empid', users.empId);
        formData.append('tel', that.state.tel);

        props.indicatorControll(true)
        await Helper.post(BASEURL + SAVE_TEL, formData, header, async (results) => {
            // alert(JSON.stringify(results))
            // return
            if (results.status == 'SUCCESS') {
                await props.indicatorControll(false)
                await Alert.alert(
                    'ข้อความ',
                    `${results.message}`,
                    [
                        {
                            text: 'OK', onPress: () => that.getData()
                        },
                    ],
                    { cancelable: false }
                )
            } else {
                await props.indicatorControll(false)
                await Alert.alert(
                    'คำเตือน',
                    `${results.message}`,
                    [
                        { text: 'OK', onPress: () => that.getData() },
                    ],
                    { cancelable: false }
                )
            }
        })
    }

    _onClosed = () => {
        this.setState({ isOpen: false })
        this.getData()
    }

    onOpenModal = () => {
        this.setState({ isOpen: true })
    }

    ComponentLeft = () => {
        return (
            <View>
                {/* <TouchableOpacity style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center' }}
                    onPress={this.onOpenModal}>
                    <Icon name='arrow-left' size={28} color={secondaryColor} />
                </TouchableOpacity> */}
            </View>
        );
    }

    ComponentCenter = () => {
        const props = this.props.reducer
        return (
            <View style={[styles.center, { paddingLeft: 40 }]}>
                <Text style={[styles.bold, { color: primaryColor, fontSize: 26 }]}>{`ข้อมูลพนักงาน`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View>
                <TouchableOpacity style={{ width: 35, height: 35, alignItems: 'center', marginRight: 6 }}
                    onPress={
                        async () => {
                            // await messaging().unsubscribeFromTopic('LeadSup')
                            await StorageService.remove(TOKEN_KEY)
                            await StorageService.clear()
                            await this.props.navigation.replace('Login')
                        }
                    }>
                    <Icon name='sign-out-alt' size={28} color={darkColor} />
                    <Text style={[styles.bodythai, { color: darkColor, fontSize: 14 }]}>{`Logout`}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            //this.checkVersion()
        }
        this.setState({ appState: nextAppState });
    }

    handleBack = () => {
        return true
        // if (this.props.navigation.state.routeName == 'Profile') {
        //     return true
        // }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    async componentDidMount() {
        await this.getData()
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        AppState.addEventListener('change', this._handleAppStateChange)
    }

    render() {
        const props = this.props.reducer

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={{
                        backgroundColor: 'white',
                        elevation: 0,
                        shadowOpacity: 0,
                        marginTop: 15
                    }}
                    statusBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={{ alignItems: 'center', backgroundColor: primaryColor }}>
                    <View style={[styles.cruveContainer]}>
                        <View style={[styles.cruveView, { backgroundColor: 'white' }]} />
                    </View>
                    <View style={[styles.imageContainer, { borderColor: primaryColor }]}>
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
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={[styles.bold, { color: 'white', fontSize: 28 }]}>{`รหัส  ${props.userInfo.empId}`}</Text>
                    </View>

                </View>
                <ScrollView style={{ flex: 1, backgroundColor: primaryColor }}>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 4, borderBottomWidth: 0.5, borderBottomColor: 'white', marginBottom: 15 }}>
                            <Text style={[styles.bold, { color: 'white', fontSize: 24 }]}>{`ชื่อ - นามสกุล`}</Text>
                            <Text style={[styles.bodythai, { color: 'white', fontSize: 24, textAlignVertical: 'bottom' }]}>{`${props.userInfo.title}${props.userInfo.firstname} ${props.userInfo.lastname}`}</Text>
                        </View>
                        <View style={{ padding: 4, borderBottomWidth: 0.5, borderBottomColor: 'white', marginBottom: 15 }}>
                            <Text style={[styles.bold, { color: 'white', fontSize: 24 }]}>{`ตำแหน่ง`}</Text>
                            <Text style={[styles.bodythai, { color: 'white', fontSize: 24, textAlignVertical: 'bottom' }]}>{`${props.userInfo.position}`}</Text>
                        </View>
                        {
                            props.userInfo.branchName != null ?
                                <View style={{ padding: 4, borderBottomWidth: 0.5, borderBottomColor: 'white', marginBottom: 15 }}>
                                    <Text style={[styles.bold, { color: 'white', fontSize: 24 }]}>{`สาขา`}</Text>
                                    <Text style={[styles.bodythai, { color: 'white', fontSize: 24, textAlignVertical: 'bottom' }]}>{`${props.userInfo.branchName}`}</Text>
                                </View>
                                :
                                null
                        }
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 0.5, padding: 4, borderBottomWidth: 0.5, borderBottomColor: 'white', marginBottom: 25 }}>
                                <Text style={[styles.bold, { color: 'white', fontSize: 24 }]}>{`ชื่อเล่น`}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.bodythai, { flex: 0.8, color: 'white', fontSize: 26, textAlignVertical: 'bottom' }]}>{
                                        `${this.state.nickname != null ? this.state.nickname : ''}`
                                    }</Text>
                                    <TouchableOpacity style={{ flex: 0.2, width: 35, height: 35, alignSelf: 'center', alignItems: 'flex-end' }}
                                        onPress={() =>
                                            this.setState({ pageid: 1, isOpen: true })
                                        }>
                                        <Image source={pencil}
                                            style={{ resizeMode: 'contain', width: 28, height: 28 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 0.5, marginLeft: 8, padding: 4, borderBottomWidth: 0.5, borderBottomColor: 'white', marginBottom: 25 }}>
                                <Text style={[styles.bold, { color: 'white', fontSize: 24 }]}>{`เบอร์โทรภายใน`}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[styles.bodythai, { flex: 0.8, color: 'white', fontSize: 26, textAlignVertical: 'bottom' }]}>{
                                        `${this.state.tel != null ? this.state.tel : ''}`
                                    }</Text>
                                    <TouchableOpacity style={{ flex: 0.2, width: 35, height: 35, alignSelf: 'center', alignItems: 'flex-end' }}
                                        onPress={() =>
                                            this.setState({ pageid: 2, isOpen: true })
                                        }>
                                        <Image source={pencil}
                                            style={{ resizeMode: 'contain', width: 28, height: 28 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Modal
                        style={{ margin: 0, height: DEVICE_HEIGHT / 2, borderRadius: 14 }}
                        position={"bottom"}
                        swipeToClose={false}
                        onClosed={this._onClosed}
                        isOpen={this.state.isOpen}
                        backdropPressToClose={true}
                        animationDuration={400} >
                        <View style={{ height: DEVICE_HEIGHT / 2 }}>
                            <View style={{ flexDirection: 'row', height: 50, justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity style={{ left: 12, alignSelf: 'center' }}
                                    onPress={
                                        () => this._onClosed()
                                    }>
                                    <Icon style={{ alignContent: 'center', alignSelf: 'center' }} name={`times`} color={darkColor} size={32} />
                                </TouchableOpacity>
                                <View style={{ alignSelf: 'center', right: 5, }}></View>
                            </View>
                            <View style={{ flex: 1 }}>
                                {
                                    (this.state.pageid == 1) ?
                                        <View>
                                            <View style={{ padding: 4, width: DEVICE_WIDTH / 1.3, borderBottomWidth: 0.5, borderBottomColor: primaryColor, alignSelf: 'center' }}>
                                                <Text style={[styles.bold, { color: primaryColor, fontSize: 26 }]}>{`ชื่อเล่น`}</Text>
                                                <TextInput style={[styles.bodythai, styles.inputText]}
                                                    ref={(input) => { this.nickname = input; }}
                                                    placeholder="ตัวอย่าง บอย"
                                                    returnKeyType='done'
                                                    onBlur={false}
                                                    autoCapitalize={false}
                                                    value={this.state.nickname}
                                                    // onSubmitEditing={() => this.onLogin()}
                                                    onChangeText={(text) => this.setState({ nickname: text })} />
                                            </View>
                                            <TouchableOpacity style={{ marginTop: 65, height: 50, width: DEVICE_WIDTH / 2, backgroundColor: secondaryColor, borderRadius: 26, alignSelf: 'center', justifyContent: 'center' }}
                                                onPress={
                                                    async () => {
                                                        await this.setState({ isOpen: false })
                                                        await this.saveDataNickname()
                                                    }
                                                }>
                                                <Text style={[{ color: 'white', fontSize: 26, alignSelf: 'center' }, styles.bold]}>{`บันทึกข้อมูล`}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        : (this.state.pageid == 2) ?
                                            <View>
                                                <View style={{ padding: 4, width: DEVICE_WIDTH / 1.3, borderBottomWidth: 0.5, borderBottomColor: primaryColor, alignSelf: 'center' }}>
                                                    <Text style={[styles.bold, { color: primaryColor, fontSize: 26 }]}>{`เบอร์โทรภายใน`}</Text>
                                                    <TextInput style={[styles.bodythai, styles.inputText]}
                                                        ref={(input) => { this.tel = input; }}
                                                        placeholder="ตัวอย่าง 5555"
                                                        keyboardType='number-pad'
                                                        returnKeyType='done'
                                                        onBlur={false}
                                                        autoCapitalize={false}
                                                        value={this.state.tel}
                                                        // onSubmitEditing={() => this.onLogin()}
                                                        onChangeText={(text) => this.setState({ tel: text })} />
                                                </View>
                                                <TouchableOpacity style={{ marginTop: 65, height: 50, width: DEVICE_WIDTH / 2, backgroundColor: secondaryColor, borderRadius: 26, alignSelf: 'center', justifyContent: 'center' }}
                                                    onPress={
                                                        async () => {
                                                            await this.setState({ isOpen: false })
                                                            await this.saveDataTel()
                                                        }
                                                    }>
                                                    <Text style={[{ color: 'white', fontSize: 26, alignSelf: 'center' }, styles.bold]}>{`บันทึกข้อมูล`}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            null
                                }
                            </View>
                        </View>
                    </Modal>
                    {/* <TouchableOpacity style={{ height: 50, width: DEVICE_WIDTH - 100, backgroundColor: darkColor, borderRadius: 26, alignSelf: 'center', justifyContent: 'center' }}
                        onPress={
                            async () => {
                                // await messaging().unsubscribeFromTopic('LeadSup')
                                await StorageService.remove(TOKEN_KEY)
                                await StorageService.clear()
                                await this.props.navigation.replace('Login')
                            }
                        }>
                        <Text style={[{ color: 'white', fontSize: 26, alignSelf: 'center' }, styles.bold]}>{`ออกจากระบบ`}</Text>
                    </TouchableOpacity> */}
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 0, padding: 4, alignSelf: 'flex-end' }}>
                    <Text style={{ fontSize: 12, color: 'white' }}>{`version ${VersionCheck.getCurrentVersion()}`}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)