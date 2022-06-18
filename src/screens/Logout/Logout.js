import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import {Text, Button} from 'react-native-elements'
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import styles from './style'
import { logoutError, receiveLogout, requestLogout } from '../../Redux/ActionCreaters/auth'
import Spinner from '../../components/activityIndicator';

export default function Logout({ navigation }) {

  const isLoading = useSelector(state => state.auth.isLoading);
  const dispatch = useDispatch();
  const [isModelOpen, toggleModel] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      toggleModel(true);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.centeredView}>
        <View>

          <Modal isVisible={isModelOpen}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text  style={styles.modalText}>Do You Want to Logout?</Text>

                  <View style={{flexDirection:'row'}}>

                    <Button containerStyle={{marginHorizontal: 20}} type="clear" title="NO" onPress={() => {
                      toggleModel(false);
                      navigation.goBack();
                    }} />
                    <Button containerStyle={{marginHorizontal: 20}} type="clear" title="YES" onPress={
                      () => {
                        dispatch(requestLogout());
                        /** Todo Logout Functionality **/
                      }
                    } />
                  </View>
                </View>
              </View>
          </Modal>
        </View>
    </View>
  )
}