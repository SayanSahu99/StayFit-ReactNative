import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { ListItem, Text, Card, Divider, Icon, Button } from 'react-native-elements'
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import Spinner from '../../components/activityIndicator';
import ProgressBar from 'react-native-progress/Bar';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Nutriton({ navigation }) {

    const width = Dimensions.get('window').width;
    const { colors } = useTheme();
    const isLoading = useSelector(state => state.auth.isLoading);
    const [calories, changeCalories] = useState(0);

    const list = [
        {
            title: 'Breakfast',
            subtitle: '100 / 700 Cal',
            onPress: () => { navigation.navigate("Search") },
            food: [
                {
                    foodName: 'egg',
                    cal: 400,
                    quantity: '10g'
                },

                {
                    foodName: 'Chicken',
                    cal: 400,
                    quantity: '10g'
                },
            ]
        },
        {
            title: 'Morning Snacks',
            subtitle: '100 / 700 Cal',
            onPress: () => { console.log("Hello") },
            food: [
                {
                    foodName: 'egg',
                    cal: 400,
                    quantity: '10g'
                },
            ]
        },
        {
            title: 'Lunch',
            subtitle: '100 / 700 Cal',
            onPress: () => { console.log("Hello") },
            food: [
                {
                    foodName: 'egg',
                    cal: 400,
                    quantity: '10g'
                },
            ]
        },
        {
            title: 'Evening Snacks',
            subtitle: '100 / 700 Cal',
            onPress: () => { console.log("Hello") },
            food: [
                {
                    foodName: 'egg',
                    cal: 400,
                    quantity: '10g'
                },
            ]
        },
        {
            title: 'Dinner',
            subtitle: '100 / 700 Cal',
            onPress: () => { console.log("Dinner") },
            food: [
                {
                    foodName: 'egg',
                    cal: 400,
                    quantity: '10g'
                },
            ]
        },
    ];

    return (
        <ScrollView>
            {isLoading ? <Spinner /> : (
                <View style={{ marginHorizontal: 20, paddingTop: Constants.statusBarHeight, paddingBottom: Constants.statusBarHeight }}>
                    <Text style={styles.text}><Text h4>{calories}</Text> / 2200 Cals</Text>
                    <View style={styles.progressBar}>
                        <ProgressBar progress={calories / 2200} width={width * 0.9} color={colors.primary} />
                    </View>
                </View>
            )}
            <View>
                {
                    list.map((item, i) => (

                        <View key={i} style={{ paddingBottom: 5 }}>
                            <Card containerStyle={styles.cardStyle}>
                                <View style={styles.cardView}>
                                    <Card.FeaturedTitle><Text style={styles.listText}>{item.title}</Text></Card.FeaturedTitle>

                                    <Text>

                                        <View style={{ paddingRight: 15, paddingTop: 5 }}><Text style={styles.listSubText}>{item.subtitle}</Text></View>
                                        <Icon
                                            size={25}
                                            name='plus'
                                            type='font-awesome'
                                            color={colors.primary}
                                            onPress={item.onPress} />
                                    </Text>

                                </View>

                                {
                                    item.food.map((l, i) => (
                                        <View key={i}>
                                            <Divider style={styles.dividerStyle} />
                                            <ListItem onPress={() => console.log(i)} >
                                                <ListItem.Content>
                                                    <ListItem.Title><Text style={styles.listText}>{l.foodName}</Text></ListItem.Title>
                                                    <View style={{ marginTop: 5 }}><ListItem.Subtitle><Text style={styles.listSubText}>{l.quantity}</Text></ListItem.Subtitle></View>
                                                </ListItem.Content>
                                                <ListItem.Subtitle><Text style={styles.listSubText}>{l.cal} Cal</Text></ListItem.Subtitle>
                                            </ListItem>
                                        </View>
                                    ))
                                }
                            </Card>
                        </View>

                    ))
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 10,
        marginHorizontal: 10
    },

    text: {
        alignSelf: 'flex-start',
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 5
    },

    cardStyle: {
        borderWidth: 2,
        borderColor: "#000000"
    },

    cardView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    progressBar: {
        marginHorizontal: 0
    },

    listView: {
        marginTop: 20,
    },

    listText: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    listSubText: {
        fontSize: 16
    },

    dividerStyle: {
        borderWidth: 0.5,
        borderColor: "#000000"
    }

});