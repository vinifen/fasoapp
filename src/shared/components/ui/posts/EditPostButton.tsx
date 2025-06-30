import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from 'shared/hooks/useTheme';

export default function EditPostButton() {
  const { theme } = useTheme();
  return (
    <TouchableOpacity>
      <MaterialCommunityIcons name="pencil" size={20} color={theme.secondary} />
    </TouchableOpacity>
  )
}