import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from 'shared/hooks/useTheme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import postModel from 'shared/model/postModel';

type DeletePostButtonProps = {
  postId: string;
};

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const { theme } = useTheme();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("auth_token");
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const handleDelete = () => {
    if (!token) return;
    console.log(postId)
    postModel.delete(postId, token)
  };

  return (
    <TouchableOpacity onPress={handleDelete}>
      <MaterialCommunityIcons name="trash-can-outline" size={20} color={theme.secondary} />
    </TouchableOpacity>
  );
}
