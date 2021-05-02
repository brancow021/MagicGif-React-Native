import {Toast} from 'native-base';
import {PermissionsAndroid} from 'react-native';
import * as StoreReview from 'react-native-store-review';
import RNFetchBlob from 'rn-fetch-blob';

export const saveGifStorage = async (
  gifUrl = '',
  slug = 'shared',
  notification = true,
  shared = false,
) => {
  let directorys = RNFetchBlob.fs.dirs;
  let ext = '.gif';
  let path = '';

  console.log(gifUrl);

  await RNFetchBlob.config({
    fileCache: true,
    overwrite: true,
    appendExt: 'gif',
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: notification,
      path: directorys.DCIMDir + `/MagicGifs/gifs/image-${new Date().getMilliseconds()}` + slug + ext,
      description: 'MagicGifs',
    },
  })
    .fetch('GET', gifUrl)
    .then((res) => {
      console.log(res)
      path = res.path();
      
      !shared
        ? Toast.show({
            text: 'Gif descargado correctamente',
            buttonText: 'Entiendo',
            type: 'success',
            duration: 4000,
            textStyle: {textAlign: 'center'},
          })
        : null;

      if (StoreReview.isAvailable) {
        StoreReview.requestReview();
      }
    })

    .catch(() => {
      Toast.show({
        text: 'Ocurrio un Error en la descarga',
        buttonText: 'Okay',
        type: 'danger',
        duration: 4000,
        textStyle: {textAlign: 'center'},
      });
    });

  return path;
};

export const GetPermissionRead = async () => {
  const permissionStorageRead = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );

  return permissionStorageRead;
};
