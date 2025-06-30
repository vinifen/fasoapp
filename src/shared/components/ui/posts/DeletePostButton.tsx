import { TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from 'shared/hooks/useTheme';

export default function DeletePostButton() {
  const { theme } = useTheme();
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons name="trash-can-outline" size={20} color={theme.secondary} />
    </TouchableOpacity>
  )
}