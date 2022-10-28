import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Google from '../public/google.svg';
import styles from '../styles/Auth.scss';

export default function AuthScreen() {
    const login = async () => {
        try {
            // TODO - login
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