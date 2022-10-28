import styles from '../styles/Camera.scss';
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function CameraScreen({ navigation }) {
    let [hasPerm, setHasPerm] = useState(undefined);
    let [scanned, setScanned] = useState(false);

    useEffect(() => { getBarcodePerm() });

    const getBarcodePerm = async () => {
        let { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPerm(status === "granted");
    }

    const barcodeScanned = ({ type, data }) => {
        setScanned(true);

        navigation.navigate("Spot", { spotid: data });
    }

    if (hasPerm === null) return <></>;
    if (hasPerm === false) {
        navigation.goBack();
        return <></>;
    }

    return (
        <View style={styles.screen}>
            <BarCodeScanner barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} onBarCodeScanned={scanned ? undefined : barcodeScanned} style={styles.screen} />
        </View>
    );
}