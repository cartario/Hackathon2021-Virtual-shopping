import React from 'react';
import {StyleSheet} from 'react-native';
import InitialARScene from '../../js/HelloWorldSceneAR';

import {  
  ViroARScene,
  ViroText,
  ViroAmbientLight,
  ViroFlexView,
  ViroMaterials
} from 'react-viro';

import {NAVIGATOR_TYPES} from '../utils'

export default function Screen1 ({sceneNavigator}) {
  const [count, setCount] = React.useState(3);

  const handleClick = () => {
    // sceneNavigator.jump({scene: InitialARScene})
    // sceneNavigator.viroAppProps.goBack()

    sceneNavigator.viroAppProps.navigateTo(NAVIGATOR_TYPES.login)
    // setCount(()=>{
    //   return count + 1;
    // })
  }

  return (
    <ViroARScene>  
      <ViroAmbientLight color="#ffffff" />    
      <ViroText 
      onClick={handleClick}      
      text="На главную" width={2} height={2} position={[0, -3, -7]} style={styles.helloWorldTextStyle} />

      <ViroFlexView
          style={styles.titleContainer}
          position={[0, 1, -7]}
          rotation={[0, 0, 0]}
          height={6}
          width={12}
          // onDrag={() => {}}
          materials={['screen2']}
        >
          
        </ViroFlexView>
    </ViroARScene>   
  );
}

ViroMaterials.createMaterials({
  screen2: {
    diffuseTexture: require('../../js/res/screen2.jpeg'),
  },  
});

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
  titleContainer: {
    flexDirection: 'column',
    padding: 0.2,
    backgroundColor: '#ffffffdd',
  },
});
