import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Form, Item, Button, Icon} from 'native-base';
import {getStickerAndGif} from '../services/getStickerAndGif ';
import {useNavigation} from '@react-navigation/core';
import { LoadingModal } from './LoadingModal';

export const SearchCard = React.memo(({stickers}) => {
  const [searchTerm, setsearchTerm] = useState({keyword: ''});
  const [disabledBtn, setdisabledBtn] = useState(false);
  const navigation = useNavigation();

  const handleSearch = (value) => {
    setsearchTerm({keyword: value});
  };

  const searchKeyword = async () => {
    setdisabledBtn(true);
    const data = await getStickerAndGif(stickers ? 'stickers' : 'gifs', 'search', searchTerm.keyword);
    await setDataLocalStorage(data.length === 0 ? null : data);
    navigation.navigate('keyword', data);
    setdisabledBtn(false);
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
      <LoadingModal resShared={disabledBtn}/>
      
      <Form
        style={{
          marginVertical: 20,
          marginHorizontal: 10,
        }}>
        <Item rounded last>
          <Input
            onSubmitEditing={searchKeyword}
            onChangeText={handleSearch}
            value={searchTerm.keyword}
            placeholder="Busqueda"
          />

          <Button
            disabled={disabledBtn}
            onPress={searchKeyword}
            style={{height: '100%', backgroundColor: '#C24126'}}
            rounded>
            <Icon name="search" />
          </Button>
        </Item>
      </Form>
    </>
  );
});
