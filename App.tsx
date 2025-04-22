import {
  gestureHandlerRootHOC,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import * as Font from "expo-font";

import App from "./src";

const AppContainer = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (() => {
      Font.loadAsync({
        "FiraCode-Regular": require("./assets/fonts/FiraCode-Regular.ttf"),
      }).then(() => {
        setFontsLoaded(true);
      });
    })();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <App />
    </GestureHandlerRootView>
  );
};

// eslint-disable-next-line import/no-default-export
export default gestureHandlerRootHOC(AppContainer);
