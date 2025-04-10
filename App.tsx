import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const LIST_ITEM_COLOR = "#1798DE";

interface Item {
  id: number;
}

export default function App() {
  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const [items, setItems] = useState<Item[]>(
    new Array(5).fill(0).map((_, index) => ({ id: index }))
  );

  const onAdd = useCallback(() => {
    setItems((currentItems) => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      return [...currentItems, { id: nextItemId }];
    });
  }, []);

  const onDelete = useCallback((itemId: number) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAdd} style={styles.floatingButton}>
        <Text style={{ color: "white", fontSize: 50 }}>+</Text>
      </TouchableOpacity>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {items.map((item, index) => {
          return (
            <Animated.View
              key={item.id}
              style={styles.listItem}
              entering={
                initialMode.current ? FadeIn.delay(100 * index) : FadeIn
              }
              exiting={FadeOut}
              onTouchEnd={() => onDelete(item.id)}
              layout={Layout.delay(100)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: "90%",
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
    elevation: 15,
  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: "black",
    borderRadius: 40,
    position: "absolute",
    bottom: 50,
    right: "5%",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
