import { Toast } from 'native-base';
import React from 'react'
import { environmentInfo } from '../environment/env';

export const getStickerAndGif = async (type = 'gifs', search = 'trending', dataSearch= 'amor') => {
  let data = [];

  await fetch(`${environmentInfo.urlBase}${type}/${search}?q=${dataSearch}&api_key=${environmentInfo.apikey}`)
    .then((res) => res.json())
    .then((res) => data = res.data)
    .catch((err) => {
      Toast.show({
        text: 'No hay Conexion a Internet',
        buttonText: 'Entendido',
        type: 'danger',
        duration: 4000,
        textStyle: {textAlign: 'center'},
      });
    });

  return data
}
