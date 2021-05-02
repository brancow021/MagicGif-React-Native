import {Text, Container} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {CategorysCard} from '../components/CategorysCard';
import {Loading} from '../components/Loading';
import {NoFound} from '../components/NoFound';
import {getStickerAndGif} from '../services/getStickerAndGif ';

export const Categorys = () => {
  const [dataCategories, setdataCategories] = useState([]);

  const getCategories = async () => {
    const data = await getStickerAndGif('gifs', 'categories');
    console.log(data);
    setdataCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {dataCategories === null ? (
        <NoFound />
      ) : dataCategories.length < 1 ? (
        <Loading />
      ) : (
        <Container>
          <FlatList
            key={'_'}
            // ListHeaderComponent={<SearchCard />}
            // ListFooterComponent={<Footer />}
            updateCellsBatchingPeriod={5}
            removeClippedSubviews
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            numColumns={2}
            data={dataCategories}
            keyExtractor={(item) => item.gif.id}
            renderItem={({item}) => <CategorysCard gifData={item} />}
          />
        </Container>
      )}
    </>
  );
};
