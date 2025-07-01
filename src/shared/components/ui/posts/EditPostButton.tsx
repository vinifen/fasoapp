import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from 'shared/hooks/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

type EditPostButtonProps = {
  postId: string;
  userId: string;
}

export default function EditPostButton({ userId, postId }: EditPostButtonProps) {
  const { theme } = useTheme();
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("auth_token");
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const handleEditPress = () => {
    console.log(`Navigating to edit post: userId=${userId}, postId=${postId}`);
    router.push(`user/${userId}/posts/${postId}/edit`);
  };

  return (
    <TouchableOpacity onPress={handleEditPress}>
      <MaterialCommunityIcons name="pencil" size={20} color={theme.secondary} />
    </TouchableOpacity>
  );
}
