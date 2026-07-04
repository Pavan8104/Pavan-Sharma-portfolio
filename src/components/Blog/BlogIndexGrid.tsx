'use client';

import Link from 'next/link';
import { blogPosts } from '../../data/blog';
import { playSound } from '../../hooks/useAudio';
import BlogCard from './BlogCard';

export default function BlogIndexGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {blogPosts.map((post, index) => (
        <Link key={post.id} href={`/blog/${post.slug}/`} className="block">
          <BlogCard post={post} index={index} onClick={() => playSound('click')} />
        </Link>
      ))}
    </div>
  );
}
