import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AppContext from "./lib/AppContext";
import FirebaseAuth from "./lib/FirebaseAuth";
import AuthScreen from "./screens/AuthScreen.jsx";
import SplashScreen from "./screens/SplashScreen";
import axios from 'axios';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
    let [loading, setLoading] = useState(true);
    let [user, setUser] = useState(undefined);

    // Load font
    const [fontsLoaded] = useFonts({
        "SUIT-Regular": require('./public/SUIT-Regular.ttf')
    });

    // Load firebase
    useEffect(() => {
        let unsub = FirebaseAuth.onAuthStateChanged(u => u ? loginUser(u) : setLoading(false));
        return () => unsub();
    }, []);

    // Load from API
    const loginUser = async (u) => {
        let token = await u.getIdToken(true);
        let { data } = await axios.post("http://192.168.1.200:3000/api/auth/visitor", undefined, { headers: { authorization: `bearer ${token}` } });

        setUser(data);
        setLoading(false);
    }

    // Splash screen
    if (loading || !fontsLoaded) return <SplashScreen />

    return (
        <AppContext.Provider value={{ user, setUser }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {user ? (
                        <>

                        </>
                    ) : (
                        <Stack.Screen name="Auth" component={AuthScreen} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    );
}
