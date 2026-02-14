'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const videoLinks = [
  'https://bigvu.tv/pages/kenkaplan/unlock-your-small-business-loan-successnwjvx1us',
  'https://bigvu.tv/pages/kenkaplan/unlock-commercial-mortgage-success-with-kencwuwrckw',
  'https://bigvu.tv/pages/kenkaplan/unlock-powerful-commercial-mortgage-insightsgp0ixalq',
];

function getTitleFromLink(link: string): string {
  const slug = link.split('/').filter(Boolean).pop() ?? '';
  const withoutId = slug.replace(/[a-z0-9]{8}$/i, '');

  return withoutId
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function VideoCards() {
  const [isPaused, setIsPaused] = useState<boolean[]>(
    videoLinks.map(() => false),
  );

  const toggleVideo = (index: number) => {
    setIsPaused((prev) =>
      prev.map((paused, itemIndex) =>
        itemIndex === index ? !paused : paused,
      ),
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {videoLinks.map((link, index) => {
        const title = getTitleFromLink(link);

        return (
          <Card key={link} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-video rounded-t-lg overflow-hidden bg-slate-200">
                {isPaused[index] ? (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 font-medium">
                    Video paused
                  </div>
                ) : (
                  <iframe
                    src={link}
                    title={title}
                    className="w-full h-full"
                    allow="fullscreen"
                    allowFullScreen
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    Video
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
                {/* <Button
                  variant="outline"
                  className="hover:bg-primary hover:text-primary-foreground"
                  onClick={() => toggleVideo(index)}
                >
                  {isPaused[index] ? 'Resume' : 'Pause'}
                </Button> */}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
