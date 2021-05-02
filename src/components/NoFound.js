import { Container, H2} from 'native-base'
import React from 'react'

export const NoFound = () => {
  return (
    <>
      <Container style={{justifyContent: 'center', alignItems: 'center'}}>
        <H2>Sin resultados</H2>
      </Container>
    </>
  )
}
