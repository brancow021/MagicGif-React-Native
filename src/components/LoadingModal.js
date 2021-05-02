import React from 'react';
import {ActivityIndicator, Modal, StyleSheet} from 'react-native';
import {Text, Button, View} from 'native-base';
import {AdMobBanner} from 'react-native-admob';

export const LoadingModal = ({resShared}) => {
  return (
    <>
      <Modal style={{paddingVertical: 0}} animationType="fade" transparent={true} visible={resShared}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cargando...</Text>
            <ActivityIndicator color="orange" size="large" />
            <View style={{marginTop: 10}}>
              <AdMobBanner
                adSize="mediumRectangle"
                adUnitID="ca-app-pub-5954872651874861/2238672371"
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={(error) => console.error(error)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export const ConfirmedModal = ({
  resDownload,
  saveImage,
  setresDownload,
  setconfirmationDownload,
  dataDownload,
}) => {
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={resDownload}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¿Estas seguro?</Text>
            <View style={{flexDirection: 'row-reverse'}}>
              <Button
                onPress={() => {
                  setresDownload(!resDownload);
                  saveImage(dataDownload.url, dataDownload.slug, true);
                }}
                style={[styles.button, styles.buttonOpen]}>
                <Text>SI</Text>
              </Button>
              <Button
                onPress={() => {
                  setresDownload(!resDownload);
                }}
                style={[styles.button, styles.buttonClose]}>
                <Text>NO</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
  },
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#D84527',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
});
