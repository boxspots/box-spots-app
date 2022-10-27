import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Google from '../public/google.svg';
import styles from '../styles/Auth.scss';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import FirebaseAuth from "../lib/FirebaseAuth";
import { useEffect } from "react";

export default function AuthScreen() {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "741864563268-8stsrk6jen8a6tip3ovg7el7mt11uofm.apps.googleusercontent.com"
        })
    }, []);

    const login = async () => {
        try {
            // Google play instant login
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // Get id token
            let { idToken } = await GoogleSignin.signIn();

            // Cred
            let googleCredential = GoogleAuthProvider.credential(idToken);

            // Login
            signInWithCredential(FirebaseAuth, googleCredential);
        } catch (error) {

        }
    }

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.fillstart} />

            <TouchableOpacity style={styles.btn} onPress={login}>
                <Google width={50} height={50} />
                <Text style={styles.txt}>Login with Google</Text>
            </TouchableOpacity>

            <View style={styles.fillend} />
        </SafeAreaView>
    )
}