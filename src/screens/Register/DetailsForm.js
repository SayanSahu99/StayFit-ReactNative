import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { Picker } from "@react-native-picker/picker";
import { addHealthDatabase } from "../../Redux/ActionCreaters/health";

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .min(4, "Too Short!")
        .max(30, "Too Long!")
        .required('Full name is required'),
    age: yup
        .number()
        .max(4, "Too Long!!")
        .lessThan(120, "Max age is 120 years")
        .positive("Age cannot be zero")
        .required('Age is required'),
    height: yup
        .number()
        .max(10, "Too Long!!")
        .lessThan(2.7432, "Max height is 2.7432 metres")
        .positive("Height cannot be zero")
        .required('Height is required'),
    weight: yup
        .number()
        .max(10, "Too Long!!")
        .lessThan(500, "Max weight is 500 Kg")
        .positive("Weight cannot be Zero")
        .required('weight is required'),
    gender: yup
        .string()
        .nullable(true)
        .required('Gender is required'),
    activity: yup
        .string()
        .nullable(true)
        .required('Activity is required'),
    medical: yup
        .string()
        .nullable(true)
        .required('Medical Condition is required'),
})

const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
    <View>
        {children}
        <Text style={{ color: 'red', marginLeft: 10, fontSize: 12 }}>
            {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
        </Text>
    </View>
);

const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
    const inputStyles = {
        padding: 10,
        marginBottom: 10,
        marginVertical: 15
    };

    if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
        inputStyles.borderColor = 'red';
    }

    return (
        <Input
            style={inputStyles}
            onChangeText={formikProps.handleChange(formikKey)}
            onBlur={formikProps.handleBlur(formikKey)}
            errorStyle={{ color: 'red' }}
            errorMessage={formikProps.touched[formikKey] && formikProps.errors[formikKey]}
            {...rest}
        />
    );
};

export const DetailsForm = props => {

    const [gender, setGender] = useState('Select Gender ...');
    const [activity, setActivity] = useState('Select Activity ...');
    const [medical, setMedical] = useState('Select Medical Condition ...');
    const dispatch = useDispatch();
    const age = useSelector(state => state.health.age);
    const reduxGender = useSelector(state => state.health.gender);
    const height = useSelector(state => state.health.current_height);
    const weight = useSelector(state => state.health.current_weight);
    const reduxActivity = useSelector(state => state.health.activity);
    const reduxMedical = useSelector(state => state.health.medical);
    const name = useSelector(state => state.user.first_name);
    const uid = useSelector(state => state.user.uid);

    const selectGender = (value, formikProps) => {
        setGender(value)
        formikProps.setFieldValue('gender', value);
    }

    const selectActivity = (value, formikProps) => {
        setActivity(value)
        formikProps.setFieldValue('activity', value);
    }

    const selectMedical = (value, formikProps) => {
        setMedical(value)
        formikProps.setFieldValue('medical', value);
    }

    return (
        <View>
            <ScrollView>
                <View style={styles.formStyles}>
                    <Formik

                        initialValues={{
                            name: name,
                            gender: reduxGender,
                            height: height,
                            weight: weight,
                            age: age,
                            medical: reduxMedical,
                            activity: reduxActivity
                        }}
                        onSubmit={values => {
                            dispatch(addHealthDatabase(values, uid));
                            props.navigation.navigate("Target");
                            console.log(values)
                        }}
                        validationSchema={validationSchema}
                    >
                        {formikProps => (
                            <View>
                                <View style={styles.border}>
                                    <View style={styles.labelText}><Text style={{ fontSize: 20 }}>Name</Text></View>
                                    <StyledInput
                                        label="Name"
                                        formikProps={formikProps}
                                        formikKey="name"
                                        placeholder={name}
                                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                                        autoFocus
                                    />
                                </View>
                                <View style={styles.border}>
                                    <View style={styles.labelText}><Text style={{ fontSize: 20 }}>Age</Text></View>
                                    <StyledInput
                                        label="Age"
                                        formikProps={formikProps}
                                        formikKey="age"
                                        placeholder={age.toString()}
                                        leftIcon={
                                            <Icon
                                                name='birthday-cake'
                                                size={24}
                                                color='black'
                                            />
                                        }
                                    />
                                </View>
                                <View style={styles.border}>
                                    <View style={styles.labelText}><Text style={{ fontSize: 20 }}>Gender</Text></View>
                                    <FieldWrapper label={'Gender'} formikKey={'gender'} formikProps={formikProps}>
                                        <View style={styles.pickerContainer}>
                                            <View style={styles.pickerIcon}>
                                                <Icon
                                                    name='venus-mars'
                                                    size={24}
                                                    color='black'
                                                />
                                            </View>
                                            <View style={{ flex: 7 }}>
                                                <Picker
                                                    mode="dropdown"
                                                    key={gender}
                                                    onValueChange={value => selectGender(value, formikProps)}
                                                    style={styles.inputIOS}
                                                    selectedValue={gender}
                                                >
                                                    <Picker.Item label="Select gender..." value={gender} />
                                                    <Picker.Item label="Male" value="male" />
                                                    <Picker.Item label="Female" value="female" />   
                                                </Picker>
                                            </View>
                                        </View>
                                    </FieldWrapper>
                                </View>
                                <View style={styles.border}>
                                    <View style={styles.labelText}><Text style={{ fontSize: 20 }}>Height (m)</Text></View>
                                    <StyledInput
                                        label="height"
                                        formikProps={formikProps}
                                        formikKey="height"
                                        placeholder={height.toString()}
                                        leftIcon={<Icon
                                            name='ruler-vertical'
                                            size={24}
                                            color='black'
                                        />}
                                    />
                                </View>
                                <View style={styles.border}>
                                    <View style={styles.labelText}><Text style={{ fontSize: 20 }}>Weight (kg)</Text></View>
                                    <StyledInput
                                        label="weight"
                                        formikProps={formikProps}
                                        formikKey="weight"
                                        placeholder={weight.toString()}
                                        leftIcon={
                                            <Icon
                                                name='weight'
                                                size={24}
                                                color='black'
                                            />}
                                    />
                                </View>
                                <View style={styles.border}>
                                    <View style={styles.labelText}><Text style={{ fontSize: 20 }}>Activity</Text></View>
                                    <FieldWrapper label={'Activity'} formikKey={'activity'} formikProps={formikProps}>
                                        <View style={{ ...styles.pickerContainer, marginBottom: 10 }}>
                                            <View style={styles.pickerIcon}>
                                                <Icon
                                                    name='running'
                                                    size={24}
                                                    color='black'
                                                />
                                            </View>
                                            <View style={{ flex: 7 }}>
                                                <Picker
                                                    mode="dropdown"
                                                    key={activity}
                                                    onValueChange={value => selectActivity(value, formikProps)}
                                                    value={activity}
                                                    style={styles.inputIOS}
                                                    selectedValue={activity}
                                                >
                                                    <Picker.Item label="Select your activity level..." value={activity} />
                                                    <Picker.Item label="Sedentary" value="sedenatry" />
                                                    <Picker.Item label="Lightly Active" value="light" />
                                                    <Picker.Item label="Moderately Active" value="moderate" />
                                                    <Picker.Item label="Very Active" value="high" />
                                                </Picker>
                                            </View>
                                        </View>
                                    </FieldWrapper>
                                </View>
                                <View style={styles.border}>
                                    <View style={styles.labelText}><Text style={{ fontSize: 20 }}>Medical Condition</Text></View>
                                    <FieldWrapper label={'medical condition'} formikKey={'medical'} formikProps={formikProps}>
                                        <View style={{ ...styles.pickerContainer, marginBottom: 10 }}>
                                            <View style={styles.pickerIcon}>
                                                <Icon
                                                    name='stethoscope'
                                                    size={24}
                                                    color='black'
                                                />
                                            </View>
                                            <View style={{ flex: 7 }}>
                                                <Picker
                                                    mode="dropdown"
                                                    key={medical}
                                                    onValueChange={value => selectMedical(value, formikProps)}
                                                    value={medical}
                                                    style={styles.inputIOS}
                                                    selectedValue={medical}
                                                >
                                                    <Picker.Item label="Any Medical Condition?" value={medical} />
                                                    <Picker.Item label="Diabetes" value="diabetes" />
                                                    <Picker.Item label="Thyroid" value="thyroid" />
                                                    <Picker.Item label="PCOS" value="PCOS" />
                                                    <Picker.Item label="cholestrol" value="cholestrol" />
                                                    <Picker.Item label="Physical Injury" value="physical injury" />
                                                    <Picker.Item label="Hypertension" value="hypertension" />
                                                </Picker>
                                            </View>
                                        </View>
                                    </FieldWrapper>
                                </View>
                                <Button onPress={formikProps.handleSubmit} title="Submit" />

                            </View>
                        )}

                    </Formik>
                </View>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    formStyles: {
        margin: 15,
        marginVertical: 10
    },
    pickerContainer: {
        flexDirection: 'row',
    },
    pickerIcon: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center'
    },
    border: {
        borderWidth: 0.5,
        marginVertical: 5
    },
    labelText: {
        marginLeft: 10,
        marginTop: 10
    }
});