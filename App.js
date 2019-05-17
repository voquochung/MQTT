/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import init from 'react_native_mqtt';
import { AsyncStorage } from 'react-native';

import Button from './component/Button';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync : {
  }
});

const client = new Paho.MQTT.Client('service.tptechs.vn', 1234 , "");
client.connect({onSuccess:onConnect ,useSSL: true});
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
    
    function onConnect() {
      console.log("onConnect");
      client.subscribe("tp/test");
      client.subscribe("tp/test2");
      client.subscribe("tp/test_v1");
      client.subscribe("tp/test_v2");
    }
    
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
      }
    }
    
    function onMessageArrived(message) {
      switch(message.destinationName){
        case "tp/test":
        return alert(message.payloadString)
        case "tp/test2":
        return alert(message.payloadString)
      }
    }

export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      Client: client
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button Client={this.state.Client}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    width: '80%',
    height: '10%'
  }
});
