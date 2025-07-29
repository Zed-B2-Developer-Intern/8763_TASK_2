'use client';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author?: {
    email: string;
  };
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');

  // Fetch posts from API
  const fetchPosts = () => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, authorId: Number(authorId) }),
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      setAuthorId('');
      fetchPosts(); // Refresh posts
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem' }}>Blog CMS</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h2>Create New Post</h2>
        <div>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '300px', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ width: '300px', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </div>
        <div>
          <input
            placeholder="Author ID"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
            type="number"
            style={{ width: '100px', padding: '0.5rem', margin: '0.5rem 0' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Submit</button>
      </form>

      <h2>Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ margin: '1rem 0' }}>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
              <small>Author: {post.author?.email || 'Unknown'}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
