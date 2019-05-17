import React, { Component } from 'react';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
          buttonState: 'upload',
        }
      }

     Mess = () => {
        this.props.Client.onMessageArrived = onMessageArrivedButton;

        function onMessageArrivedButton(message) {
            switch(message.destinationName){
                case "tp/test_v1":
                return alert(message.payloadString)
                case "tp/test_v2":
                return alert(message.payloadString)
              }
          }
     }
     

  render() {
      {this.Mess()}
    return (
      <View>
        <RoundButton style={styles.button}
          buttonState={this.state.buttonState} // "upload" or "uploading"
          states={{
            upload: {
              onPress: () => {
                this.setState({ buttonState: 'uploading' });
                this.props.Client.publish("tp/test_v1", "Configure", 1);
              },
              text: 'Configure',
            },
            uploading: {
              onPress: () => {
                this.setState({ buttonState: 'upload' });
                this.props.Client.publish("tp/test_v2", "Configuring...", 1);
              },
              spinner: true,
              text: 'Configuring...',
            },
          }}
        >
        </RoundButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      width: '80%',
      height: '30%'
    }
  });