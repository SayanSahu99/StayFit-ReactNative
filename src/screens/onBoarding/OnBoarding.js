import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { Image, TouchableOpacity, View, Text } from 'react-native';

const OnBoarding = ({ navigation }) => {

  const Done = ({ ...props }) => (
    <View style={{ margin: 15 }}>
      <TouchableOpacity
        {...props}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>Done</Text>
      </TouchableOpacity>
    </View>

  );

  const resetStack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthNavigator' }]
    })
  }

  return (
    <Onboarding
      onSkip={resetStack}
      onDone={resetStack}
      DoneButtonComponent={Done}
      pages={[
        {
          backgroundColor: '#757ce8',
          image: <Image source={require('../../../assets/fitness_app.png')} />,
          title: 'Welcome to Stay Fit',
          subtitle: 'Your complete guide to nutrition, health and fitness',
        },
        {
          backgroundColor: '#ff7961',
          image: <Image source={require('./../../../assets/sandwich.png')} />,
          title: 'Diet',
          subtitle: 'Easily Track your diet, water and exercise.',
        },
        {
          backgroundColor: '#6fbf73',
          image: <Image source={require('./../../../assets/graphic_chart.png')} />,
          title: 'Goals',
          subtitle: 'Keep your goals in view and track your progress',
        }
      ]}
    />
  )
}

export default OnBoarding;
