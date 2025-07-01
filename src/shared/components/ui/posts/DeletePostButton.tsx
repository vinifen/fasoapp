import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from 'shared/hooks/useTheme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import postModel from 'shared/model/postModel';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

type DeletePostButtonProps = {
  postId: string;
  userId: string;
};

export default function DeletePostButton({ postId, userId }: DeletePostButtonProps) {
  const { theme } = useTheme();
  const [token, setToken] = useState<string | null>(null);
  const { showActionSheetWithOptions } = useActionSheet();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("auth_token");
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const handleDelete = () => {
    showActionSheetWithOptions(
      {
        options: [t('cancel'), t('delete_post')],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        title: t('delete_post_confirmation_title'),
        message: t('delete_post_confirmation_message'),
      },
      async (selectedIndex) => {
        if (selectedIndex === 1 && token) {
          try {
            await postModel.delete(postId, token);
            console.log('Post deleted successfully', `/user/${userId}/profile`);
            router.push('/');
          } catch (err) {
            console.error('Error deleting post:', err);
          }
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={handleDelete}>
      <MaterialCommunityIcons name="trash-can-outline" size={20} color={theme.secondary} />
    </TouchableOpacity>
  );
}
