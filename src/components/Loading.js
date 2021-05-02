import React from 'react'
import { Spinner, Container, Text, View } from 'native-base'

export const Loading = () => {
  return (
    <>
      <Container style={{justifyContent: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <Spinner color="orange" size="large" />
          <Text style={{fontWeight: '600'}}>Cargando...</Text>
        </View>
      </Container>
    </>
  );
}
