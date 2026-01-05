'use client';

import { Container, Title, Text, Button, Stack, Card, Group, SegmentedControl, Box, Input } from '@mantine/core';
import { IconRocket, IconPalette } from '@tabler/icons-react';
import { useThemeContext } from '../contexts/ThemeContext';
import { useMantineTheme } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Modal, TextInput } from '@mantine/core';
import Comment from '../components/Comment';

interface CommentType {
  id: string;
  author: string;
  text: string;
  date: string;
  likes: number;
  image: string;
}

export default function HomePage() {
  const { updateTheme, resetTheme } = useThemeContext();
  const theme = useMantineTheme();

  const handleColorChange = (color: string) => {
    updateTheme({ primaryColor: color });
  };

  const [comments, setComments] = useState<CommentType[]>([]);
  const [userId, setUserId] = useState("");

  // Modal state
  const [opened, setOpened] = useState(false);
  const [inputUserId, setInputUserId] = useState('');

  const fetchComments = () => {
    fetch('http://localhost:8000/comments')
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => {
        console.error("Error fetching comments:", error);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);



  function signIn() {
    setOpened(true);
  }

  function handleModalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserId(inputUserId.trim());
    setInputUserId("");
    setOpened(false)
  }

  function signOut() {
    setUserId("")
  }

  return (
    <Container size="md" py="xl">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="What is your username?"
      >
        <form onSubmit={handleModalSubmit}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            value={inputUserId}
            onChange={e => setInputUserId(e.currentTarget.value)}
            autoFocus
            required
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>

      <Stack spacing="xl" align="center">
        <Group position="apart" style={{ width: '100%' }}>
          <Title order={1}>Comments</Title>
          {userId !== "" ? (
            <Button onClick={signOut}>Sign out</Button>
          ) : (
            <Button onClick={signIn}>Sign in</Button>
          )}
        </Group>

        {
          comments && comments.length > 0 ? (
            <Stack spacing="md" style={{ width: '100%' }}>
              {comments.map((comment: CommentType) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  author={comment.author}
                  text={comment.text}
                  date={comment.date}
                  likes={comment.likes}
                  image={comment.image}
                  editable={comment.author === userId || userId === "Admin"}
                  userId={userId}
                  onUpdate={fetchComments}
                />
              ))}
            </Stack>
          ) : (
            <Text c="dimmed">No comments yet. Be the first to comment!</Text>
          )
        }
      </Stack >
      {userId !== "" && (
        <Box mt="xl" style={{ width: '100%' }}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const data = {
                author: userId,
                text: form.commentText.value,
                date: new Date().toISOString(),
                likes: 0,
                image: "",
              };


              const resp = await fetch('http://localhost:8000/comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "user_id": userId },
                body: JSON.stringify(data),
              });

              if (resp.ok) {
                form.reset();
                const new_comment = await resp.json();
                setComments([...comments, new_comment]);
              }
            }}
          >
            <TextInput
              name="commentText"
              label="Add a Comment"
              placeholder="Write your comment here..."
              required
              mb="sm"
              autoComplete="off"
            />
            <Group position="right">
              <Button type="submit">Post</Button>
            </Group>
          </form>
        </Box>
      )}

    </Container >
  );
}

