import { Image, SafeAreaView } from "react-native";
import styles from '../styles/Splash.scss';

export default function SplashScreen() {
    return (
        <SafeAreaView style={styles.screen}>
            <Image style={styles.img} source={require('../public/logo2.png')} />
        </SafeAreaView>
    );
}