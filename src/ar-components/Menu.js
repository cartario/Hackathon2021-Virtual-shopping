import React from 'react';
import { ViroNode, ViroButton } from 'react-viro';
import {JUMP_TYPES, NAVIGATOR_TYPES} from '../utils';
import {DrinksScene} from '../scenes'

const buttons = [
  {
    active: require('../res/btn/menu/orders.png'),
    hover: require('../res/btn/menu/orders-hover.png'),
    position: [-3, 1, -0.5],
    rotation: [0,95,0],
    jumpTo: JUMP_TYPES.drinks
  },
  {
    active: require('../res/btn/menu/info.png'),
    hover: require('../res/btn/menu/info-hover.png'),
    position: [-3, 0.5, -0.5],
    rotation: [0,85,0],
    jumpTo: JUMP_TYPES.drinks
  },
  {
    active: require('../res/btn/menu/exit.png'),
    hover: require('../res/btn/menu/exit-hover.png'),
    position: [-3, 0, -0.5],
    rotation: [0,75,0],
    jumpTo: JUMP_TYPES.exit
  },
]

export default function Menu({ sceneNavigator}) {

  const handleMenu = (jumpType) => {
    switch(jumpType){
      case JUMP_TYPES.drinks:
        return sceneNavigator.jump({ scene:  DrinksScene})
      case JUMP_TYPES.exit:
        return sceneNavigator.viroAppProps.navigateTo(NAVIGATOR_TYPES.login)
    }    
  }

  return (
    <ViroNode>
      {buttons.map((button, i)=><ViroButton
        key={i}
        source={button.active}
        onClick={()=>handleMenu(button.jumpTo)}
        gazeSource={button.hover}
        position={[button.position[0], button.position[1], button.position[2]]}
        rotation={[button.rotation[0], button.rotation[1], button.rotation[2]]}
        scale={[1.3, 1.3, 1.3]}
        height={0.25}
        width={1.3925}
      />)}
    </ViroNode>
  );
}
