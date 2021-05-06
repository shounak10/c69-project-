import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';



export default class scanScreen extends react.Component {
    constructor(){
        super();
        this . state ={
            hasCameraPermissions: null,
            scanned: false,
            scannedData:'',
            buttonState: 'normal'

        }
    }
}

getCameraPermissions = async () =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    
    this.setState({
      /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
      */
      hasCameraPermissions: status === "granted",
      buttonState: 'click',
      scanned: false
    });
  }

  handleBarCodeScanned = async({type, data})=>{
 
    this.setState({
       scanned:true,
       scannedData:data,
       buttonState:'normal'
    })
    
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== "normal" && hasCameraPermissions){
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal"){
      return(
        <View style={styles.container}>
          <View>
            <Image
              source={require("../assets/barcode.jpg")}
              style={{width:200, height: 200}}/>
            <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>
          </View>
        
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={()=>{
              this.getCameraPermissions
            }}>
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
         
         
          
         
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText:{
    fontSize: 15,
    textDecorationLine: 'underline'
  },  
  scanButton:{
    backgroundColor: '#66BB6A',
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0
  }
});