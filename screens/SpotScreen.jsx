import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { getDownloadURL, ref } from 'firebase/storage';
import FirebaseStorage from "../lib/FirebaseStorage";
import AppContext from "../lib/AppContext";
import styles from '../styles/Spot.scss';
import { Dimensions } from "react-native";
import HouseDoor from '../public/house-door.svg';

export default function SpotScreen({ route, navigation }) {
    let { spotid } = route.params;
    let { map, setMap } = useContext(AppContext);
    let [spot, setSpot] = useState(undefined);
    let [uri, setUri] = useState(undefined);
    let dim = Dimensions.get('window');

    // if (!spotid) {
    //     navigation.navigate("Camera");
    //     return <></>;
    // }

    useEffect(() => { loadSpot() }, [spotid]);

    const loadSpot = async () => {
        let sx = null, mx = null;

        try {
            if (!map) throw null;

            let s = map.spots.find(v => v.id === spotid);
            if (!s) throw null;

            sx = s;
            mx = map;
        } catch (error) {
            let { data: spot } = await axios.get("https://theboxspots.com/api/place/spot?sid=" + spotid);
            let { data: cmap } = await axios.get("https://theboxspots.com/api/place/map?mid=" + spot.map);

            setMap(cmap);

            sx = spot;
            mx = cmap;
        }

        let sref = ref(FirebaseStorage, `${mx.place}/${sx.image}`);
        let url = await getDownloadURL(sref);

        setSpot(sx);
        setUri(url);
    }

    if (!spot || !uri) return (
        <SafeAreaView style={styles.center}>
            <Text style={styles.title}>Loading...</Text>
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.screen}>
            <Image style={{ width: dim.width, height: 150, resizeMode: "stretch" }} source={{ uri }} />
            <Text style={styles.name}>{spot.name}</Text>
            <Text style={styles.desc}>{spot.description}</Text>
            <TouchableOpacity style={styles.end} onPress={() => navigation.navigate("Map")}><HouseDoor width={60} height={60} /></TouchableOpacity>
        </SafeAreaView>
    );
}