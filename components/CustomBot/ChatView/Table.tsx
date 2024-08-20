import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const Table = ({data = []}) => {
  if (!data || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);

  return (
    <ScrollView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        {headers.map((h, i) => (
          <Text key={i} style={styles.text}>
            {h.toUpperCase()}
          </Text>
        ))}
      </View>
      {/* Body */}
      {data.map((dt, i) => (
        <View style={styles.item} key={i.toString()}>
          {Object.values(dt).map(d => {
            return <Text style={styles.text}>{d}</Text>;
          })}
        </View>
      ))}
    </ScrollView>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 5,
    maxHeight: 200,
    minHeight: 200,
    paddingBottom: 30,
    overflow: 'scroll',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#dedede',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    padding: 5,
  },
});
