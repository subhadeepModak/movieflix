import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const Table = ({data = []}) => {
  if (!data || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);

  return (
    <ScrollView style={{maxHeight: 250}}>
      <ScrollView horizontal>
        <View style={styles.container}>
          {/* header */}
          <View style={[styles.header, {width: headers.length * 120}]}>
            {headers.map((h, i) => (
              <Text key={i} style={styles.headerText}>
                {h.toUpperCase()}
              </Text>
            ))}
          </View>
          {/* Body */}
          {data.map((dt, i) => (
            <View
              style={[styles.item, {width: headers.length * 120}]}
              key={i.toString()}>
              {Object.values(dt).map(d => {
                return <Text style={styles.text}>{d}</Text>;
              })}
            </View>
          ))}
        </View>
      </ScrollView>
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
    height: 'auto',
    paddingBottom: 30,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'red',
  },
  headerText: {
    padding: 5,
    color: 'white',
    flex: 1,
    flexWrap: 'wrap',
    minWidth: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    padding: 5,
    minWidth: 100,
    flex: 1,
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
