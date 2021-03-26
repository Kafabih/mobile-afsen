import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function Salaryscreen() {
    
     return (
    
            <View style={styles.container}>
                <View >
              <Text style={{color: '#000'}}>Salaryscreen Pages</Text>
               </View>
            </View>
    
    
        );
      }

export default Salaryscreen;

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
})