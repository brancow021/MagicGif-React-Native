import React, {useEffect, useState} from 'react';
import {Container} from 'native-base';
import {getStickerAndGif} from '../services/getStickerAndGif ';
import {FlatList} from 'react-native';
import {GifsCard} from '../components/GifsCard';
import { Footer } from './layouts/Footer'
import { Loading } from '../components/Loading';
import { SearchCard } from '../components/SearchCard';
import {AdMobBanner} from 'react-native-admob';


export const Trending = () => {
  const [dataTrending, setdataTrending] = useState([]);

  const getTrendingGif = async () => {
    const data = await getStickerAndGif();
    console.log(data);
    setdataTrending(data);
  };

  useEffect(() => {
    getTrendingGif();
  }, []);

  return (
    <>
      {dataTrending.length < 1 ? (
        <Loading />
      ) : (
        <Container>
          <FlatList
            key={'_'}
            ListHeaderComponent={<SearchCard />}
            ListFooterComponent={<Footer />}
            updateCellsBatchingPeriod={5}
            removeClippedSubviews
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            numColumns={2}
            data={dataTrending}
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
};
