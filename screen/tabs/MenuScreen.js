import React from 'react'
import {
    View,
    Text,
    Platform,
    Alert,
    BackHandler,
    TouchableOpacity,
    Linking,
    Dimensions,
    ScrollView,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import FastImage from 'react-native-fast-image';

import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    API_KEY,
    BASEURL,
    WEBURL,
    COMPCODE,
    EMPID,
    PAGEID,
    VERIFY,
    LEAVE01,
    LEAVE03,
    LEAVE05,
    OT01,
    OT02,
    OT04,
    OT05,
    OT06,
    OT07,
    OTHER01,
    OTHER02,
    TRAINING_HISTORY,
    KMURL,
    PICURL,
    TOPICURL,
    UATPIC,
    COMMDEBTURL,
    PMSURL,
    PMSID,
    PMSPASSWORD,
    GETMENU
} from '../../utils/contants'

import {
    tokenControll,
    userInfoControll,
    indicatorControll,
    CheckTypeControll
} from '../../actions'

import styles from '../../style/style'

import Helper from '../../utils/Helper'
import StorageService from '../../utils/StorageServies'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class MenuScreen extends React.Component {

    state = {
        menulist: []
    }

    getMenu(value) {

        let that = this
        that.setState({ menulist: [] })
        const props = that.props
        const users = props.reducer.userInfo
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();

        formData.append('topicId', value);
        formData.append('companyid', users.companyId);
        formData.append('empforweb', users.empForWeb);
        formData.append('empid', users.empId);

        props.indicatorControll(true)
        Helper.post(BASEURL + GETMENU, formData, header, (results) => {
            // alert(JSON.stringify(results))
            // return
            if (results.status == 'SUCCESS') {
                that.setState({ menulist: results.data })
                props.indicatorControll(false)
            } else {
                props.indicatorControll(false)
                that.setState({ menulist: [] })
                Alert.alert(
                    'คำเตือน',
                    `${results.message}`,
                    [
                        { text: 'OK', onPress: () => null },
                    ],
                    { cancelable: false }
                )
            }
        })
    }

    // _renderItem({ item, index }) {
    //     return (
    //         <View style={{ alignItems: 'center', paddingLeft: 13.5 }}>
    //             <TouchableOpacity style={{ width: 80, height: 80, borderStyle: "solid", borderWidth: 1, marginBottom: 10, alignItems: 'center', borderRadius: 60, padding: 20, marginTop: 16 }}
    //                 onPress={() => {
    //                     this.getMenu;
    //                 }}>
    //                 <FastImage
    //                     style={{ width: 80, height: 80, borderRadius: 92, borderColor: 'white', alignItems: 'center', position: 'absolute', backgroundColor: 'white', justifyContent: 'center', marginLeft: -(DEVICE_WIDTH / 2) }}
    //                     source={{
    //                         uri: item.PIC,
    //                         priority: FastImage.priority.normal,
    //                     }}
    //                     resizeMode={FastImage.resizeMode.cover}
    //                 />
    //             </TouchableOpacity>
    //             <Text style={[styles.bodyeng, { fontSize: 12, color: 'white', textAlign: "left", alignSelf: 'center' }]}>{item.Topic_name}</Text>
    //         </View>
    //     );
    // }

    _renderItem2({ item, index }) {
        let that = this
        return (
            <View style={{ alignItems: 'center', padding: 6 }}>
                <TouchableOpacity style={{ width: 90, height: 90, backgroundColor: grayColor, borderStyle: "solid", borderColor: grayColor, borderWidth: 1, marginBottom: 10, alignItems: 'center', borderRadius: 15, padding: 20, marginTop: 16 }}
                    onPress={
                        () => {
                            let uri = ''
                            if (item.Menu_ID == '1') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + LEAVE01 + VERIFY
                            } else if (item.Menu_ID == '2') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + OT02 + VERIFY
                            } else if (item.Menu_ID == '3') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + LEAVE03 + VERIFY
                            } else if (item.Menu_ID == '4') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + OTHER02 + VERIFY
                            } else if (item.Menu_ID == '5') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + OT01 + VERIFY
                            } else if (item.Menu_ID == '6') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + OT04 + VERIFY
                            } else if (item.Menu_ID == '7') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + OT05 + VERIFY
                            } else if (item.Menu_ID == '8') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + LEAVE05 + VERIFY
                            } else if (item.Menu_ID == '9') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + OT07 + VERIFY
                            } else if (item.Menu_ID == '10') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + OT06 + VERIFY
                            } else if (item.Menu_ID == '12') {
                                uri = WEBURL + COMPCODE + item.companyid + EMPID + item.empforweb + PAGEID + OTHER01 + VERIFY
                            } else if (item.Menu_ID == '13') {
                                uri = COMMDEBTURL + item.empid
                            } else if (item.Menu_ID == '14') {
                                uri = PMSURL + PMSID + item.empid + PMSPASSWORD + 'PMSONMOBILE'
                            } else {
                                uri = item.Link
                            }
                            
                            { uri != null ? Linking.openURL(uri) : null }
                        }
                    }>
                    <FastImage
                        style={{ width: 85, height: 85, borderRadius: 10, borderColor: 'white', alignItems: 'center', position: 'absolute', justifyContent: 'center', marginLeft: -(DEVICE_WIDTH / 2) }}
                        source={{
                            uri: item.Pic,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    ComponentLeft = () => {
        return (
            <View>
                {/* <TouchableOpacity style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => alert(JSON.stringify(users))}>
                    <Icon name='arrow-left' size={28} color={secondaryColor} />
                </TouchableOpacity> */}
            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: 'white', fontSize: 28 }]}>{`เมนู`}</Text>
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
        // if (this.props.navigation.state.routeName == 'Profile') {
        //     return true
        // }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.getMenu("1");
        });
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        let that = this
        const props = that.props
        const users = props.reducer.userInfo
        const topiclist = users.TopicList
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
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: primaryColor }}>
                    {/* <Carousel
                        loop
                        width={DEVICE_WIDTH}
                        height={DEVICE_WIDTH / 2}
                        autoPlay={true}
                        data={this.state.ddata}
                        scrollAnimationDuration={1000}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={this._renderItem}
                    /> */}
                    <View style={{ width: DEVICE_WIDTH, borderTopStartRadius: 20, backgroundColor: grayColor, borderLeftColor: secondaryColor, borderLeftWidth: 6.5 }}>
                        <Text style={[styles.bold, { fontSize: 24, backgroundColor: 'transparent', borderTopRightRadius: 20, borderBottomRightRadius: 20, color: primaryColor, alignSelf: 'flex-start', paddingLeft: 14, marginTop: 5 }]}>เมนูหลัก</Text>
                    </View>
                    <View style={{ width: DEVICE_WIDTH, borderWidth: 1.5, borderColor: secondaryColor }} />
                    <View style={{ flex: 0.5, flexDirection: 'row', flexWrap: "wrap", width: DEVICE_WIDTH, backgroundColor: primaryColor, alignSelf: 'flex-start' }}>
                        {/* <FlatList
                            numColumns={4}
                            columnWrapperStyle={{ flex: 1, justifyContent: "space-around", alignSelf: 'flex-start' }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={topiclist}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => item.seq}
                        /> */}
                        {/* <View style={{ alignItems: 'center', paddingLeft: 13.5 }}>
                            <TouchableOpacity style={{ width: 80, height: 80, borderStyle: "solid", borderWidth: 1, marginBottom: 10, alignItems: 'center', borderRadius: 60, padding: 20, marginTop: 16 }}
                                onPress={() => {
                                    this.getMenu('2');
                                }}>
                                <FastImage
                                    style={{ width: 80, height: 80, borderRadius: 92, borderColor: 'white', alignItems: 'center', position: 'absolute', backgroundColor: 'white', justifyContent: 'center', marginLeft: -(DEVICE_WIDTH / 2) }}
                                    source={{
                                        uri: 'https://uat.thiensurat.co.th//API/Mobile/hrone/picture/topic/Leave.jpg',
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </TouchableOpacity>
                            <Text style={[styles.bodyeng, { fontSize: 12, color: 'white', textAlign: "left", alignSelf: 'center' }]}>{'การลา'}</Text>
                        </View> */}
                        {
                            topiclist.map((v, i) => {
                                return (
                                    <View key={i} style={{ alignItems: 'center', paddingLeft: 13.5 }}>
                                        <TouchableOpacity style={{ width: 80, height: 80, borderStyle: "solid", borderWidth: 1, marginBottom: 10, alignItems: 'center', borderRadius: 60, padding: 20, marginTop: 16 }}
                                            onPress={() => {
                                                this.getMenu(v.Topic_ID);
                                            }}>
                                            <FastImage
                                                style={{ width: 80, height: 80, borderRadius: 92, borderColor: 'white', alignItems: 'center', position: 'absolute', backgroundColor: 'white', justifyContent: 'center', marginLeft: -(DEVICE_WIDTH / 2) }}
                                                source={{
                                                    uri: v.PIC,
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                        </TouchableOpacity>
                                        <Text style={[styles.bodyeng, { fontSize: 12, color: 'white', textAlign: "left", alignSelf: 'center' }]}>{v.Topic_name}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={{ width: DEVICE_WIDTH, borderTopStartRadius: 20, backgroundColor: grayColor, borderLeftColor: darkColor, borderLeftWidth: 6.5 }}>
                        <Text style={[styles.bold, { fontSize: 24, backgroundColor: 'transparent', borderTopRightRadius: 20, borderBottomRightRadius: 20, color: primaryColor, alignSelf: 'flex-start', paddingLeft: 14, marginTop: 5 }]}>เมนูย่อย</Text>
                    </View>
                    <View style={{ width: DEVICE_WIDTH, borderWidth: 1.5, borderColor: darkColor }} />
                    <View style={{ flex: 0.65, backgroundColor: primaryColor, alignSelf: 'flex-start' }}>
                        <FlatList
                            numColumns={4}
                            columnWrapperStyle={{ flex: 1, justifyContent: "space-around", alignSelf: 'flex-start' }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={that.state.menulist}
                            renderItem={this._renderItem2}
                            keyExtractor={(item, index) => item.seq}
                        />
                    </View>
                    {/* <View style={{ flex: 1, alignItems: 'center', backgroundColor: primaryColor }}>
                        <View style={{ padding: 4, marginBottom: 5 }}>
                            <Text style={[styles.bodythai, { color: 'white', fontSize: 24 }]}>{`ข่าวประชาสัมพันธ์`}</Text>
                        </View>
                        <Carousel
                            data={this.state.bdata}
                            renderItem={this._renderItem3}
                            sliderWidth={DEVICE_WIDTH}
                            itemWidth={DEVICE_WIDTH - 55}
                            inactiveSlideScale={0.90}
                            inactiveSlideOpacity={0.8}
                            style={{ alignItems: 'center' }}
                        />
                    </View> */}
                </View>
            </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)