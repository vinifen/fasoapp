import { ScrollView, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import useTheme from 'shared/hooks/useTheme';
import { useTranslation } from "react-i18next";
import EditPostForm from './EditPostForm';
import { Flex } from 'shared/components/ui';
import { H2 } from 'shared/components/ui/Titles';
import postModel from 'shared/model/postModel';
import { PostRecordType } from 'shared/types/PostTypes';
import { useFocusEffect } from 'expo-router';

type EditPostsProps = {
  postId: string;
}

export default function EditPosts({ postId }: EditPostsProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [post, setPost] = useState<PostRecordType | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPost = async () => {
        try {
          const data = await postModel.selectAllFrom('id', postId);
          if (isActive) setPost(data[0]);
        } catch (error) {
          console.error("Failed to fetch post:", error);
        }
      };

      setPost(null);
      fetchPost();

      return () => {
        isActive = false;
      };
    }, [postId])
  );

  if (!post) return null;

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.background }} 
      contentContainerStyle={{ paddingHorizontal: '10%', paddingBottom: 20, flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Flex justify='center' align='center' style={{ marginVertical: 20 }}>
        <H2>{t("edit_this_post")}</H2>
      </Flex>
      <EditPostForm currentlyData={post}/>
    </ScrollView>
  );
}