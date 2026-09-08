import {
  ArrowDown,
  FileText,
  GitCompareArrows,
  Layers3,
  ShieldCheck,
} from 'lucide-react';

const results = [
  { method: 'Base policy', space: 'Base', nauc: '—', final: '57.8' },
  { method: 'DSRL', space: 'Noise', nauc: '57.9', final: '66.2' },
  { method: 'LPS', space: 'Noise', nauc: '41.7', final: '50.2' },
  { method: 'LP-DS', space: 'Noise', nauc: '59.9', final: '60.5' },
  { method: 'CNDO', space: 'Noise', nauc: '69.5', final: '81.5', emphasis: 'soft' },
  { method: 'DICE', space: 'Action', nauc: '68.5', final: '87.3' },
  { method: 'DSRL + DICE', space: 'Joint', nauc: '68.0', final: '82.6' },
  { method: 'CANDO', space: 'Joint', nauc: '76.1', final: '91.4', emphasis: 'strong' },
];

const methodSteps = [
  {
    icon: Layers3,
    eyebrow: '01 · Direction',
    title: 'Edit the latent, not the backbone',
    body: 'CNDO learns a state- and noise-conditioned direction around each Gaussian anchor while the pretrained Flow Matching policy remains frozen.',
  },
  {
    icon: ShieldCheck,
    eyebrow: '02 · Decide',
    title: 'Execute only trusted edits',
    body: 'A conservative critic suppresses unsupported value estimates, while a target-critic-supervised gate chooses between the base and noise-edited actions.',
  },
  {
    icon: GitCompareArrows,
    eyebrow: '03 · Refine',
    title: 'Correct in action space',
    body: 'CANDO adds a post-decoding action residual and jointly optimizes both branches at the final edited action.',
  },
];

export default function Home() {
  return (
    <main>
      <header className="publication-hero">
        <div className="hero-glow hero-glow-left" aria-hidden="true" />
        <div className="hero-glow hero-glow-right" aria-hidden="true" />
        <div className="page-shell hero-inner">
          <p className="venue">ICRA · Anonymous Submission</p>
          <h1 className="publication-title">
            <span className="title-acronym">CANDO</span>
            <span className="title-colon">:</span>{' '}
            <span className="title-detail">
              Conservative Action-Noise Directional Optimization
              <span> for Residual Reinforcement Learning</span>
            </span>
          </h1>
          <p className="authors">Anonymous Authors</p>
          <div className="publication-links" aria-label="Project resources">
            <a className="resource-button" href="/cando-paper.pdf" target="_blank" rel="noreferrer">
              <FileText size={18} aria-hidden="true" />
              Paper
            </a>
            <a className="resource-button resource-button-light" href="#method">
              <ArrowDown size={18} aria-hidden="true" />
              Explore the method
            </a>
          </div>
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

      <section className="page-shell section-block hook-section" id="hook">
        <div className="section-heading-row">
          <h2 className="section-title">Hook</h2>
          <p className="section-kicker">Two intervention points. One stronger policy.</p>
        </div>
        <div className="hook-copy">
          <p>
            Residual reinforcement learning can intervene <strong>before decoding</strong> by steering the generative policy&apos;s input noise, or <strong>after decoding</strong> by correcting its action. The first route preserves structured generation; the second offers direct local control. But simply combining a weak noise learner with a strong action learner does not improve efficiency.
          </p>
          <p>
            CANDO starts by closing that capability gap with CNDO, then jointly optimizes both spaces so that each branch contributes where it is strongest.
          </p>
        </div>
        <figure className="paper-figure wide-figure">
          <img
            src="/assets/hook-motivation.png"
            width="1644"
            height="579"
            alt="Motivation comparing noise-space and action-space residual reinforcement learning and showing why naïve joint optimization is insufficient."
          />
          <figcaption>
            Noise-space steering modifies a frozen policy before decoding; action-space residual learning corrects the decoded action. Joint learning becomes useful only when both branches are capable learners.
          </figcaption>
        </figure>
      </section>

      <section className="page-shell section-block" id="method">
        <div className="section-heading-row">
          <h2 className="section-title">Method</h2>
          <p className="section-kicker">Conservative, gated, and jointly optimized.</p>
        </div>

        <div className="method-steps">
          {methodSteps.map(({ icon: Icon, eyebrow, title, body }) => (
            <article className="method-step" key={eyebrow}>
              <div className="step-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <p className="step-eyebrow">{eyebrow}</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>

        <div className="figure-stack">
          <figure className="paper-figure">
            <img
              src="/assets/noise-regulation.png"
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
              src="/assets/method-overview.png"
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
            <p className="section-kicker">Five tasks · three seeds · one frozen backbone per task.</p>
          </div>

          <div className="metric-strip" aria-label="Key results">
            <div className="metric-card metric-card-primary">
              <span className="metric-label">CANDO average NAUC</span>
              <strong>76.1</strong>
              <span className="metric-change">+6.6 over the best single-space result</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">Final success rate</span>
              <strong>91.4%</strong>
              <span className="metric-change">+4.1 points over DICE</span>
            </div>
            <div className="metric-card">
              <span className="metric-label">CNDO average NAUC</span>
              <strong>69.5</strong>
              <span className="metric-change">Competitive with action-space learning</span>
            </div>
          </div>

          <div className="results-figures">
            <figure className="paper-figure compact-figure">
              <div className="figure-label">Noise-space improvement</div>
              <img
                src="/assets/noise-results.png"
                width="1644"
                height="342"
                alt="Success-rate learning curves for noise-space methods on Can, Square, Transport, Peg Insertion and Stack Cube."
              />
              <figcaption>
                CNDO is the strongest noise-space method on average, raising NAUC from 57.9 for DSRL to 69.5.
              </figcaption>
            </figure>

            <figure className="paper-figure compact-figure">
              <div className="figure-label">Joint action-noise optimization</div>
              <img
                src="/assets/joint-results.png"
                width="1644"
                height="339"
                alt="Success-rate learning curves comparing single-space and joint residual methods across five tasks."
              />
              <figcaption>
                CANDO delivers the strongest average sample efficiency after CNDO closes the standalone gap to DICE.
              </figcaption>
            </figure>
          </div>

          <div className="result-table-wrap">
            <table className="result-table">
              <caption>Average performance across the five simulation tasks</caption>
              <thead>
                <tr>
                  <th scope="col">Method</th>
                  <th scope="col">Space</th>
                  <th scope="col">NAUC ↑</th>
                  <th scope="col">Final SR ↑</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr
                    key={row.method}
                    className={
                      row.emphasis === 'strong'
                        ? 'result-row-strong'
                        : row.emphasis === 'soft'
                          ? 'result-row-soft'
                          : undefined
                    }
                  >
                    <th scope="row">{row.method}</th>
                    <td>{row.space}</td>
                    <td>{row.nauc}</td>
                    <td>{row.final}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
