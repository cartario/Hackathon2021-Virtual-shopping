import React from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroSpinner,
  ViroFlexView,
  Viro360Image,
  ViroButton,
  ViroSphere,
} from 'react-viro';

import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../redux/cartReducer';
import useHttp from '../hooks/useHttp';
import {SweetScene, GroceryScene} from './';
import {Menu} from '../ar-components';

const TitleSection = ({ text }) => {

  return (
    <ViroFlexView
      style={styles.titleContainer}
      position={[0, 4, -7.5]}
      rotation={[30, 0, 0]}
      width={4}
      height={1}      
    >
      <ViroText style={styles.prodTitleText} text={text} width={4} height={0.5} />
      
    </ViroFlexView>
  );
};

const NextSectionLeft = ({ next }) => {
  return (
    <ViroButton
      source={require('../res/btn/bakaleya/active.png')}
      onClick={next}
      gazeSource={require('../res/btn/bakaleya/hover.png')}
      position={[-5, 4.5, -7]}
      rotation={[40, 20, 0]}
      scale={[1, 1, 1]}
      width={5.57}
      height={1}
    />
  );
};

const NextSectionRight = ({ next }) => {
  return (
    <ViroButton
      source={require('../res/btn/sweet/active.png')}
      onClick={next}
      gazeSource={require('../res/btn/sweet/hover.png')}
      position={[5, 4.5, -7]}
      rotation={[40, -20, 0]}
      scale={[1, 1, 1]}
      width={5.57}
      height={1}
    />
  );
};

const Shelve = ({ next }) => {
  return (
    <ViroNode position={[-1, -0.5, -0.5]} dragType="FixedToWorld">
      <ViroSpotLight
        innerAngle={5}
        outerAngle={45}
        direction={[0, -1, -0.2]}
        position={[0, 3, 0]}
        color="#ffffff"
        castsShadow={true}
        influenceBitMask={4}
        shadowMapSize={2048}
        shadowNearZ={2}
        shadowFarZ={5}
        shadowOpacity={0.7}
      />

      <Viro3DObject
        materials={['shelf']}
        source={require('../res/shelf/model.obj')}
        position={[2.5, -1.65, -2]}
        rotation={[0, 90, 0]}
        scale={[0.06, 0.06, 0.06]}
        type="OBJ"
        lightReceivingBitMask={5}
        shadowCastingBitMask={4}
      />

      {/* <Viro3DObject
        onLoadEnd={next}
        materials={['tabasco']}
        source={require('../res/tabasco/tabasco.obj')}
        position={[2, -0.5, -2]}
        scale={[0.01, 0.01, 0.01]}
        type="OBJ"
        lightReceivingBitMask={5}
        shadowCastingBitMask={4}
        onDrag={() => {}}
      /> */}

      {/* <Viro3DObject
          materials={['milk']}
          source={require('../res/milk/milk.obj')}
          position={[2.2, 0.1, -1.6]}
          scale={[0.01, 0.01, 0.01]}
          type="OBJ"
          lightReceivingBitMask={5}
          shadowCastingBitMask={4}
          onDrag={() => {}}
        /> */}
    </ViroNode>
  );
};



export default function VegetableScene({ sceneNavigator }) {
  // sceneNavigator.viroAppProps.navigateTo(NAVIGATOR_TYPES.arProductInfo)

  const [spinner, setSpinner] = React.useState(true);

  const state = useSelector(({cart})=>cart);
  const dispatch = useDispatch();

  const { request } = useHttp();

  const handleDrag = () => {
    // sceneNavigator.jump({ scene: SweetScene })
    const obj = {
      id: 1,
      price: 12,
    };
    dispatch(addToCart(obj));
  }  

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroSpinner visible={spinner} type="Light" position={[0, 0, -2.5]} />      

      <Viro360Image
        format="RGBA8"
        rotation={[0, 90, 0]}
        animation={{ loop: false }}
        source={require('../res/scenes/vegetables.jpeg')}
        onLoadEnd={() => setSpinner(false)}
      />

      <Menu sceneNavigator={sceneNavigator}/>

      <TitleSection text={'Овощной отдел'}/>

      <NextSectionLeft next={() => sceneNavigator.jump({ scene: GroceryScene })} />

      <NextSectionRight next={() => sceneNavigator.jump({ scene: SweetScene })} />

      <Shelve next={() => setSpinner(false)} />

      <ViroBox
        position={[-1.5, -2, -3]}
        rotation={[0, 20, 0]}
        scale={[1, 1, 1]}
        materials={['vtb']}
        onDrag={handleDrag}
      />

      
    </ViroARScene>
  );
}

ViroMaterials.createMaterials({
  vtb: {
    diffuseTexture: require('../res/207.jpeg'),
  },
  tabasco: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    cullMode: 'None',
    diffuseTexture: require('../res/tabasco/texture.jpg'),
  },
  shelf: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    cullMode: 'None',
    diffuseTexture: require('../res/shelf/texture.jpg'),
  },
});

var styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    padding: 0.2,
    backgroundColor: '#ffffffdd',
  },
  prodTitleText: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    color: 'black',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
