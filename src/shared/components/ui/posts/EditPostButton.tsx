import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from 'shared/hooks/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditPostButton() {
  const { theme } = useTheme();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("auth_token");
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  const handleEdit = () => {
    if (!token) return;
    console.log("Edit post with token:", token);
  };

  return (
    <TouchableOpacity onPress={handleEdit}>
      <MaterialCommunityIcons name="pencil" size={20} color={theme.secondary} />
    </TouchableOpacity>
  );
}
