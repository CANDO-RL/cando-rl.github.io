'use client';

import { useState } from 'react';

import { SilentVideo } from '@/components/silent-video';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const stages = {
  before: {
    label: 'Before Training',
    title: 'Base Policy',
    source: 'assets/real-world/evaluation/before-training.mp4',
  },
  after: {
    label: 'After Training',
    title: 'CANDO',
    source: 'assets/real-world/evaluation/after-training.mp4',
  },
} as const;

type TrainingStage = keyof typeof stages;

export function RealWorldEvaluationBrowser() {
  const [stage, setStage] = useState<TrainingStage>('before');
  const selection = stages[stage];

  return (
    <Tabs
      value={stage}
      onValueChange={(value) => setStage(value as TrainingStage)}
      orientation="vertical"
      className="training-stage-tabs real-world-evaluation-tabs"
    >
      <TabsList className="training-stage-selector" aria-label="Select real-world training stage">
        <TabsTrigger value="before" className="training-stage-button">
          <span>Before</span>
          <small>Training</small>
        </TabsTrigger>
        <TabsTrigger value="after" className="training-stage-button">
          <span>After</span>
          <small>Training</small>
        </TabsTrigger>
      </TabsList>

      <TabsContent value={stage} className="simulation-video-panel real-world-evaluation-panel">
        <div className="simulation-video-panel-heading">
          <strong>{selection.title}</strong>
          <span className="simulation-stage-label">{selection.label}</span>
        </div>

        <figure className="real-world-evaluation-video">
          <span className="video-speed-badge">2× Speed</span>
          <SilentVideo src={selection.source} label={`${selection.label} real-world evaluation`} />
          <figcaption>{selection.label}</figcaption>
        </figure>
      </TabsContent>
    </Tabs>
  );
}
