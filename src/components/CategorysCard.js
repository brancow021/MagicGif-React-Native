import React, {useEffect, useState} from 'react';
import {Text, CardItem, Body, View} from 'native-base';
import {LoadingModal} from './LoadingModal';
import {TouchableNativeFeedback, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {getStickerAndGif} from '../services/getStickerAndGif ';

export const CategorysCard = ({gifData}) => {
  const navigator = useNavigation();
  const [resShared, setresShared] = useState(false);

  const getDataCategory = async (keywordData) => {
    setresShared(true)
    const data = await getStickerAndGif('gifs', 'search', keywordData);
    await setDataLocalStorage(data.length === 0 ? null : data);
    navigator.navigate('keyword', data);
    setresShared(false)
  };

  const setDataLocalStorage = async (keywordData) => {
    try {
      await AsyncStorage.setItem('keywordData', JSON.stringify(keywordData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoadingModal resShared={resShared} />

      <View
        style={{
          width: '50%',
          marginHorizontal: 1,
          marginVertical: 1,
          borderRadius: 5,
          borderWidth: 1,
        }}>
        <TouchableNativeFeedback onPress={() => getDataCategory(gifData?.name)}>
          <CardItem
            style={{
              margin: 0,
              paddingRight: 0,
              paddingLeft: 0,
              paddingTop: 0,
              paddingBottom: 0,
            }}>
            <Body style={{borderRadius: 50}}>
              <Image
                borderRadius={10}
                style={{width: '100%', height: 200}}
                source={{uri: gifData?.gif.images?.preview_webp?.url}}
              />
              <View
                style={{
                  backgroundColor: '#464747',
                  width: '100%',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: 55,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#eee',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                  }}>
                  {gifData?.name}
                </Text>
              </View>
            </Body>
          </CardItem>
        </TouchableNativeFeedback>
      </View>
    </>
  );
};
