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
import { Menu, Shelve } from '../ar-components';

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
    id: '-M_oASOGR-aX3VTO3fzr',
    name: 'tomato',
    materials: ['tomato'],
    position: [2, 0.8, -2],
    title: 'Помидоры',
    description: 'Лучшие помидоры в мире',
    price: 110,
    priceFor: 'кг'
  },
  // {
  //   name: 'cucumber',
  //   materials: ['cucumber'],
  //   position: [2, 0.2, -2],
  //   title: 'Огурцы',
  //   description: 'Лучшие огурцы в мире',
  //   price: 120,
  //   priceFor: 'кг'
  // },
  {
    id: '-M_o60EsGM3ftVa4felw',
    name: 'pepper',
    materials: ['pepper'],
    position: [2, -0.5, -2],
    title: 'Перец желтый',
    description: 'Лучший перец в мире',
    price: 130,
    priceFor: 'кг'
  },
];

export default function VegetableScene({ sceneNavigator }) {
  // sceneNavigator.viroAppProps.navigateTo(NAVIGATOR_TYPES.arProductInfo)  

  const [spinner, setSpinner] = React.useState(true);

  const [loading, setLoading] = React.useState({
    image360: true,
  });

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
    if (!camera.active) {
      handleMoveToShelve(); //изчезает возможность перемещаться
    } else {
      handleResetCamera();
    }
  };

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

  const Content = ({ onLoad }) => {
    const {items} = useSelector(({cart})=>cart)

    return (
      <>
        <Menu sceneNavigator={sceneNavigator} />
        <TitleSection text={`Овощной отдел`} />

        <NextSectionLeft next={() => sceneNavigator.jump({ scene: GroceryScene })} />

        <NextSectionRight next={() => sceneNavigator.jump({ scene: SweetScene })} />

        <Shelve
          handleSpinner={onLoad}
          products={products}  
          sceneNavigator={sceneNavigator}        
        />

        <ViroBox
          position={[-1.5, -2, -3]}
          rotation={[0, 20, 0]}
          scale={[1, 1, 1]}
          materials={['vtb']}
          onDrag={() => {}}
          onClick={() => {}}
        />

        {/* подойти к стеллажу*/}
        {/* <ViroBox
          position={[-1.5, -2, 3]}
          rotation={[0, 20, 0]}
          scale={[1, 1, 1]}
          materials={['redItem']}
          onDrag={() => {}}
          onClick={handleMoveCamera}
        /> */}
      </>
    );
  };

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
        onLoadEnd={() => setLoading({ ...loading, image360: false })}
      />

      {loading.image360 ? null : <Content onLoad={() => setSpinner(false)} />}
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
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 10,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
});

ViroAnimations.registerAnimations({
  rotateY: { properties: { rotateY: '+=90' }, duration: 1000 },
});
