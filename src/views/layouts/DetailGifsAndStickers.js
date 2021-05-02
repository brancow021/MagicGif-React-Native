import React, { useEffect, useState } from 'react'
import {Image, Linking, ImageBackground} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Text, Container, Card, CardItem, Body, Left, Thumbnail, H2,H3, View, Content } from 'native-base'
import {InteractionManager} from 'react-native';
import { Loading } from '../../components/Loading';
import { FooterCardDetail } from '../../components/FooterCardDetail';

export const DetailGifsAndStickers = (props) => {
  const [interationComplete, setinterationComplete] = useState(false);
  const [imageLoading, setimageLoading] = useState(true);
  const [dataDetail, setdataDetail] = useState({});
  const detailData = props?.route?.params;
  
  useEffect(() => {
    setdataDetail(detailData)
    InteractionManager.runAfterInteractions(() => {
      setinterationComplete(true);
      return () => {
        setinterationComplete(false);
      };
    });
  }, [props.route.params]);

  
  useEffect(() => {
    setimageLoading(true)
  }, [detailData])


  const openLinkInstagram = (url) => {
    Linking.openURL(url);
  }

  return (
    <>
      {!interationComplete && !dataDetail ? (
        <Loading />
      ) : (
        <Container style={{backgroundColor: '#eee', padding: 5}}>
          <Content>
            <Card style={{flex: 0, borderRadius: 10}}>
              <View
                style={{
                  backgroundColor: '#ccc',
                  justifyContent: 'center',
                  width: '100%',
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 5,
                }}>
                <H3 style={{fontWeight: 'bold'}}>Perfil del Usuario</H3>
              </View>

              <CardItem style={{backgroundColor: '#eee'}}>
                <Left>
                  <Thumbnail source={{uri: dataDetail?.user?.avatar_url}} />
                  <Body>
                    <Text>
                      <FontAwesome
                        style={{marginRight: 50}}
                        size={20}
                        name="user"
                      />{' '}
                      {dataDetail?.user?.username}
                    </Text>

                    <Text>
                      <FontAwesome5
                        style={{marginRight: 50}}
                        size={20}
                        name="calendar-day"
                      />{' '}
                      {`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}
                    </Text>

                    <Text
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <FontAwesome5
                        style={{marginRight: 50}}
                        size={20}
                        name="instagram-square"
                      />{' '}
                      {dataDetail?.user?.instagram_url.length > 0 ? (
                        <Text
                          onPress={() =>
                            openLinkInstagram(dataDetail?.user?.instagram_url)
                          }>
                          Seguir
                        </Text>
                      ) : (
                        ''
                      )}
                    </Text>
                  </Body>
                </Left>
              </CardItem>

              <CardItem>
                <Body>
                  <View
                    style={{
                      width: '100%',
                      marginTop: 5,
                      marginBottom: 5,
                    }}>
                    <H2 style={{textAlign: 'center'}}>{dataDetail?.title}</H2>
                  </View>

                  <ImageBackground
                    style={{width: '100%', height: 280}}
                    source={
                      imageLoading
                        ? require('../../assets/placeholderImage.gif')
                        : null
                    }>
                    <Image
                      resizeMode="cover"
                      onLoad={() => setimageLoading(false)}
                      progressiveRenderingEnabled
                      source={{uri: dataDetail?.images?.preview_webp.url}}
                      style={{height: 300, width: '100%', borderRadius: 50}}
                    />
                  </ImageBackground>
                </Body>
              </CardItem>

              <CardItem footer>
                <FooterCardDetail
                  dataDownload={{
                    url: dataDetail?.images?.downsized_large.url,
                    slug: dataDetail.slug,
                  }}
                />
              </CardItem>
            </Card>
          </Content>
        </Container>
      )}
    </>
  );
}
