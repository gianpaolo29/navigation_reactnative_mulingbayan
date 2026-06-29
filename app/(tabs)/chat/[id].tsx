import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMessages } from '@/context/messages-context';

export default function ChatScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const navigation = useNavigation();

  useEffect(() => {
    if (name) {
      navigation.setOptions({ title: name });
    }
  }, [name, navigation]);
  const { getMessages, addMessage } = useMessages();
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const messages = getMessages(id);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: false }), 100);
    }
  }, [messages.length]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    addMessage(id, text, true);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubbleRow,
              item.sent ? styles.bubbleRowSent : styles.bubbleRowReceived,
            ]}
          >
            <View
              style={[
                styles.bubble,
                item.sent ? styles.bubbleSent : styles.bubbleReceived,
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  item.sent ? styles.bubbleTextSent : styles.bubbleTextReceived,
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      <View style={styles.inputBar}>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
        />
        <Pressable onPress={handleSend} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="#3B82F6" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesList: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  bubbleRow: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  bubbleRowSent: {
    justifyContent: 'flex-end',
  },
  bubbleRowReceived: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  bubbleSent: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  bubbleReceived: {
    backgroundColor: '#E5E7EB',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 16,
    lineHeight: 22,
  },
  bubbleTextSent: {
    color: '#fff',
  },
  bubbleTextReceived: {
    color: '#000',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 8,
    padding: 4,
  },
});
