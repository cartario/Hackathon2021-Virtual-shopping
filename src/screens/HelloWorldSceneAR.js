'use strict';

import React, { Component } from 'react';

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

const BASE_URL =
  'https://centerdaniil-b74b6-default-rtdb.firebaseio.com/adminPage/mainpost/-MXQr_to0soQv6EgpDdt.json';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      data: 'Loading...',
      count: 1,
      homeMode: false
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onModelLoaded = this._onModelLoaded.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
    this.handleHomeMode = this.handleHomeMode.bind(this);
    
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color="#ffffff" />

        {!this.state.homeMode ? <Viro360Image
          format="RGBA8"
          rotation={[0, 90, 0]}
          animation={{ loop: false }}
          source={require('../res/mall.jpg')}
          onLoadEnd={() => this._onModelLoaded('Viro360Image loaded')}
        />
: null}
        {/* <ViroSpinner
          visible={this.state.text !== 'Camera loaded'}
          type="Light"
          position={[0, 0, -2.5]}
        /> */}

        {/*биндит сцену*/}
        {/* <ViroCamera position={[0, 0, 0]} rotation={[0, 0, 0]} active={true} /> */}

        <ViroFlexView
          style={styles.titleContainer}
          position={[0, 3.5, -7]}
          rotation={[10, 0, 0]}
          height={2}
          width={4}
          onClick={this.handleHomeMode}
          
        >
          <ViroText
            style={styles.prodTitleText}
            text={this.state.homeMode ?  'вернуться в магазин': 'убрать лишнее'}
            width={4}
            height={0.5}            
          />
          
        </ViroFlexView>

        {/* <ViroFlexView
          style={styles.titleContainer}
          position={[1, -0.5, -0.5]}
          rotation={[0, 0, 0]}
          height={3}
          width={0.5}
          // onDrag={() => {}}
          // materials={['mall']}
        >          
        </ViroFlexView>
        <ViroFlexView
          style={styles.titleContainer}
          position={[1, -0.5, -2]}
          rotation={[0, 0, 0]}
          height={3}
          width={0.5}
          // onDrag={() => {}}
          // materials={['mall']}
        >          
        </ViroFlexView>
        <ViroFlexView
          
          position={[1, -0.5, -2]}
          rotation={[90, 0, 0]}
          height={1.5}
          width={0.5}
          // onDrag={() => {}}
          materials={['redItem']}
        >          
        </ViroFlexView> */}

        <ViroNode
          position={[-1, 0, -0.5]}
          dragType="FixedToWorld"
          // onDrag={() => {}}
          onPinch={() => {}}
        >
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
            source={require('../../js/res/shelf/model.obj')}
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

          

          {/* <Viro3DObject
            materials={['tabasco']}
            source={require('../../js/res/tabasco/tabasco.obj')}
            position={[2.2, 0.3, -1.6]}
            scale={[0.003, 0.003, 0.003]}
            type="OBJ"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            onDrag={() => {}}
          /> */}

          {/* <Viro3DObject
            materials={['apple']}
            source={require('../res/apple/apple.obj')}
            position={[2, -0.5, -2]}
            scale={[0.01, 0.01, 0.01]}
            type="OBJ"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            onDrag={() => {}}
          /> */}

          {/* <Viro3DObject
            materials={['bread']}
            source={require('../res/bread/BreadD.obj')}
            position={[1, -0.5, -2]}
            scale={[0.01, 0.01, 0.01]}
            type="OBJ"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            onDrag={() => {}}
          /> */}
        </ViroNode>

        <ViroText
          onDrag={() => {}}
          text={this.state.text}
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

  _onInitialized(state, reason) {
    
    this._DataLoaded();

    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'ХАКАТОН ВТБ',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onModelLoaded(value) {
    this.setState({
      text: value,
    });
  }

  async _DataLoaded() {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    this.setState({
      data: JSON.stringify(data),
    });
  }

  _onItemClick() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  handleHomeMode () {
    this.setState({
      homeMode: !this.state.homeMode
    });
  }
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
    diffuseTexture: require('../../js/res/tabasco/texture.jpg'),
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
    diffuseTexture: require('../../js/res/shelf/texture.jpg'),
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
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

module.exports = HelloWorldSceneAR;
