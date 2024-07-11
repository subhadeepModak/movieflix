import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import SearchIcon from '../../../assets/search.svg';
import styles from './styles';

const SearchInput = ({
  onChangeText,
  value,
}: {
  onChangeText: (value: string) => void;
  value: string;
}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState(value);

  useEffect(() => {
    setSearchText(value);
  }, [value]);

  const handleTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleSearchIconPress = () => {
    setIsSearchActive(true);
  };

  const handleCrossIconPress = () => {
    setIsSearchActive(false);
    setSearchText('');
    onChangeText('');
  };

  const handleSearch = () => onChangeText(searchText);

  return (
    <View style={styles.container}>
      {isSearchActive ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchText}
            onChangeText={handleTextChange}
            autoFocus
          />
          <TouchableOpacity onPress={handleCrossIconPress}>
            <Text style={{paddingHorizontal: 5}}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSearch}
            disabled={searchText.length < 3}>
            <SearchIcon height={16} width={16} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleSearchIconPress}
          style={{paddingHorizontal: 7}}>
          <SearchIcon height={16} width={16} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;
