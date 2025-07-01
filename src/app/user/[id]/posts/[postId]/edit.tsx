import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import useCheckParamId from 'shared/hooks/useCheckParamUserId';
import { EditPosts } from 'shared/components/pages';

export default function _screen() {
  const { id, postId } = useLocalSearchParams();
  if (!id || !postId) {
    return (
      <View>
        <Text>Parâmetros ausentes</Text>
      </View>
    );
  }

  useCheckParamId(id as string);

  return <EditPosts postId={postId as string} />;
}
