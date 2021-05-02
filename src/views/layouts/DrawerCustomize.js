import React from 'react';

import {
  Body,
  Header,
  Text,
  Content,
  Container,
  Title,
  View,
  Icon
} from 'native-base';
import {StyleSheet, TouchableNativeFeedback} from 'react-native';


export const DrawerCustomize = ({navigation}) => {
  return (
    <>
      <Container>
        <Header
          style={{height: 180, width: '100%', backgroundColor: '#C8581F'}}>
          <Body>
            <Title
              style={{color: '#FFF', fontWeight: 'bold', fontStyle: 'italic'}}>
              MagicGifs
            </Title>
          </Body>
        </Header>

        <Content>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('Home')}>
              <View style={styles.optionMenu}>
                <Icon name="star-sharp" />
                <Text style={{marginLeft: 10, color: '#C8581F'}}>
                  Trending Gifs
                </Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={() => navigation.navigate('category')}>
              <View style={styles.optionMenu}>
                <Icon name="apps" />
                <Text style={{marginLeft: 10, color: '#C8581F'}}>
                  Categorias
                </Text>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={() => navigation.navigate('stickers')}>
              <View style={styles.optionMenu}>
                <Icon name="color-wand" />
                <Text style={{marginLeft: 10, color: '#C8581F'}}>Stickers</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </Content>
      </Container>
    </>
  );
};


const styles = StyleSheet.create({
  optionMenu: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: 50,
    alignItems: 'center',
    marginTop: 5,
    flexDirection: 'row',
    paddingLeft: 10,
  },
});
