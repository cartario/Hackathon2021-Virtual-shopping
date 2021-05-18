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
  ViroCamera,
  ViroAnimations,
} from 'react-viro';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartReducer';
import useHttp from '../hooks/useHttp';
import { SweetScene, GroceryScene } from './';
import { Menu } from '../ar-components';

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

const products = [
  {
    name: 'tomato',
    materials: ['tomato'],
    position: [2, 0.8, -2],
  },
  {
    name: 'cucumber',
    materials: ['cucumber'],
    position: [2, 0.2, -2],
  },
  {
    name: 'pepper',
    materials: ['pepper'],
    position: [2, -0.5, -2],
  },
];

const Shelve = ({ handleSpinner, products, handleHoverProduct, hoveredProduct }) => {
  const [loading, setLoading] = React.useState({
    shelve: true,
    objects: false    
  })  

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
        onLoadEnd={()=>{
          setLoading({...loading, shelve: false});
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

      {!loading.shelve && products.map((product, i) => (
        <ViroBox
          key={i}
          position={[product.position[0], product.position[1], product.position[2]]}
          rotation={[0, 20, 0]}
          scale={hoveredProduct === product.name ? [0.4, 0.4, 0.4] : [0.3, 0.3, 0.3]}
          materials={product.materials}
          onDrag={() => {}}
          animation={{ name: 'rotateY', run: true, loop: true }} 
          onHover={()=>handleHoverProduct(product.name)}         
        />
      ))}
    </ViroNode>
  );
};

export default function VegetableScene({ sceneNavigator }) {
  // sceneNavigator.viroAppProps.navigateTo(NAVIGATOR_TYPES.arProductInfo)

  const [spinner, setSpinner] = React.useState(true);

  const [loading, setLoading] = React.useState({
    image360: true,
  })

  const [camera, setCamera] = React.useState({
    active: false,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  });

  const state = useSelector(({ cart }) => cart);
  const dispatch = useDispatch();

  const { request } = useHttp();

  const handleDrag = () => {
    const obj = {
      id: 1,
      price: 12,
    };
    dispatch(addToCart(obj));   
  };

  const handleMoveCamera = () => {
    if(!camera.active){
      handleMoveToShelve(); //изчезает возможность перемещаться      
    }
    else {
      handleResetCamera();
    }
  }

  const handleMoveToShelve = () => {
    setCamera({
      ...camera,
      position: [-1, 0, -2],
      rotation: [0, -70, 0],
      active: true,
    });
  };

  const handleResetCamera = () => {
    setCamera((prev) => ({
      ...camera,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      active: !prev,
    }));
  };

  const Content = ({onLoad}) => {
    const [hoveredProduct, setHoveredProduct] = React.useState('info');

    return (<>
    <Menu sceneNavigator={sceneNavigator} />
      <TitleSection text={`Овощной отдел ${hoveredProduct}`} />

      <NextSectionLeft next={() => sceneNavigator.jump({ scene: GroceryScene })} />

      <NextSectionRight next={() => sceneNavigator.jump({ scene: SweetScene })} />

      <Shelve handleSpinner={onLoad} products={products} handleHoverProduct={setHoveredProduct} hoveredProduct={hoveredProduct}/>

      <ViroBox
        position={[-1.5, -2, -3]}
        rotation={[0, 20, 0]}
        scale={[1, 1, 1]}
        materials={['vtb']}
        onDrag={() => {}}
        onClick={()=>{}}
      />

      {/* подойти к стеллажу*/}
      <ViroBox
        position={[-1.5, -2, 3]}
        rotation={[0, 20, 0]}
        scale={[1, 1, 1]}
        materials={['redItem']}
        onDrag={() => {}}
        onClick={handleMoveCamera}
        
      />
    </>)
  }

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroSpinner visible={spinner} type="Light" position={[0, 0, -2.5]} />

      <ViroCamera
        position={[camera.position[0], camera.position[1], camera.position[2]]}
        rotation={[camera.rotation[0], camera.rotation[1], camera.rotation[2]]}
        active={camera.active}
      />

      <Viro360Image
        format="RGBA8"
        rotation={[0, 90, 0]}
        animation={{ loop: false }}
        source={require('../res/scenes/vegetables.jpeg')}
        onLoadEnd={() => setLoading({...loading, image360: false})}
      />

      {loading.image360 ? null : <Content onLoad={()=>setSpinner(false)}/>}



    </ViroARScene>
  );
}

ViroMaterials.createMaterials({
  vtb: {
    diffuseTexture: require('../res/207.jpeg'),
  },
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
  redItem: {
    diffuseColor: 'red',
    lightingModel: 'Lambert',
    shininess: 2.0,
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

ViroAnimations.registerAnimations({
  rotateY: { properties: { rotateY: '+=90' }, duration: 1000 },
});
