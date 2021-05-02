import React, {useEffect, useState} from 'react';
import {Text, Button, Card, CardItem, Body, View} from 'native-base';
import {Image, TouchableNativeFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GetPermissionRead, saveGifStorage} from '../helpers/saveImage';
import {ConfirmedModal, LoadingModal} from './LoadingModal';

export const GifsCard = React.memo(({gifData}) => {
  const navigator = useNavigation();
  const [resShared, setresShared] = useState(false);
  const [resDownload, setresDownload] = useState(false);
  const [confirmationDownload, setconfirmationDownload] = useState(false);
  const [dataDownload, setdataDownload] = useState({url: '', slug: ''});

  const saveImage = async (url, slug, confirmation) => {
    const granded = await GetPermissionRead();

    if (granded === 'granted') {
      if (confirmation) {
        setresShared(true);
        let res = await saveGifStorage(url, slug, true);
        if (res.length > 2 || res === '') {
          setresShared(false);
        }
      }
    }
  };

  return (
    <>
      <>
        <LoadingModal resShared={resShared} />

        <ConfirmedModal
          resShared={resShared}
          setresDownload={setresDownload}
          resDownload={resDownload}
          saveImage={saveImage}
          setconfirmationDownload={setconfirmationDownload}
          dataDownload={dataDownload}
        />
        <View
          style={{
            width: '50%',
            marginHorizontal: 1,
            marginVertical: 1,
            borderRadius: 5,
            borderWidth: 1,
          }}>
          <TouchableNativeFeedback
            onPress={() => navigator.navigate('Detail', gifData)}>
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
                  source={{uri: gifData?.images?.fixed_width_downsampled?.url}}
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
                  <View>
                    <Button
                      onPress={() => {
                        setresDownload(true);
                        setdataDownload({
                          url: gifData?.images?.downsized_large.url,
                          slug: gifData?.slug,
                        });
                      }}
                      style={{
                        backgroundColor: resShared ? '#ccc' : '#D9672E',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#BF2202',
                        width: '100%',
                      }}>
                      <Text>Descargar</Text>
                    </Button>
                  </View>
                </View>
              </Body>
            </CardItem>
          </TouchableNativeFeedback>
        </View>
      </>
    </>
  );
});
