import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../Style/Styles';

const logIn = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const isUserLogin = await auth().signInWithEmailAndPassword(
                email,
                password,
            );
            setMessage('');
            console.log(isUserLogin);

            navigation.navigate('UserList', {
                email: isUserLogin.user.email,
                uid: isUserLogin.user.uid,
            });
        } catch (err) {
            console.log(err);

            setMessage(err.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <TextInput
                style={styles.inputBox}
                placeholder="Enter Your Email"
                placeholderTextColor='black'
                value={email}
                onChangeText={value => setEmail(value)}
            />
            <TextInput
                style={styles.inputBox}
                placeholder="Enter Your Password"
                placeholderTextColor='black'
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleLogin()}>
                <Text style={{ color: '#fff' }}>LOG IN</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.signup}
                onPress={() => {
                    navigation.navigate('SignUp');
                }}>
                <Text style={{ color: 'blue' }}>Create Account!!</Text>
            </TouchableOpacity>
            <Text>{message}</Text>

        </View>
    );
};

export default logIn;