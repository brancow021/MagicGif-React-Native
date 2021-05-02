import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Text, Button, View} from 'native-base';
import Share from 'react-native-share';
import {GetPermissionRead, saveGifStorage} from '../helpers/saveImage';
import {SharedImage} from '../helpers/SharedImage';
import {LoadingModal, ConfirmedModal} from './LoadingModal';

export const FooterCardDetail = ({dataDownload}) => {
  const [resShared, setresShared] = useState(false);
  const [resDownload, setresDownload] = useState(false);
  const [confirmationDownload, setconfirmationDownload] = useState(false);

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

  const sharedSocialMedia = async (url, social = 'facebook') => {
    setresShared(true);

    let {granded, res} = await SharedImage(url, social, true);
    console.log(`file://${res}`);
    console.log(granded)
    if (granded === 'granted') {
      await Share.shareSingle({
        message: 'Amig@ genial este gif que encontre en MagicGifs',
        url: `file://${res}`,
        title: 'Comparte con tus amigos la magia de MagicGifs',
        social:
          social === 'facebook'
            ? Share.Social.FACEBOOK
            : social === 'whatsapp'
            ? Share.Social.WHATSAPP
            : social === 'twitter'
            ? Share.Social.TWITTER
            : social === 'instagram'
            ? Share.Social.INSTAGRAM
            : null,
      }).then(() => {
        setresShared(false);
      });

      res = ''
    }
  };

  return (
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
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-between',
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <FontAwesome
            onPress={() => sharedSocialMedia(dataDownload.url, 'facebook')}
            size={40}
            name="facebook"
          />
          <FontAwesome
            onPress={() => sharedSocialMedia(dataDownload.url, 'whatsapp')}
            size={40}
            name="whatsapp"
          />
          <FontAwesome
            onPress={() => sharedSocialMedia(dataDownload.url, 'instagram')}
            size={40}
            name="instagram"
          />
          <FontAwesome
            onPress={() => sharedSocialMedia(dataDownload.url, 'twitter')}
            size={40}
            name="twitter"
          />
        </View>
        <View style={{marginTop: 15}}>
          <Button
            disabled={resShared}
            onPress={() => setresDownload(true)}
            style={{
              width: '100%',
              borderRadius: 10,
              borderColor: '#BF2202',
              borderWidth: 1,
              backgroundColor: resShared ? '#ccc' : '#D9672E',
            }}>
            <Text style={{textAlign: 'center', width: '100%'}}>Descargar</Text>
          </Button>
        </View>
      </View>
    </>
  );
};
