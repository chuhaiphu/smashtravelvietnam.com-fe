'use client';

import { useEffect } from 'react';
import { incrementTourViewAction } from '@/actions/tour-action';
import { incrementBlogViewAction } from '@/actions/blog-action';

interface IncrementViewProps {
  tourId?: string;
  blogId?: string;
}

export default function IncrementView({ tourId, blogId }: IncrementViewProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        if (tourId) {
          await incrementTourViewAction(tourId);
        } else if (blogId) {
          await incrementBlogViewAction(blogId);
        }
      } catch (error) {
        // Silently fail - view increment is not critical
        console.error('Failed to increment view:', error);
      }
    };

    incrementView();
  }, [tourId, blogId]);

  return null;
}
