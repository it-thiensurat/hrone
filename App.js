/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Platform,
  YellowBox,
  LogBox,
  ActivityIndicator,
} from 'react-native';
console.disableYellowBox = true
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { localNotificationService } from './utils/LocalNotificaionService'
import { Provider as PaperProvider } from 'react-native-paper'

import styles from './style/style'

import {
  secondaryColor
} from './utils/contants'

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity,
} from 'react-native-global-props'

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

const customTextProps = {
  style: {
    fontSize: 22,
    fontFamily: Platform.OS == 'android' ? 'DBYord' : 'DB Yord X',
  }
};

setCustomTextInput(customTextProps);
setCustomText(customTextProps);

const Stack = createStackNavigator();

import SplashScreen from './screen/SplashScreen'
import Main from './screen/MainScreen'
import Login from './screen/LoginScreen'
import CheckIn from './screen/CheckinScreen'
import CheckOut from './screen/CheckoutScreen'
//  import Webview from './screen/WebViewScreen'
//  import Commission from './screen/CommissionScreen'
//  import CommissionWebView from './screen/CommissionWebView'

function MyStack() {
  return (
    <Stack.Navigator
      // headerMode='none'
      screenOptions={{
        headerShown: false
      }}
      initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="CheckIn" component={CheckIn} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      {/* <Stack.Screen name="Webview" component={Webview} /> */}
      {/* <Stack.Screen name="Commission" component={Commission} /> */}
      {/* <Stack.Screen name="CommissionWebView" component={CommissionWebView} /> */}
    </Stack.Navigator>
  );
}

require('moment/locale/th.js');
class App extends React.Component {

  render() {
    const props = this.props.reducer
    return (
      <NavigationContainer>
        <PaperProvider>
          <MyStack />
        </PaperProvider>
        {
          props.indicator ?
            <View style={[styles.loadingIndicator]}>
              <ActivityIndicator size='large' color={secondaryColor} />
            </View>
            :
            null
        }
      </NavigationContainer>
    )
  }
};

const mapStateToProps = (state) => ({
  reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)