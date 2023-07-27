import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../Style/Styles';

const signUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async () => {
        try {
            const isUserCreated = await auth().createUserWithEmailAndPassword(
                email,
                password,
            );

            console.log(isUserCreated);
        } catch (err) {
            console.log(err);

            setMessage(err.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <View>
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
                    onPress={() => handleSignup()}>
                    <Text style={{ color: '#fff' }}>Sign Up</Text>
                </TouchableOpacity>

                <Text>{message}</Text>
            </View>
        </View>
    );
};

export default signUp;