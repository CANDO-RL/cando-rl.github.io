import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export default function Home() {
  return (
    <main>
      <header className="publication-hero">
        <div className="hero-glow hero-glow-left" aria-hidden="true" />
        <div className="hero-glow hero-glow-right" aria-hidden="true" />
        <div className="page-shell hero-inner">
          <p className="venue">ICRA / Anonymous Submission</p>
          <h1 className="publication-title">
            <span className="title-acronym">CANDO</span>
            <span className="title-colon">:</span>{' '}
            <span className="title-detail">
              Conservative Action-Noise Directional Optimization
              <span> for Residual Reinforcement Learning</span>
            </span>
          </h1>
          <p className="authors">Anonymous Authors</p>
        </div>
      </header>

      <section className="page-shell section-block" id="abstract">
        <h2 className="section-title">Abstract</h2>
        <div className="abstract-box">
          <p>
            Pretrained generative policies provide strong behavior priors for robot control, yet adapting them efficiently with online reinforcement learning remains difficult. Existing noise-space residual methods often rely on fixed feasibility constraints that are poorly aligned with behavioral value, while action-space residual methods leave complementary latent structure unused. We introduce <strong>Conservative Noise Directional Optimization (CNDO)</strong>, which learns directions around Gaussian latent samples and regulates them with conservative value estimation and gated execution instead of a hard latent region. We then propose <strong>Conservative Action-Noise Directional Optimization (CANDO)</strong>, adding a local action-space residual to combine structured latent improvement with post-decoding correction. Across five manipulation tasks, CANDO reaches <strong>76.1 NAUC</strong> and <strong>91.4% final success</strong>, outperforming the strongest single-space result by 6.6 NAUC and 4.1 success-rate points.
          </p>
        </div>
      </section>

      <section className="page-shell section-block motivation-section" id="motivation">
        <div className="section-heading-row">
          <h2 className="section-title">Motivation</h2>
        </div>
        <div className="motivation-copy">
          <p>
            Residual RL can adapt a frozen generative policy before decoding through noise-space steering or after decoding through action-space correction. This motivates two questions: can noise-space learning match the sample efficiency of action-space learning, and can both spaces be jointly optimized for further gains? Existing noise-space methods use hard geometric constraints for stability, which may exclude valuable latent directions and limit sample efficiency. Meanwhile, naively combining a weak noise learner with a strong action learner provides little additional benefit.
          </p>
          <figure className="motivation-side-figure">
            <img
              src="assets/hard-constraint.png"
              width="2586"
              height="1653"
              alt="Illustration showing how DSRL's hard bounded noise constraint can exclude a high-value latent region."
            />
          </figure>
        </div>
        <figure className="paper-figure wide-figure">
          <img
            src="assets/hook-motivation.png"
            width="1644"
            height="579"
            alt="Motivation comparing noise-space and action-space residual reinforcement learning and showing why naive joint optimization is insufficient."
          />
          <figcaption>
            Noise-space steering modifies a frozen policy before decoding; action-space residual learning corrects the decoded action. Joint learning becomes useful only when both branches are capable learners.
          </figcaption>
        </figure>
      </section>

      <section className="page-shell section-block" id="method">
        <div className="section-heading-row">
          <h2 className="section-title">Method</h2>
        </div>

        <div className="figure-stack">
          <figure className="paper-figure">
            <img
              src="assets/noise-regulation.png"
              width="1644"
              height="448"
              alt="Comparison of DSRL, LPS, LP-DS and CNDO noise-space regulation strategies."
            />
            <figcaption>
              CNDO replaces predefined hard latent geometry with a soft conservative constraint: value-aware regularization plus gated execution.
            </figcaption>
          </figure>

          <figure className="paper-figure method-figure">
            <img
              src="assets/method-overview.png"
              width="1644"
              height="708"
              alt="Overview of CANDO online inference and off-policy learning."
            />
            <figcaption>
              During inference, the gate selects a base or noise-edited action before a final action residual is applied. During learning, expert and online replay train the conservative critic, gate, and two residual branches.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="simulation-section" id="simulation-results">
        <div className="page-shell section-block">
          <div className="section-heading-row">
            <h2 className="section-title">Simulation Results</h2>
          </div>

          <Tabs defaultValue="cndo" className="experiment-tabs">
            <TabsList className="experiment-card-grid" aria-label="Simulation experiments">
              <TabsTrigger value="cndo" className="experiment-card">
                <span className="experiment-index">01</span>
                <span className="experiment-card-copy">
                  <strong>CNDO</strong>
                  <span>Noise-Space Policy Improvement</span>
                </span>
                <span className="experiment-metric">
                  <b>69.5</b>
                  <small>NAUC</small>
                </span>
              </TabsTrigger>

              <TabsTrigger value="ablation" className="experiment-card">
                <span className="experiment-index">02</span>
                <span className="experiment-card-copy">
                  <strong>Ablation Studies</strong>
                  <span>Conservative Critic and Gated Execution</span>
                </span>
                <span className="experiment-metric">
                  <b>2</b>
                  <small>Components</small>
                </span>
              </TabsTrigger>

              <TabsTrigger value="cando" className="experiment-card">
                <span className="experiment-index">03</span>
                <span className="experiment-card-copy">
                  <strong>CANDO</strong>
                  <span>Action-Noise Joint Residual Learning</span>
                </span>
                <span className="experiment-metric">
                  <b>76.1</b>
                  <small>NAUC</small>
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cndo" className="experiment-panel">
              <div className="experiment-panel-heading">
                <div>
                  <p>Experiment I</p>
                  <h3>Noise-Space Policy Improvement</h3>
                </div>
                <span>CNDO closes the sample-efficiency gap to strong action-space residual learning.</span>
              </div>
              <figure className="experiment-figure">
                <img
                  src="assets/noise-learning-curves.png"
                  width="4042"
                  height="800"
                  alt="Noise-space policy learning curves for CNDO and baselines on five simulation tasks."
                />
                <figcaption>
                  CNDO is the strongest noise-space method on average, improving both sample efficiency and final performance across the five tasks.
                </figcaption>
              </figure>
            </TabsContent>

            <TabsContent value="ablation" className="experiment-panel">
              <div className="experiment-panel-heading">
                <div>
                  <p>Experiment II</p>
                  <h3>Ablation Studies</h3>
                </div>
                <span>Both conservative value learning and gated execution are important for robust noise-space improvement.</span>
              </div>
              <figure className="experiment-figure">
                <img
                  src="assets/ablation-learning-curves.png"
                  width="4042"
                  height="800"
                  alt="Ablation learning curves for the conservative critic and gated execution components of CNDO."
                />
                <figcaption>
                  Removing either component reduces average NAUC, with the largest failures appearing on Transport and Peg Insertion.
                </figcaption>
              </figure>
            </TabsContent>

            <TabsContent value="cando" className="experiment-panel">
              <div className="experiment-panel-heading">
                <div>
                  <p>Experiment III</p>
                  <h3>Action-Noise Joint Residual Learning</h3>
                </div>
                <span>CANDO jointly exploits complementary improvements from noise and action spaces.</span>
              </div>
              <figure className="experiment-figure">
                <img
                  src="assets/joint-learning-curves.png"
                  width="4042"
                  height="800"
                  alt="Joint action-noise residual learning curves for CANDO and baselines on five simulation tasks."
                />
                <figcaption>
                  CANDO reaches 76.1 average NAUC and 91.4% final success rate, outperforming both single-space learners on average.
                </figcaption>
              </figure>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="page-shell section-block real-world-section" id="real-world-results">
        <h2 className="section-title">Real World Results</h2>
        <div className="real-world-space" aria-label="Real-world results intentionally left blank" />
      </section>

      <footer className="site-footer">
        <div className="page-shell">
          <p>
            Website structure and visual presentation inspired by the{' '}
            <a href="https://zhanyisun.github.io/dice.rl.2026/" target="_blank" rel="noreferrer">
              DICE-RL project page
            </a>
            .
          </p>
        </div>
      </footer>
    </main>
  );
}
