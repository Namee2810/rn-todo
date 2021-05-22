import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { globalStyles } from '../styles'
import types from '../utils/types'

export default function CategoryTodo(props) {
  const { onPressItem } = props;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        style={styles.items}
        horizontal={true}
        bounces={true}
        showsHorizontalScrollIndicator={false}
        data={types}
        keyExtractor={(item, idx) => "" + idx}
        renderItem={({ item }) =>
          <TouchableWithoutFeedback onPress={() => onPressItem(item.value)}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={item.colors}
              style={[styles.item, globalStyles.center]}>
              <Text style={styles.categoryTitle}>{item.label}</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingHorizontal: 20
  },
  items: {
    marginVertical: 15
  },
  item: {
    height: 76,
    width: 76,
    borderRadius: 15,
    marginRight: 10
  },
  categoryTitle: {
    color: "white",
    fontWeight: "bold",
  }
})
