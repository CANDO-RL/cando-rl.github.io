'use client';

import type { SyntheticEvent } from 'react';

type SilentVideoProps = {
  src: string;
  label: string;
};

export function SilentVideo({ src, label }: SilentVideoProps) {
  const keepMuted = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;

    if (!video.muted) {
      video.muted = true;
    }

    if (video.volume !== 0) {
      video.volume = 0;
    }
  };

  return (
    <video
      key={src}
      controls
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      onLoadedMetadata={keepMuted}
      onPlay={keepMuted}
      onVolumeChange={keepMuted}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
