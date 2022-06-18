import React, { useState } from 'react';
import { View,StyleSheet, Dimensions } from 'react-native';
import { Card, Slider, Text, Button } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
const windowWidth = Dimensions.get('window').width;

export const Target = props => {

    const { colors } = useTheme();

    const [targetWeight, setTargetWeigth] = useState(20);
    const [targetPace, setTragetPace] = useState('medium');

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Your current weight is 54 kgs</Text>
            </View>
            <View style={styles.card}>
                <Card>
                    <Card.Image
                        style={{ width: windowWidth / 3 }}
                        source={require('../../../assets/jogging.png')}>
                    </Card.Image>
                    <Card.Divider></Card.Divider>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 15
                    }}>
                        Your BMI is 19
                        </Text>
                    <Card.Title>Overweight</Card.Title>
                </Card>
                <Card>
                    <Card.Image style={{ width: windowWidth / 3 }}
                        source={require('../../../assets/eatsalad.png')}>
                    </Card.Image>
                    <Card.Divider></Card.Divider>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 15
                    }}>Ideal Weight Range
                    </Text>
                    <Card.Title>70-80</Card.Title>
                </Card>
            </View>
            <View style={{
                flex: 1,
                marginHorizontal: windowWidth*0.04,
                marginVertical: 25,
            }}>
                <Text style={styles.text}>
                    Set your Target Weight
                    </Text>
                <Slider
                    value={targetWeight}
                    onValueChange={value => {setTargetWeigth(value)}}
                    maximumValue={50}
                    minimumValue={20}
                    step={1}
                    trackStyle={{ height: 10, backgroundColor: colors.primary }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: colors.primary }}
                    
                />
                <Text h4 style={styles.text}>
                    {targetWeight} kgs
                     </Text>
                <View style={{paddingTop:20}}>
                    <Text style={styles.text}>How quickly do you want to gain { targetWeight } kgs?</Text>
                    <View style={styles.pickerView}>
                    <Picker
                        key={targetPace}
                        onValueChange={value => setTragetPace(value)}
                        mode='dropdown'
                        value={targetPace}
                        selectedValue={targetPace}
                        style={styles.inputIOS}
                    >
                        <Picker.Item label="Select target pace..." value={targetPace} />
                        <Picker.Item label="Easy" value="easy" />
                        <Picker.Item label="Medium" value="medium" />
                        <Picker.Item label="Hard" value="hard" />
                        <Picker.Item label="Very Hard" value="very Hard" />
                    </Picker>
                    </View>
                    <Text style={styles.text}>You will reach your goal in x months x</Text>
                    <Text style={styles.text}>days</Text>
                    
                </View>
            </View>

            <View
                style={{backgroundColor: colors.primary}}
            >
            <Button
                title="I commit to my goal"
                onPress={() => props.navigation.push("Main")}
                titleStyle={{fontSize:20}}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    card: {
        flexDirection: 'row'
    },
    text: {
        alignSelf: 'center',
        fontSize: 20,
    },
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
    pickerView: {
        marginHorizontal:windowWidth*0.25, 
        backgroundColor:'white', 
        marginVertical: 10
    }
});