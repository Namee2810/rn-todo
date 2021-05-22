import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from 'react';
import Toast from "react-native-toast-message";
import { Provider } from 'react-redux';
import Navigation from './app/navigation';
import store from "./app/store";

export default function App() {
  const [loaded] = useFonts({
    "Pacifico": require("./assets/fonts/Pacifico.ttf")
  })

  return (
    loaded ? <Provider store={store}>
      <Navigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
      : <AppLoading />
  );
}