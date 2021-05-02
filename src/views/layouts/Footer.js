import React from 'react'
import { View, Text } from 'native-base'

export const Footer = () => {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          height: 50,
          backgroundColor: '#D9672E',
          justifyContent: 'center',
          marginTop: 10
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Desarrollado por: Brandon Rodriguez</Text>
      </View>
    </>
  );
}
