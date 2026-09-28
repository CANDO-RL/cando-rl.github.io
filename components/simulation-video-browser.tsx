'use client';

import { useState } from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const tasks = [
  { id: 'can', label: 'Can', success: { before: 7, after: 8 } },
  { id: 'square', label: 'Square', success: { before: 4, after: 9 } },
  { id: 'transport', label: 'Transport', success: { before: 3, after: 7 } },
  {
    id: 'peginsertion',
    label: 'Peg Insertion Side',
    success: { before: 3, after: 7 },
  },
  { id: 'stackcube', label: 'Stack Cube', success: { before: 4, after: 8 } },
] as const;

const episodes = Array.from(
  { length: 9 },
  (_, index) =>
    `episode_${String(index + 1).padStart(2, '0')}_seed_${10000 + index}.mp4`,
);

type TaskId = (typeof tasks)[number]['id'];
type TrainingStage = 'before' | 'after';

const stageLabels: Record<TrainingStage, string> = {
  before: 'Before Training',
  after: 'After Training',
};

export function SimulationVideoBrowser() {
  const [taskId, setTaskId] = useState<TaskId>('can');
  const [stage, setStage] = useState<TrainingStage>('before');
  const task = tasks.find((item) => item.id === taskId) ?? tasks[0];

  return (
    <section className="simulation-video-browser" aria-labelledby="simulation-rollouts-title">
      <h3 id="simulation-rollouts-title">Simulation Evaluation</h3>

      <Tabs
        value={taskId}
        onValueChange={(value) => setTaskId(value as TaskId)}
        className="task-selector-tabs"
      >
        <TabsList className="task-selector" aria-label="Select a simulation task">
          {tasks.map((item) => (
            <TabsTrigger key={item.id} value={item.id} className="task-selector-button">
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={taskId} className="task-video-content">
          <Tabs
            value={stage}
            onValueChange={(value) => setStage(value as TrainingStage)}
            orientation="vertical"
            className="training-stage-tabs"
          >
            <TabsList className="training-stage-selector" aria-label="Select training stage">
              <TabsTrigger value="before" className="training-stage-button">
                <span>Before</span>
                <small>Training</small>
              </TabsTrigger>
              <TabsTrigger value="after" className="training-stage-button">
                <span>After</span>
                <small>Training</small>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={stage} className="simulation-video-panel">
              <div className="simulation-video-panel-heading">
                <strong>{task.label}</strong>
                <div className="simulation-video-panel-meta">
                  <span className="simulation-stage-label">{stageLabels[stage]}</span>
                  <span className="simulation-success-rate">
                    Success Rate <b>{task.success[stage]}/9</b>
                  </span>
                </div>
              </div>

              <div className="simulation-video-grid">
                {episodes.map((filename, index) => {
                  const source = `assets/simulation-videos/${task.id}/${stage}/${filename}`;

                  return (
                    <figure className="simulation-video-card" key={source}>
                      <video
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={`${task.label}, ${stageLabels[stage]}, rollout ${index + 1}`}
                      >
                        <source src={source} type="video/mp4" />
                        Your browser does not support the video element.
                      </video>
                      <figcaption>Rollout {String(index + 1).padStart(2, '0')}</figcaption>
                    </figure>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </section>
  );
}
