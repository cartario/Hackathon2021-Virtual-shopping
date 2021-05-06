import React from 'react';
import {  
  Text,
  View,
  StyleSheet,  
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

import InitialARScene from './js/HelloWorldSceneAR';
import InitialVRScene from './js/HelloWorldScene'

const NAVIGATOR_TYPES = {  
  screen1: 'AR',
  screen2: 'VR'
}

const WelcomeScreen = ({onSelectScreen}) => { 

  return (
  <View style={localStyles.outer} >
    <View style={localStyles.inner} >

      <Text style={localStyles.titleText}>
        Выберите режим:
      </Text>

      <TouchableHighlight style={localStyles.buttons}
        onPress={()=>onSelectScreen(NAVIGATOR_TYPES.screen1)}
        underlayColor={'#68a0ff'} >

        <Text style={localStyles.buttonText}>По рецепту</Text>
      </TouchableHighlight>

      <TouchableHighlight style={localStyles.buttons}        
        onPress={()=>onSelectScreen(NAVIGATOR_TYPES.screen2)}
        underlayColor={'#68a0ff'} >

        <Text style={localStyles.buttonText}>Свободное посещение</Text>
      </TouchableHighlight>
    </View>
  </View>)
}

export default function App () {
  const [navigatorType, setNavigatorType] = React.useState(null)

  const _navigateTo = (navigatorType) => {
    setNavigatorType(navigatorType)
  }

  const _getHome = () => {
    setNavigatorType(null)
  }

  switch(navigatorType){
    case NAVIGATOR_TYPES.screen1:
      return <ViroARSceneNavigator
      initialScene={{scene: InitialARScene}} />
    case NAVIGATOR_TYPES.screen2:
      return <ViroVRSceneNavigator
      initialScene={{scene: InitialVRScene}} />
    default:
      return (<WelcomeScreen onSelectScreen={_navigateTo}/>)
  }  
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: '80%',
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

