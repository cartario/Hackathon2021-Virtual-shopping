import React from 'react';

import { StyleSheet } from 'react-native';

import {  
  ViroText,
  ViroBox,
  ViroMaterials,
  Viro3DObject, 
  ViroSpotLight,
  ViroNode,  
  ViroFlexView,  
  ViroButton,  
  ViroAnimations,
} from 'react-viro';

import {useDispatch} from 'react-redux';

import {addToCart} from '../redux/cartReducer'

export default function Shelve({ handleSpinner, products }) {
  const [loading, setLoading] = React.useState({
    shelve: true,
    objects: false,
  });

  const [hoveredProduct, setHoveredProduct] = React.useState('');

  const dispatch = useDispatch();

  const handleAddToCart = (id, price) => {
    const obj = {
      id: id,
      price: price
    }
    dispatch(addToCart(obj))
  }

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
        onLoadEnd={() => {
          setLoading({ ...loading, shelve: false });
          handleSpinner();
        }}
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
        /> */}


      {/* Продукты */}
      {!loading.shelve &&
        products.map((product, i) => (
          <ViroBox
            key={i}
            position={[product.position[0], product.position[1], product.position[2]]}
            rotation={[0, 20, 0]}
            scale={hoveredProduct === product.name ? [0.4, 0.4, 0.4] : [0.3, 0.3, 0.3]}
            materials={product.materials}
            onDrag={() => {}}
            animation={{ name: 'rotateY', run: true, loop: true }}
            onHover={() => setHoveredProduct(product.name)}
          />
        ))}

        {/* Информация */}
      {!loading.shelve &&
        products.map((product, i) => (
          <ViroNode key={i} visible={hoveredProduct === product.name}>
            <ViroFlexView
              position={[product.position[0] + 0.2, product.position[1], product.position[2] + 1]}
              rotation={[0, -60, 0]}              
              width={1}
              height={0.5}
              style={styles.titleContainer}
            >
              <ViroText style={styles.prodTitleText} text={product.title} extrusionDepth={1}/>              
              <ViroFlexView style={styles.rowContainer}>
                <ViroText style={styles.prodDescriptionText} text={product.description} 
                width={1} height={0.15} 
                extrusionDepth={1}
                />
                <ViroText style={styles.prodDescriptionText} text={`${product.price.toString()}РУБ./${product.priceFor}`} 
                width={1} height={0.15} 
                extrusionDepth={1}
                />
              </ViroFlexView>

              {/* <ViroFlexView style={styles.rowContainer}>
                <ViroText style={styles.prodDescriptionText} text={`Описание: `} />
              </ViroFlexView>
              <ViroFlexView style={styles.rowContainer}>
                <ViroText style={styles.prodDescriptionText} text={`Цена: `} />
              </ViroFlexView> */}

            </ViroFlexView>
            <ViroButton
              source={require('../res/btn/add_to_cart/2-active.png')}
              onClick={() => handleAddToCart(product.name, product.price)}
              gazeSource={require('../res/btn/add_to_cart/2-hover.png')}
              position={[product.position[0] + 0.2, product.position[1] - 0.31, product.position[2] + 1.01]}
              rotation={[0, -60, 0]}
              height={0.25}
              width={1.3925}
            />
          </ViroNode>
        ))}
    </ViroNode>
  );
}

ViroMaterials.createMaterials({
  tomato: {
    diffuseTexture: require('../res/boxes/tomato.png'),
  },
  cucumber: {
    diffuseTexture: require('../res/boxes/cucumber.jpeg'),
  },
  pepper: {
    diffuseTexture: require('../res/boxes/pepper.jpeg'),
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
    fontSize: 15,
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
    fontSize: 6,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,    
  },
});

ViroAnimations.registerAnimations({
  rotateY: { properties: { rotateY: '+=90' }, duration: 1000 },
});
