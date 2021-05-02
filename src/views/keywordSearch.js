import AsyncStorage from '@react-native-async-storage/async-storage';
import {Container, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, InteractionManager} from 'react-native';
import {GifsCard} from '../components/GifsCard';

import {Loading} from '../components/Loading';
import { NoFound } from '../components/NoFound';
import {SearchCard} from '../components/SearchCard';
import {Footer} from './layouts/Footer';

export const keywordSearch = React.memo((props) => {
  const [keywordData, setkeywordData] = useState([]);
  const [interationComplete, setinterationComplete] = useState(false);

  const searchData = props?.route?.params;

  const getDataLocalStorage = async () => {
    try {
      let data = await AsyncStorage.getItem('keywordData');
      console.log(data);
      setkeywordData(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataLocalStorage();

    return () => {
      setkeywordData([]);
    };
  }, [searchData]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setinterationComplete(true);
      return () => {
        setinterationComplete(false);
      };
    });
  }, []);

  return (
    <>
      {keywordData == null ? (
        <NoFound />
      ) : keywordData.length < 1 && interationComplete ? (
        <Loading />
      ) : (
        <Container>
          <FlatList
            ListHeaderComponent={<SearchCard />}
            ListFooterComponent={<Footer />}
            updateCellsBatchingPeriod={10}
            removeClippedSubviews
            initialNumToRender={10}
            numColumns={2}
            maxToRenderPerBatch={10}
            data={keywordData}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <GifsCard gifData={item} />}
          />
        </Container>
      )}
    </>
  );
});
