
import React, { useEffect } from 'react'
import styles from "./style";
import {
  Keyboard,
  Text,
  View,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Button, SocialIcon, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { loginUserFacebook, loginUserGoogle, requestLogin, registerUser } from '../../Redux/ActionCreaters/auth'
import Loader from '../../components/loading';

const validationSchema = yup.object().shape({
  email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
  password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain letters.')
});

const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View>
      {children}
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

function Register(props) {
  // TODO: add firebase login function later

  useEffect(() => {
    return () => {
      if (isAuthenticated) {
        props.navigation.push('DetailsForm');
      }
    }
  }, []);

  const isLoading = useSelector(state => state.auth.isLoading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <View style={styles.containerView}>

      <Loader loading={isLoading} />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        style={styles.containerView}
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Stay Fit</Text>
              <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={values => {
                    let formBody = [];
                    for (let key in values) {
                      let encodedKey = encodeURIComponent(key);
                      let encodedValue = encodeURIComponent(values[key]);
                      formBody.push(encodedKey + '=' + encodedValue);
                    }
                    formBody = formBody.join('&');
                    // alert(JSON.stringify(values));
                    dispatch(requestLogin());
                    dispatch(registerUser(formBody));
                }}
                validationSchema={validationSchema}
              >
              {formikProps => (
                <View>
                  <FieldWrapper label={'email'} formikKey={'email'} formikProps={formikProps}>
                    <StyledInput
                      label="Email"
                      formikProps={formikProps}
                      formikKey="email"
                      placeholder="Email" 
                      placeholderColor="#c4c3cb" 
                      style={styles.loginFormTextInput} 
                    />
                  </FieldWrapper>
                  <FieldWrapper label={'password'} formikKey={'password'} formikProps={formikProps}>
                    <StyledInput
                      label="Password"
                      formikProps={formikProps}
                      formikKey="password"
                      placeholder="Password" 
                      placeholderColor="#c4c3cb" 
                      style={styles.loginFormTextInput} 
                      secureTextEntry={true} 
                    />
                  </FieldWrapper>
                  <Button
                    buttonStyle={styles.loginButton}
                    onPress={formikProps.handleSubmit}
                    title="SIGN UP"
                  />
                </View>
              )}
              </Formik>
              <View style={styles.socialView}>
                <View style={styles.socialTextView}><Text style={{ fontSize: 15 }}>Or connect with</Text></View>

                <View style={styles.socialButtonView}>
                  <SocialIcon
                    type='facebook'
                    button
                    title='Sign In With Facebook'
                    onPress={() => { 
                      dispatch(requestLogin());
                      dispatch(loginUserFacebook());
                    }}
                  />
                  <SocialIcon
                    type='google'
                    button
                    title='Sign In With Google'
                    onPress={() => {
                      dispatch(requestLogin());
                      dispatch(loginUserGoogle());
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{alignSelf:"stretch"}}></View>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Register;
