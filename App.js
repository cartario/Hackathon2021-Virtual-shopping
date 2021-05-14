import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';


import {Provider} from 'react-redux'
import store from './src/redux'
import {NAVIGATOR_TYPES} from './src/utils'

import InitialARScene from './js/HelloWorldSceneAR';
import ToyScene from './src/screens/ar-screen1';
import HelloWorldSceneAR from './src/screens/HelloWorldSceneAR'

import LoginScreen from './src/screens/Login';

// const NAVIGATOR_TYPES = {
//   screen1: 'AR',
//   screen2: 'VR',
//   login: 'login',
// };

const WelcomeScreen = ({ navigateTo }) => {
  return (
    <View style={localStyles.outer}>
      <View style={localStyles.inner}>
        <Text style={localStyles.titleText}>Выберите режим:</Text>

        <TouchableHighlight
          style={localStyles.buttons}
          onPress={() => navigateTo(NAVIGATOR_TYPES.screen1)}
          underlayColor={'#68a0ff'}
        >
          <Text style={localStyles.buttonText}>По рецепту</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={localStyles.buttons}
          onPress={() => navigateTo(NAVIGATOR_TYPES.screen2)}
          underlayColor={'#68a0ff'}
        >
          <Text style={localStyles.buttonText}>Свободное посещение</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={localStyles.buttons}
          onPress={() => navigateTo(NAVIGATOR_TYPES.login)}
          underlayColor={'#68a0ff'}
        >
          <Text style={localStyles.buttonText}>Зарегистрироваться</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

 function App() {
  const [navigatorType, setNavigatorType] = React.useState(null);

  const _navigateTo = (navigatorType) => {
    setNavigatorType(navigatorType);
  };

  const _getHome = () => {
    setNavigatorType(null);
  };

  switch (navigatorType) {
    case NAVIGATOR_TYPES.screen1:
      return <ViroARSceneNavigator initialScene={{ scene: HelloWorldSceneAR }} viroAppProps={{navigateTo: _navigateTo}}/>;
    case NAVIGATOR_TYPES.screen2:
      return <ViroARSceneNavigator initialScene={{ scene: ToyScene }} viroAppProps={{navigateTo: _navigateTo}}/>;
    case NAVIGATOR_TYPES.login:
      return <LoginScreen goBack={_getHome}/>;
    default:
      return <WelcomeScreen navigateTo={_navigateTo} />;
  }
}

export default function ReduxApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  buttons: {
    height: 80,
    width: '80%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
