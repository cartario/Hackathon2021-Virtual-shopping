import React from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroSpinner,
  ViroFlexView,
  ViroCamera,
  Viro360Image,
} from 'react-viro';

import useHttp from '../hooks/useHttp';

import { NAVIGATOR_TYPES, fireBaseAdapter } from '../utils';

const PRODUCTS_URL =
  'https://virtual-shoping-b52fd-default-rtdb.europe-west1.firebasedatabase.app/products.json';

const ORDERS_URL =
  'https://virtual-shoping-b52fd-default-rtdb.europe-west1.firebasedatabase.app/orders.json';

export default function Screen1({ sceneNavigator }) {
  const [text, setText] = React.useState('loading');
  const [spinner, setSpinner] = React.useState(true);
  const [data, setData] = React.useState(null);

  const { request, loading } = useHttp();

  const _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('ХАКАТОН ВТБ');
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  };

  const handleHomeMode = async () => {
    const data = await request(ORDERS_URL);
    setData(data);
    // setText(JSON.stringify(data));

    // sceneNavigator.viroAppProps.navigateTo(NAVIGATOR_TYPES.arProductInfo)
  };

  const handleBackgroundLoaded = () => {
    setSpinner(false);
  };

  const allOrders = fireBaseAdapter(data);

  return (
    <ViroARScene onTrackingUpdated={_onInitialized}>
      <ViroAmbientLight color="#ffffff" />

      <ViroSpinner visible={spinner} type="Light" position={[0, 0, -2.5]} />

      <Viro360Image
        format="RGBA8"
        rotation={[0, 90, 0]}
        animation={{ loop: false }}
        source={require('../res/mall.jpg')}
        onLoadEnd={handleBackgroundLoaded}
      />

      <ViroFlexView
        style={styles.titleContainer}
        position={[0, 3.5, -7]}
        rotation={[10, 0, 0]}
        height={2}
        width={4}
        onClick={handleHomeMode}
      >
        {/* <ViroText
            style={styles.prodTitleText}
            text={'загрузить данные с сервера'}
            width={4}
            height={0.5}
          /> */}

        {data ? (
          allOrders[0].products.map((product, i) => {
            return (
              <ViroText
                key={i}
                style={styles.prodTitleText}
                text={product.productId}
                width={4}
                height={0.5}
              />
            );
          })
        ) : (
          <ViroText style={styles.prodTitleText} text={'loading...'} width={4} height={0.5} />
        )}
      </ViroFlexView>

      <ViroNode position={[-1, 0, -0.5]} dragType="FixedToWorld" onPinch={() => {}}>
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

        <Viro3DObject
          materials={['milk']}
          source={require('../res/milk/milk.obj')}
          position={[2, -0.5, -2]}
          scale={[0.01, 0.01, 0.01]}
          type="OBJ"
          lightReceivingBitMask={5}
          shadowCastingBitMask={4}
          onDrag={() => {}}
        />

        <Viro3DObject
          materials={['milk']}
          source={require('../res/milk/milk.obj')}
          position={[2.2, 0.1, -1.6]}
          scale={[0.01, 0.01, 0.01]}
          type="OBJ"
          lightReceivingBitMask={5}
          shadowCastingBitMask={4}
          onDrag={() => {}}
        />
      </ViroNode>

      <ViroText
        onDrag={() => {}}
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 2.5, -4]}
        style={styles.helloWorldTextStyle}
      />
      <ViroBox
        position={[-1.5, -2, -3]}
        rotation={[0, 20, 0]}
        scale={[1, 1, 1]}
        materials={['vtb']}
        onDrag={() => {}}
      />
    </ViroARScene>
  );
}

ViroMaterials.createMaterials({
  vtb: {
    diffuseTexture: require('../res/207.jpeg'),
  },
  redItem: {
    diffuseColor: 'red',
    lightingModel: 'Lambert',
    shininess: 2.0,
  },
  tabasco: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    cullMode: 'None',
    diffuseTexture: require('../res/tabasco/texture.jpg'),
  },
  // bread: {
  //   shininess: 2.0,
  //   lightingModel: 'Blinn',
  //   cullMode: 'None',
  //   diffuseTexture: require('../res/bread/BreadD.jpeg'),
  // },
  // apple: {
  //   shininess: 2.0,
  //   lightingModel: 'Blinn',
  //   cullMode: 'None',
  //   diffuseTexture: require('../res/apple/apple.jpg'),
  // },
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
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: 'red',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    padding: 0.2,
    backgroundColor: '#ffffffdd',
  },
  prodTitleText: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
  },
});
