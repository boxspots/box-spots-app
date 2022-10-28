import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from '../styles/Map.scss';
import QRSvg from '../public/qr-code-scan.svg';
import { useContext, useEffect, useState } from "react";
import AppContext from "../lib/AppContext";
import { getDownloadURL, ref } from "firebase/storage";
import FirebaseStorage from "../lib/FirebaseStorage";
import { Dimensions } from "react-native";

export default function MapScreen({ navigation }) {
    let { map } = useContext(AppContext);
    let [uri, setUri] = useState(undefined);
    let [dims, setDims] = useState([0, 0])
    let dim = Dimensions.get("window");

    useEffect(() => { loadImage() }, [map]);

    const loadImage = async () => {
        if (!map) return;

        let sref = ref(FirebaseStorage, `${map.place}/${map.image}`);
        let url = await getDownloadURL(sref);

        setUri(url);

        // TODO - side ways or pro map
        let w = dim.width;
        let h = map.height / map.width * dim.width;

        setDims([w, h]);
    }

    if (!map || !uri) return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.start} />

            <View style={styles.mid}>
                <Text style={styles.txt}>Start off by scanning a QR code!</Text>
            </View>

            <View style={styles.end}>
                <TouchableOpacity style={styles.qr} onPress={() => navigation.navigate("Camera")}><QRSvg width={60} height={60} /></TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    return (
        <View style={styles.container}>
            <Image style={{ width: dims[0], height: dims[1], resizeMode: "stretch" }} source={{ uri }} />

            {map.spots.map(v)}
        </View>
    );
}