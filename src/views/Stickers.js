import React, { useState, useEffect } from 'react'
import {Container} from 'native-base';
import {getStickerAndGif} from '../services/getStickerAndGif ';
import {FlatList} from 'react-native';
import {GifsCard} from '../components/GifsCard';
import {Footer} from './layouts/Footer';
import {Loading} from '../components/Loading';
import {SearchCard} from '../components/SearchCard';
import {AdMobBanner} from 'react-native-admob';

export const Stickers = () => {
  const [dataSticker, setdataSticker] = useState([])

  const getStickers = async () => {
    const data = await getStickerAndGif('stickers');
    setdataSticker(data)
    console.log(data)
  }

  useEffect(() => {
    getStickers();
  }, [])

  return (
    <>
      {dataSticker.length < 1 ? (
        <Loading />
      ) : (
        <Container>
          <FlatList
            key={'_'}
            ListHeaderComponent={<SearchCard stickers={true}/>}
            ListFooterComponent={<Footer />}
            updateCellsBatchingPeriod={5}
            removeClippedSubviews
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            numColumns={2}
            data={dataSticker}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <GifsCard gifData={item} />}
          />

          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-5954872651874861/2238672371"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={(error) => console.error(error)}
          />
        </Container>
      )}
    </>
  );
}
