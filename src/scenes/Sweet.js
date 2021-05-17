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
} from 'react-viro';

import useHttp from '../hooks/useHttp';
import { HelloWorldSceneAR, ProductInfoScreen } from '../screens';
import {DrinksScene, VegetablesScene} from '../scenes'

import { NAVIGATOR_TYPES, fireBaseAdapter } from '../utils';

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
      source={require('../res/btn/vegetables/active.png')}
      onClick={next}
      gazeSource={require('../res/btn/vegetables/hover.png')}
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
      source={require('../res/btn/drinks/active.png')}
      onClick={next}
      gazeSource={require('../res/btn/drinks/hover.png')}
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

export default function SweetScene({ sceneNavigator }) {
  // sceneNavigator.viroAppProps.navigateTo(NAVIGATOR_TYPES.arProductInfo)

  const [spinner, setSpinner] = React.useState(true);

  const [productInfo, setProductInfo] = React.useState({
    positionX: -1.5,
    positionY: -1,
    positionZ: -1,
    visible: true
  })

  const { request } = useHttp();

  const handleDrag = (draggedToPosition) => {
    setProductInfo({
      ...productInfo,
      positionX: draggedToPosition[0],
      positionY: draggedToPosition[1],
      positionZ: draggedToPosition[2],

    })
  }

  const title='title'
  const price='price'
  const description='description'

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroSpinner visible={spinner} type="Light" position={[0, 0, -2.5]} />

      <Viro360Image
        format="RGBA8"
        rotation={[0, 90, 0]}
        animation={{ loop: false }}
        source={require('../res/scenes/sweet.jpeg')}
        // onLoadEnd={() => setSpinner(false)}
      />

      <TitleSection text={'Кондитерский отдел'} />

      <NextSectionLeft next={() => sceneNavigator.jump({ scene: VegetablesScene })} />

      <NextSectionRight next={() => sceneNavigator.jump({ scene: DrinksScene })} />

      <Shelve next={() => setSpinner(false)} />

      <ViroBox
        position={[-1.5, -1.5, -1]}
        rotation={[0, 20, 0]}
        scale={[0.5, 0.5, 0.5]}
        materials={['vtb']}
        onDrag={handleDrag}
      />

      <ViroFlexView 
        visible={productInfo.visible}
        position={[productInfo.positionX + 0.2, productInfo.positionY +0.2, productInfo.positionZ ]}
        height={1.5}
        width={1}
        style={styles.titleContainer}
      >

        <ViroFlexView style={styles.rowContainer}>
          <ViroText style={styles.prodDescriptionText} text={`Название: ${title}`} />
        </ViroFlexView>
        <ViroFlexView style={styles.rowContainer}>
          <ViroText style={styles.prodDescriptionText} text={`Описание: ${description}`} />
        </ViroFlexView>
        <ViroFlexView style={styles.rowContainer}>
          <ViroText style={styles.prodDescriptionText} text={`Цена: ${price}`} />
        </ViroFlexView>
        

      </ViroFlexView>
    </ViroARScene>
  );
}

ViroMaterials.createMaterials({
  vtb: {
    diffuseTexture: require('../res/207.jpeg'),
  },
  milk: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    cullMode: 'None',
    diffuseTexture: require('../res/milk/texture.png'),
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
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
});
