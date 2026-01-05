'use client';

import { Card, Text, Group, Avatar, Stack, Box, Button, Textarea } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

interface CommentProps {
    id: string;
    author: string;
    text: string;
    date: string;
    likes: number;
    image: string;
    editable?: boolean;
    userId?: string;
    onUpdate?: () => void;
}

function decodeText(text: string): string {
    try {
        const decoded = decodeURIComponent(text);
        return decoded
            .replace(/â€™/g, "'")
            .replace(/â€œ/g, '"')
            .replace(/â€/g, '"')
            .replace(/â€"/g, '—')
            .replace(/â€"/g, '–')
            .replace(/â€¦/g, '…')
            .replace(/â€™/g, "'")
            .replace(/â€˜/g, "'");
    } catch (e) {
        return text
            .replace(/â€™/g, "'")
            .replace(/â€œ/g, '"')
            .replace(/â€/g, '"')
            .replace(/â€"/g, '—')
            .replace(/â€"/g, '–')
            .replace(/â€¦/g, '…')
            .replace(/â€™/g, "'")
            .replace(/â€˜/g, "'");
    }
}

export default function Comment({ id, author, text, date, likes, image, editable, userId, onUpdate }: CommentProps) {
    const decodedText = decodeText(text);
    const decodedAuthor = decodeText(author);
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(decodedText);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleDelete() {
        if (!userId) return;
        try {
            const response = await fetch(`http://localhost:8000/comment/${id}`, {
                method: 'DELETE',
                headers: {
                    'user_id': userId,
                },
            });
            if (response.ok) {
                if (onUpdate) onUpdate();
            } else {
                console.error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userId) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`http://localhost:8000/comment/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'user_id': userId,
                },
                body: JSON.stringify({
                    id: id,
                    author: author,
                    text: editText,
                    date: date,
                    likes: likes,
                    image: image,
                }),
            });

            if (response.ok) {
                setEditing(false);
                if (onUpdate) {
                    onUpdate();
                }
            } else {
                console.error('Failed to update comment');
            }
        } catch (error) {
            console.error('Error updating comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (editing) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing="sm">
                        <Group spacing="sm">
                            {image && (
                                <Avatar src={image} alt={author} radius="xl" size="md" />
                            )}
                            <Box style={{ flex: 1 }}>
                                <Text fw={500}>{decodedAuthor}</Text>
                                <Text size="xs" c="dimmed">
                                    {new Date(date).toLocaleDateString()}
                                </Text>
                            </Box>
                        </Group>
                        <Textarea
                            value={editText}
                            onChange={(e) => setEditText(e.currentTarget.value)}
                            placeholder="Edit your comment..."
                            minRows={3}
                            required
                        />
                        <Group position="right">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setEditing(false);
                                    setEditText(decodedText);
                                }}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" loading={isSubmitting}>
                                Save
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Card>
        );
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
            <Stack spacing="sm">
                <Group spacing="sm">
                    {image && (
                        <Avatar src={image} alt={author} radius="xl" size="md" />
                    )}
                    <Box style={{ flex: 1 }}>
                        <Text fw={500}>{decodedAuthor}</Text>
                        <Text size="xs" c="dimmed">
                            {new Date(date).toLocaleDateString()}
                        </Text>
                    </Box>
                    <Text size="sm" c="dimmed">
                        {likes} {likes === 1 ? 'like' : 'likes'}
                    </Text>
                    {(userId == "Admin" || userId == author) && (<IconTrash color="red" style={{ cursor: "pointer" }} onClick={() => handleDelete()} />)}
                    {editable && (
                        <Button
                            size="xs"
                            variant="subtle"
                            onClick={() => setEditing(true)}
                        >
                            <IconEdit color="blue" />
                        </Button>
                    )}
                </Group>
                <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                    {decodedText}
                </Text>
            </Stack>
        </Card>
    );
}
