import {Text, View} from 'react-native';
import React from 'react';
import LoadingDots from 'react-native-loading-dots';
import styles from './styles';
import Table from './Table';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PinchableImageView from '../PinchableImageView';
import MenuIcon from '../assets/menu.svg';
import BotSvg from '../assets/bot.svg';

export const ChatView = ({item, isLoading, onPressHandler}: any) => {
  const {role, content} = item;

  if (isLoading) {
    return (
      <View style={[styles.container, {paddingBottom: 90, height: 50}]}>
        <View style={styles.loadingWrapper}>
          <LoadingDots size={10} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {role === 'user' ? (
        <View style={styles.question}>
          <Text style={styles.user}>{'You'}</Text>
          <Text style={styles.text}>{content}</Text>
        </View>
      ) : (
        <View style={styles.response}>
          <View style={styles.bot}>
            <BotSvg fill={'#f50505'} height="25" width="25"/>
          </View>

          {content?.src && (
            <PinchableImageView imageUri={content.src} style={styles.imageSt} />
          )}

          {typeof content === 'string' && (
            <Text style={styles.text}>{content}</Text>
          )}
          {Array.isArray(content) && <Table data={content} />}
          {(item.suggestions || []).map((suggestion: any, i: string) => {
            return (
              <TouchableOpacity
                delayPressOut={200}
                style={styles.chatButtonStyle}
                onPress={() => onPressHandler(suggestion)}
                key={i.toString()}>
                <Text style={styles.btnText}>{suggestion}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {role !== 'user' &&
        (item?.enableEditing || !item?.suggestions?.length) && (
          <TouchableOpacity
            style={styles.menuStyles}
            onPress={() => onPressHandler('menu')}>
            <MenuIcon height={16} width={16} />
            <Text style={{fontWeight: '600'}}>Menu</Text>
          </TouchableOpacity>
        )}
    </View>
  );
};

export default ChatView;
