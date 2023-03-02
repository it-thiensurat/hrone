import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native'
import {
    primaryColor,
    secondaryColor,
    transparentGray
} from '../utils/contants'

const COMPONENT_HIGHT = 50;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    bodythai: {
        fontFamily: 'DBMed'
    },
    bodyeng: {
        fontFamily: 'NotoSansThai-Regular'
    },
    inputText: {
        fontSize: 28,
        color : primaryColor,
        textAlignVertical: 'bottom'
    },
    inputWithIcon: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 40,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    inputWithCalendar: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    inputWithButton: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        // width: DEVICE_WIDTH - 70,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    input: {
        paddingLeft: 15,
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    inputSmall: {
        paddingLeft: 15,
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH / 2,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    inputVerySmall: {
        paddingLeft: 15,
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: 120,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    inputAmount: {
        paddingLeft: 15,
        alignItems: 'center',
        height: COMPONENT_HIGHT / 1.3,
        width: 65,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    inputContainer: {
        width: DEVICE_WIDTH - 80,
        height: COMPONENT_HIGHT - 5,
        backgroundColor: 'transparent',
    },
    inputTime: {
        paddingLeft: 15,
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: 165,
        backgroundColor: 'white',
        borderRadius: COMPONENT_HIGHT / 2
    },
    mainButton: {
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 40,
        backgroundColor: secondaryColor,
        borderRadius: COMPONENT_HIGHT / 2
    },
    secondaryButton: {
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 20,
        backgroundColor: primaryColor,
        borderRadius: COMPONENT_HIGHT / 2
    },
    secondaryButtonSmall: {
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH / 2,
        backgroundColor: primaryColor,
        borderRadius: COMPONENT_HIGHT / 2
    },
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    marginBetweenVertical: {
        height: 10
    },
    bold: {
        fontFamily: Platform.OS == 'android' ? 'DBMed' : 'DB Helvethaica X'
    },
    positionBottom: {
        bottom: 0,
        position: 'absolute'
    },
    customTabContainner: {
        position: 'absolute',
        top: -20,
        bottom: 0,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomTab: {
        top: 5,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomTabCircle: {
        top: -14,
        width: 65,
        height: 65,
        borderRadius: 40,
        borderWidth: 0.8,
        borderColor: transparentGray,
        position: 'absolute',
        backgroundColor: 'white',
    },
    bottomTabCenter: {
        width: 56,
        height: 56,
        borderRadius: 40,
        backgroundColor: transparentGray
    },
    cruveContainer: {
        alignSelf: 'center',
        width: DEVICE_WIDTH,
        overflow: 'hidden',
        height: DEVICE_HIGHT / 4
    },
    cruveView: {
        borderRadius: DEVICE_WIDTH,
        width: DEVICE_WIDTH * 2,
        height: DEVICE_WIDTH * 2,
        marginLeft: -(DEVICE_WIDTH / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: primaryColor
    },
    imageCircle: {
        width: 155,
        height: 155,
        borderRadius: 100,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderWidth: 4,
        borderRadius: 100,
        borderColor: 'white',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        justifyContent: 'center',
        // top: (DEVICE_HIGHT / 4) - 100,
        marginLeft: -(DEVICE_WIDTH / 2),
    },
    buttonCheck: {
        marginTop: 20,
        borderWidth: 8,
        borderColor: 'white',
        width: DEVICE_WIDTH - 80,
        height: DEVICE_WIDTH - 80,
        borderRadius: DEVICE_WIDTH / 2,
        backgroundColor: secondaryColor,
        // top: (DEVICE_HIGHT / 4) - 100
    },
    buttonCheckSmall: {
        borderWidth: 4,
        borderColor: 'white',
        width: DEVICE_WIDTH - 210,
        height: DEVICE_WIDTH - 210,
        borderRadius: DEVICE_WIDTH / 2,
        backgroundColor: secondaryColor,
        // top: (DEVICE_HIGHT / 4) - 100
    },
    loadingIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
})

export default styles;
