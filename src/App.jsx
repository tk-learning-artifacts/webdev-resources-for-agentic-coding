import { useState, useEffect } from "react";
import "./App.css";
import GitGithubLessons from "./GitGithubLessons";
import {
  gitLessonPages,
  gitLessonTitles,
} from "./gitLessonsData";

function PageNavigation({ backTitle, onBack, nextTitle, onNext }) {
  return (
    <div className="page-navigation" aria-label="Page navigation">
      <button className="page-navigation__button page-navigation__button--back" onClick={onBack}>
        <span className="page-navigation__direction">← Back</span>
        <span className="page-navigation__title">{backTitle}</span>
      </button>
      <button className="page-navigation__button page-navigation__button--next" onClick={onNext}>
        <span className="page-navigation__direction">Next →</span>
        <span className="page-navigation__title">{nextTitle}</span>
      </button>
    </div>
  );
}

const deploymentScenarios = [
  {
    id: "feature",
    label: "Push to feature/homepage",
    source: "feature/homepage",
    commit: "Homepage updates",
    destination: "Preview",
    environment: "Preview environment",
    url: "webdev-git-feature-homepage.vercel.app",
    result: "New Preview URL",
    tone: "preview",
  },
  {
    id: "pull-request",
    label: "Update a pull request",
    source: "PR #24",
    commit: "Latest review changes",
    destination: "Preview",
    environment: "Preview environment",
    url: "webdev-git-pr-24.vercel.app",
    result: "Updated Preview",
    tone: "preview",
  },
  {
    id: "main",
    label: "Push to main",
    source: "main",
    commit: "Direct production update",
    destination: "Production",
    environment: "Production environment",
    url: "webdev-git.vercel.app",
    result: "Production domain",
    tone: "production",
  },
  {
    id: "merge",
    label: "Merge a pull request into main",
    source: "PR #24 → main",
    commit: "Approved homepage",
    destination: "Production",
    environment: "Production environment",
    url: "webdev-git.vercel.app",
    result: "Production domain updated",
    tone: "production",
  },
];

function DeploymentFlowLab() {
  const [scenarioId, setScenarioId] = useState(null);
  const [phase, setPhase] = useState(-1);
  const scenario = deploymentScenarios.find(({ id }) => id === scenarioId) || deploymentScenarios[0];

  const runScenario = (nextId = scenario.id) => {
    setScenarioId(nextId);
    setPhase(0);
  };

  useEffect(() => {
    if (phase < 0 || phase >= 3) return undefined;

    const timer = window.setTimeout(
      () => setPhase((current) => current + 1),
      phase === 0 ? 350 : 850,
    );

    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <div className={`deployment-lab deployment-lab--${scenario.tone}`}>
      <div className="deployment-lab__header">
        <div>
          <span className="deployment-lab__eyebrow">TRY THE DEPLOYMENT FLOW</span>
          <h4>What happens after this Git action?</h4>
        </div>
        <p>Choose an action and follow it from GitHub to its website.</p>
      </div>

      <div className="deployment-lab__actions" aria-label="Choose a Git action">
        {deploymentScenarios.map((option) => (
          <button
            type="button"
            key={option.id}
            className={scenarioId === option.id ? "is-selected" : ""}
            aria-pressed={scenarioId === option.id}
            onClick={() => runScenario(option.id)}
          >
            <span aria-hidden="true">{option.id === "merge" ? "⑂" : "↑"}</span>
            {option.label}
          </button>
        ))}
      </div>

      <div className="deployment-lab__stage" aria-live="polite">
        <div className={`deployment-node deployment-node--github ${phase >= 1 ? "is-active" : ""}`}>
          <span className="deployment-node__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 2.7a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.3-2.3-.3-4.6-1.1-4.6-4.7 0-1 .4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.2 9.2 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.6 0 3.7-2.3 4.5-4.6 4.7.4.3.7 1 .7 1.9v2.7c0 .4.2.6.7.5A9.5 9.5 0 0 0 12 2.7Z" />
            </svg>
          </span>
          <span className="deployment-node__copy">
            <small>GITHUB</small>
            <strong>{scenario.source}</strong>
            <span>{phase >= 1 ? "Push received" : scenario.commit}</span>
          </span>
          {phase >= 1 && <span className="deployment-node__check" aria-hidden="true">✓</span>}
        </div>

        <div className={`deployment-connector ${phase >= 2 ? "is-active" : ""}`} aria-hidden="true">
          <span />
          <b>›</b>
        </div>

        <div className={`deployment-node deployment-node--vercel ${phase >= 2 ? "is-active" : ""}`}>
          <span className="deployment-node__icon deployment-node__icon--vercel" aria-hidden="true">▲</span>
          <span className="deployment-node__copy">
            <small>VERCEL</small>
            <strong>{phase === 2 ? "Building…" : "Build project"}</strong>
            <span>{phase >= 3 ? "Build successful" : phase >= 2 ? "Running npm run build" : "Waiting for GitHub"}</span>
          </span>
          {phase >= 3 && <span className="deployment-node__check" aria-hidden="true">✓</span>}
        </div>

        <div className={`deployment-connector ${phase >= 3 ? "is-active" : ""}`} aria-hidden="true">
          <span />
          <b>›</b>
        </div>

        <div className={`deployment-node deployment-node--result ${phase >= 3 ? "is-active" : ""}`}>
          <span className="deployment-node__icon" aria-hidden="true">
            {scenario.tone === "preview" ? "◉" : "●"}
          </span>
          <span className="deployment-node__copy">
            <small>{scenario.destination.toUpperCase()}</small>
            <strong>{scenario.result}</strong>
            <span>{scenario.environment}</span>
          </span>
        </div>
      </div>

      <div
        className={`deployment-lab__result ${phase >= 3 ? "is-visible" : ""}`}
        aria-hidden={phase < 3}
      >
        <div>
          <span className="deployment-lab__status">
            <i aria-hidden="true" />
            {scenario.environment}
          </span>
          <strong>{scenario.result}</strong>
        </div>
        <a href={`https://${scenario.url}`} target="_blank" rel="noreferrer" tabIndex={phase >= 3 ? 0 : -1}>
          <span>{scenario.url}</span>
          <span aria-hidden="true">↗</span>
        </a>
        <button
          type="button"
          onClick={() => runScenario()}
          aria-label="Replay this deployment"
          tabIndex={phase >= 3 ? 0 : -1}
        >
          ↻ Replay
        </button>
      </div>
    </div>
  );
}

const vscodeTourTools = [
  {
    id: "explorer",
    label: "Explorer",
    position: { left: "25%", top: "15%" },
    popoverSide: "right",
    explanation: "The Explorer shows the folders and files in your project. Select a file here to open it in the editor.",
  },
  {
    id: "other-views",
    label: "Other Views",
    position: { left: "25%", top: "75%" },
    popoverSide: "right",
    explanation: "Outline shows the structure of the current file. Timeline shows its history, including saves and source-control changes.",
  },
  {
    id: "source-control",
    label: "Source Control",
    position: { left: "3%", top: "28%" },
    popoverSide: "right",
    explanation: "Source Control opens a side panel where you can see which files changed, review those changes, and prepare a Git commit.",
  },
  {
    id: "terminal",
    label: "Integrated Terminal",
    position: { left: "68%", top: "84%" },
    popoverSide: "left",
    explanation: "The integrated terminal lets you run commands, install packages, start development servers, and view command output without leaving VS Code.",
  },
  {
    id: "chatbox",
    label: "Chatbox",
    position: { left: "72%", top: "16%" },
    popoverSide: "left",
    explanation: "Copilot Chat provides a place to ask questions about code, request explanations, and get help while working on a project.",
  },
];

const gitFlowSlides = [
  {
    title: "Edit the file",
    command: "Edit index.html",
    image: new URL("../images/gitflow1.png", import.meta.url).href,
    alt: "VS Code showing index.html as a new untracked file before it is staged.",
    explanation: "The U badge means index.html is untracked. Git can see the new file, but it is not ready to commit yet.",
    highlightTone: "red",
    highlights: [
      { label: "Untracked index.html file", style: { left: "5.4%", top: "10.4%", width: "22.2%", height: "6.6%" } },
    ],
  },
  {
    title: "Stage the change",
    command: "git add index.html",
    image: new URL("../images/gitflow2.png", import.meta.url).href,
    alt: "VS Code showing index.html under Staged Changes after git add index.html.",
    explanation: "git add moves index.html into Staged Changes. It is now selected for the next commit.",
    highlightTone: "red",
    highlights: [
      { label: "Staged Changes section", style: { left: "4.7%", top: "28.4%", width: "24.3%", height: "12.5%" } },
      { label: "git add command", style: { left: "30.7%", top: "80.8%", width: "35.5%", height: "6.4%" } },
    ],
  },
  {
    title: "Commit the change",
    command: 'git commit -m "created index.html file"',
    image: new URL("../images/gitflow3.png", import.meta.url).href,
    alt: "VS Code showing a successful commit and no files left in Staged Changes.",
    explanation: "The commit saves the staged file as a snapshot. The zero badges confirm there are no changes left to commit.",
    highlightTone: "red",
    highlights: [
      { label: "Clean change lists", style: { left: "5.4%", top: "29.7%", width: "23.2%", height: "11%" } },
      { label: "git commit command and output", style: { left: "30.7%", top: "76.8%", width: "53.5%", height: "14.2%" } },
    ],
  },
];

const actionStepOptions = [
  {
    id: "checkout",
    label: "Checkout",
    yaml: "      - uses: actions/checkout@v4",
    detail: "Repository ready",
  },
  {
    id: "install",
    label: "Install",
    yaml: "      - run: npm install",
    detail: "Dependencies installed",
  },
  {
    id: "test",
    label: "Test",
    yaml: "      - run: npm test",
    detail: "Tests passed",
  },
  {
    id: "build",
    label: "Build",
    yaml: "      - run: npm run build",
    detail: "Build completed",
  },
];

function ActionsWorkflowBuilder() {
  const [trigger, setTrigger] = useState("");
  const [runner, setRunner] = useState("");
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [runSteps, setRunSteps] = useState([]);
  const [runIndex, setRunIndex] = useState(-1);
  const [runStatus, setRunStatus] = useState("idle");
  const [challengeFixed, setChallengeFixed] = useState(false);

  const toggleStep = (stepId) => {
    setRunStatus("idle");
    setRunIndex(-1);
    setSelectedSteps((current) =>
      current.includes(stepId)
        ? current.filter((id) => id !== stepId)
        : actionStepOptions
            .filter((step) => [...current, stepId].includes(step.id))
            .map((step) => step.id),
    );
  };

  const startWorkflow = () => {
    if (!trigger || !runner || !selectedSteps.length || runStatus === "running") return;
    setRunSteps(selectedSteps);
    setRunIndex(0);
    setRunStatus("running");
  };

  useEffect(() => {
    if (runStatus !== "running" || runIndex < 0) return undefined;

    const timer = window.setTimeout(() => {
      if (runIndex === runSteps.length - 1) {
        setRunStatus("success");
        setRunIndex(runSteps.length);
      } else {
        setRunIndex((current) => current + 1);
      }
    }, 650);

    return () => window.clearTimeout(timer);
  }, [runIndex, runStatus, runSteps.length]);

  const yaml = [
    "name: CI",
    trigger ? `on: [${trigger}]` : "# Select a trigger",
    "jobs:",
    "  build:",
    runner ? `    runs-on: ${runner}` : "    # Select a runner",
    "    steps:",
    ...(selectedSteps.length
      ? actionStepOptions
          .filter((step) => selectedSteps.includes(step.id))
          .map((step) => step.yaml)
      : ["      # Select at least one step"]),
  ].join("\n");

  return (
    <div className="actions-builder" aria-labelledby="actions-builder-title">
      <div className="actions-builder__heading">
        <div>
          <span>BUILD IT YOURSELF</span>
          <h4 id="actions-builder-title">Create a workflow</h4>
        </div>
        <p>Select the blocks. Your YAML updates instantly.</p>
      </div>

      <div className="actions-builder__workspace">
        <div className="actions-builder__controls">
          <fieldset>
            <legend>Trigger</legend>
            <div className="actions-choice-row">
              {[
                ["push", "Push"],
                ["pull_request", "Pull Request"],
              ].map(([value, label]) => (
                <button
                  type="button"
                  className={trigger === value ? "is-selected" : ""}
                  aria-pressed={trigger === value}
                  onClick={() => {
                    setTrigger(value);
                    setRunStatus("idle");
                    setRunIndex(-1);
                  }}
                  key={value}
                >
                  <span className="actions-choice__icon" aria-hidden="true">{"{ }"}</span>
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Runner</legend>
            <div className="actions-choice-row">
              {[
                ["ubuntu-latest", "Ubuntu"],
                ["windows-latest", "Windows"],
              ].map(([value, label]) => (
                <button
                  type="button"
                  className={runner === value ? "is-selected" : ""}
                  aria-pressed={runner === value}
                  onClick={() => {
                    setRunner(value);
                    setRunStatus("idle");
                    setRunIndex(-1);
                  }}
                  key={value}
                >
                  <span className="actions-choice__dot" aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Steps</legend>
            <div className="actions-step-grid">
              {actionStepOptions.map((step, index) => {
                const isSelected = selectedSteps.includes(step.id);
                const runPosition = runSteps.indexOf(step.id);
                const isComplete =
                  runStatus === "success" ||
                  (runStatus === "running" && runPosition >= 0 && runPosition < runIndex);
                const isRunning =
                  runStatus === "running" && runPosition === runIndex;

                return (
                  <button
                    type="button"
                    className={`${isSelected ? "is-selected" : ""} ${isComplete ? "is-complete" : ""} ${isRunning ? "is-running" : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => toggleStep(step.id)}
                    key={step.id}
                  >
                    <span aria-hidden="true">
                      {isComplete ? "✓" : index + 1}
                    </span>
                    <span>
                      <strong>{step.label}</strong>
                      <small>
                        {isRunning ? "Running…" : isComplete ? step.detail : "Add step"}
                      </small>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <button
            type="button"
            className={`actions-run-button ${runStatus === "success" ? "is-success" : ""}`}
            onClick={startWorkflow}
            disabled={!trigger || !runner || !selectedSteps.length || runStatus === "running"}
          >
            <span aria-hidden="true">{runStatus === "success" ? "✓" : "▶"}</span>
            {runStatus === "running"
              ? "Workflow running…"
              : runStatus === "success"
                ? "All checks passed"
                : "Run workflow"}
          </button>
        </div>

        <div className="actions-yaml">
          <div className="actions-yaml__bar">
            <span><i aria-hidden="true" /> ci.yml</span>
            <small>LIVE YAML</small>
          </div>
          <pre aria-live="polite">{yaml}</pre>
          <div className={`actions-run-status is-${runStatus}`} role="status">
            <span aria-hidden="true">
              {runStatus === "success" ? "✓" : runStatus === "running" ? "●" : "○"}
            </span>
            {runStatus === "success"
              ? "Workflow completed successfully"
              : runStatus === "running"
                ? `Running ${actionStepOptions.find((step) => step.id === runSteps[runIndex])?.label || "workflow"}`
                : !trigger && !runner && !selectedSteps.length
                  ? "Choose blocks to begin"
                  : `${selectedSteps.length} step${selectedSteps.length === 1 ? "" : "s"} ready`}
          </div>
        </div>
      </div>

      <details className="actions-challenge" onToggle={(event) => {
        if (!event.currentTarget.open) setChallengeFixed(false);
      }}>
        <summary>
          <span>
            <strong>Challenge</strong>
            Fix a broken workflow
          </span>
          <small>npm test is running too soon</small>
        </summary>
        <div className="actions-challenge__content">
          <div className="actions-challenge__steps">
            <code>1&nbsp; checkout</code>
            <code className={challengeFixed ? "" : "is-broken"}>
              2&nbsp; {challengeFixed ? "npm install" : "npm test"}
            </code>
            <code className={challengeFixed ? "" : "is-broken"}>
              3&nbsp; {challengeFixed ? "npm test" : "npm install"}
            </code>
          </div>
          <button type="button" onClick={() => setChallengeFixed(true)} disabled={challengeFixed}>
            {challengeFixed ? "✓ Order fixed" : "Move npm install before test"}
          </button>
        </div>
        {challengeFixed && (
          <p className="actions-challenge__success" role="status">
            Correct! Dependencies must be installed before the tests can use them.
          </p>
        )}
      </details>
    </div>
  );
}

function GitWorkflowActivity() {
  const [slideIndex, setSlideIndex] = useState(0);
  const currentSlide = gitFlowSlides[slideIndex];

  const moveSlide = (direction) => {
    setSlideIndex((current) =>
      (current + direction + gitFlowSlides.length) % gitFlowSlides.length,
    );
  };

  return (
    <div className="git-practice git-slideshow" aria-labelledby="git-practice-title">
      <div className="git-practice__header">
        <div>
          <span className="git-practice__eyebrow">CLICK THROUGH THE WORKFLOW</span>
          <h4 id="git-practice-title">See what Git changes</h4>
          <p>Watch the highlighted areas as the file moves forward.</p>
        </div>
        <span className="git-practice__counter">
          {slideIndex + 1} / {gitFlowSlides.length}
        </span>
      </div>

      <div className="git-slideshow__stage">
        <button
          type="button"
          className="git-slideshow__arrow git-slideshow__arrow--previous"
          aria-label="Show previous Git stage"
          onClick={() => moveSlide(-1)}
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className="git-slideshow__image" key={currentSlide.image}>
          <img src={currentSlide.image} alt={currentSlide.alt} />
          {currentSlide.highlights.map((highlight) => (
            <span
              className={`git-slideshow__highlight ${currentSlide.highlightTone === "red" ? "is-red" : ""}`}
              style={highlight.style}
              key={highlight.label}
              aria-hidden="true"
            />
          ))}
        </div>

        <button
          type="button"
          className="git-slideshow__arrow git-slideshow__arrow--next"
          aria-label="Show next Git stage"
          onClick={() => moveSlide(1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div className="git-slideshow__caption" aria-live="polite">
        <span className="git-slideshow__step">{slideIndex + 1}</span>
        <div>
          <strong>{currentSlide.title}</strong>
          <code>{currentSlide.command}</code>
          <p>{currentSlide.explanation}</p>
        </div>
      </div>

      <div className="git-slideshow__tabs" aria-label="Choose a Git stage">
        {gitFlowSlides.map((item, index) => (
          <button
            type="button"
            className={index === slideIndex ? "is-active" : ""}
            aria-current={index === slideIndex ? "step" : undefined}
            onClick={() => setSlideIndex(index)}
            key={item.title}
          >
            <span>{index + 1}</span>
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}

const debuggingEvidence = {
  build: {
    label: "Build logs",
    hint: "Did the project build successfully?",
    lines: [
      { time: "14:02:11", text: "Running build in Washington, D.C., USA (East)" },
      { time: "14:02:12", text: "Running “npm run build”" },
      { time: "14:02:18", text: "✓ 42 modules transformed." },
      { time: "14:02:19", text: "Build Completed in /vercel/output [7s]" },
    ],
  },
  runtime: {
    label: "Runtime logs",
    hint: "Which line explains the 500 response?",
    lines: [
      { time: "14:04:02", text: "GET / 200 in 46ms" },
      { time: "14:04:08", text: "GET /api/checkout 500 in 183ms" },
      {
        time: "14:04:08",
        text: "Error: STRIPE_SECRET_KEY is not defined",
        important: true,
      },
      { time: "14:04:08", text: "at createCheckoutSession (/api/checkout.js:18:9)" },
    ],
  },
  deployment: {
    label: "Deployment information",
    hint: "What changed in this release?",
    details: [
      ["Status", "Ready"],
      ["Environment", "Production"],
      ["Commit", "Add checkout flow (a31f9c2)"],
      ["Deployed", "2 minutes ago"],
      ["Previous", "Homepage refresh (7be21d0) · Healthy"],
    ],
  },
};

const debuggingDecisions = {
  fix: {
    label: "Fix and redeploy",
    tone: "recommended",
    title: "Best choice for this scenario",
    result:
      "Add STRIPE_SECRET_KEY to the Production environment, test the fix in Preview, then redeploy. The checkout route should return a successful response without removing the new feature.",
  },
  rollback: {
    label: "Roll back",
    tone: "safe",
    title: "A safe emergency response",
    result:
      "Production returns to the previous healthy deployment, so visitors can use the site again. Checkout remains unavailable until you fix the missing variable and deploy a corrected release.",
  },
  ignore: {
    label: "Ignore the error",
    tone: "danger",
    title: "The incident continues",
    result:
      "Visitors keep receiving a 500 error on checkout. The deployment may say “Ready,” but the runtime failure is still affecting production and needs action.",
  },
};

function VercelDebuggingActivity() {
  const [activeEvidence, setActiveEvidence] = useState("build");
  const [selectedLine, setSelectedLine] = useState(null);
  const [decision, setDecision] = useState(null);
  const evidence = debuggingEvidence[activeEvidence];
  const outcome = decision ? debuggingDecisions[decision] : null;
  const foundError = selectedLine === "runtime-2";

  const resetActivity = () => {
    setActiveEvidence("build");
    setSelectedLine(null);
    setDecision(null);
  };

  return (
    <div className="debug-scenario" aria-labelledby="debug-scenario-title">
      <div className="debug-scenario__header">
        <div>
          <span className="debug-scenario__eyebrow">INCIDENT SIMULATION</span>
          <h4 id="debug-scenario-title">The deployment completed—but visitors receive a 500 error</h4>
        </div>
        <span className="debug-scenario__incident">
          <i aria-hidden="true" />
          Production incident
        </span>
      </div>

      <div className="debug-scenario__prompt">
        <span>1</span>
        <p><strong>Inspect the evidence.</strong> Open each source, then select the line that identifies the cause.</p>
      </div>

      <div className="debug-console">
        <div className="debug-console__tabs" role="tablist" aria-label="Deployment evidence">
          {Object.entries(debuggingEvidence).map(([id, item]) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeEvidence === id}
              className={activeEvidence === id ? "is-active" : ""}
              onClick={() => setActiveEvidence(id)}
              key={id}
            >
              <span aria-hidden="true">
                {id === "build" ? "⌁" : id === "runtime" ? "›_" : "ⓘ"}
              </span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="debug-console__panel" role="tabpanel">
          <div className="debug-console__panel-heading">
            <strong>{evidence.label}</strong>
            <span>{evidence.hint}</span>
          </div>

          {evidence.lines && (
            <div className="debug-console__lines">
              {evidence.lines.map((line, index) => {
                const lineId = `${activeEvidence}-${index}`;
                const isSelected = selectedLine === lineId;
                return (
                  <button
                    type="button"
                    className={`${isSelected ? "is-selected" : ""} ${line.important && isSelected ? "is-important" : ""}`}
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedLine(lineId);
                      setDecision(null);
                    }}
                    key={`${line.time}-${line.text}`}
                  >
                    <time>{line.time}</time>
                    <code>{line.text}</code>
                    {line.important && isSelected && <span>CAUSE FOUND</span>}
                  </button>
                );
              })}
            </div>
          )}

          {evidence.details && (
            <dl className="debug-console__details">
              {evidence.details.map(([term, description]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {selectedLine && !foundError && (
        <p className="debug-scenario__feedback is-hint" role="status">
          That line provides context, but it does not explain the failure. Check the runtime logs for the first specific error message.
        </p>
      )}

      {foundError && (
        <p className="debug-scenario__feedback is-correct" role="status">
          <strong>Cause identified:</strong> the checkout function is missing its <code>STRIPE_SECRET_KEY</code> environment variable.
        </p>
      )}

      <div className={`debug-decision ${foundError ? "is-ready" : ""}`}>
        <div className="debug-scenario__prompt">
          <span>2</span>
          <p><strong>Choose a response.</strong> What should the team do next?</p>
        </div>
        <div className="debug-decision__choices">
          {Object.entries(debuggingDecisions).map(([id, item]) => (
            <button
              type="button"
              disabled={!foundError}
              aria-pressed={decision === id}
              className={decision === id ? "is-selected" : ""}
              onClick={() => setDecision(id)}
              key={id}
            >
              <span aria-hidden="true">{id === "fix" ? "↗" : id === "rollback" ? "↶" : "×"}</span>
              {item.label}
            </button>
          ))}
        </div>
        {!foundError && <small>Select the important error line to unlock these decisions.</small>}
      </div>

      {outcome && (
        <div className={`debug-outcome debug-outcome--${outcome.tone}`} role="status">
          <div>
            <span aria-hidden="true">
              {decision === "fix" ? "✓" : decision === "rollback" ? "↶" : "!"}
            </span>
            <div>
              <small>RESULT OF: {outcome.label.toUpperCase()}</small>
              <strong>{outcome.title}</strong>
            </div>
          </div>
          <p>{outcome.result}</p>
          <button type="button" onClick={resetActivity}>Try again</button>
        </div>
      )}
    </div>
  );
}

const planBlocks = [
  {
    id: "goal",
    label: "Goal",
    icon: "◎",
    content: "Build a responsive study-timer page for students.",
    hint: "What outcome should the agent deliver?",
  },
  {
    id: "context",
    label: "Context",
    icon: "◇",
    content: "The project uses React and the existing purple course design system.",
    hint: "What should the agent know before it starts?",
  },
  {
    id: "steps",
    label: "Steps",
    icon: "☷",
    content: "1. Inspect existing components\n2. Build the timer\n3. Add responsive styles\n4. Test the interactions",
    hint: "What sequence will the agent follow?",
  },
  {
    id: "files",
    label: "Files",
    icon: "▤",
    content: "Edit: src/App.jsx and src/App.css\nDo not change: package.json",
    hint: "What is in scope—and what is protected?",
  },
  {
    id: "checks",
    label: "Checks",
    icon: "✓",
    content: "Run npm run build. Confirm start, pause, reset, and mobile layout.",
    hint: "How will we know the task is complete?",
  },
];

function PlanModeBuilder() {
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);

  const toggleBlock = (id) => {
    setChecked(false);
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : planBlocks.filter((item) => [...current, id].includes(item.id)).map((item) => item.id),
    );
  };

  const complete = selected.length === planBlocks.length;

  return (
    <div className="plan-builder">
      <div className="plan-builder__heading">
        <div>
          <span>HANDS-ON EXERCISE</span>
          <h4>Build a plan.md</h4>
        </div>
        <p>Choose each planning block. Watch the document take shape.</p>
      </div>

      <div className="plan-builder__workspace">
        <div className="plan-builder__controls">
          {planBlocks.map((block, index) => (
            <button
              type="button"
              className={selected.includes(block.id) ? "is-selected" : ""}
              aria-pressed={selected.includes(block.id)}
              onClick={() => toggleBlock(block.id)}
              key={block.id}
            >
              <span className="plan-builder__number">{selected.includes(block.id) ? "✓" : index + 1}</span>
              <span className="plan-builder__button-copy">
                <strong>{block.label}</strong>
                <small>{block.hint}</small>
              </span>
              <span aria-hidden="true">{block.icon}</span>
            </button>
          ))}
          <button
            type="button"
            className="plan-builder__check"
            disabled={!complete}
            onClick={() => setChecked(true)}
          >
            {checked ? "✓ Plan ready to use" : "Check my plan"}
          </button>
        </div>

        <div className="plan-document">
          <div className="plan-document__bar">
            <span><i /> plan.md</span>
            <small>{selected.length} / {planBlocks.length} PARTS</small>
          </div>
          <div className="plan-document__body" aria-live="polite">
            <h5># Implementation plan</h5>
            {!selected.length && <p className="plan-document__empty">Select a block to begin your plan.</p>}
            {planBlocks.filter((block) => selected.includes(block.id)).map((block) => (
              <section key={block.id}>
                <strong>## {block.label}</strong>
                <pre>{block.content}</pre>
              </section>
            ))}
          </div>
          <div className={`plan-document__status ${checked ? "is-complete" : ""}`} role="status">
            <span>{checked ? "✓" : "○"}</span>
            {checked
              ? "Clear, scoped, and testable"
              : complete
                ? "All parts added—check your plan"
                : `${planBlocks.length - selected.length} part${planBlocks.length - selected.length === 1 ? "" : "s"} still needed`}
          </div>
        </div>
      </div>
    </div>
  );
}

const debugSteps = [
  {
    id: "spot",
    label: "Read the error",
    short: "Error",
    instruction: "Find the exact message in the console.",
  },
  {
    id: "understand",
    label: "Understand it",
    short: "Meaning",
    instruction: "Translate the technical message into plain language.",
  },
  {
    id: "ask",
    label: "Ask AI",
    short: "Explain",
    instruction: "Give the AI the error, relevant code, and what you expected.",
  },
  {
    id: "fix",
    label: "Apply a fix",
    short: "Fix",
    instruction: "Make the smallest change that addresses the cause.",
  },
  {
    id: "test",
    label: "Test again",
    short: "Test",
    instruction: "Repeat the action and check for regressions.",
  },
];

function AgenticDebugLab() {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const actions = [
    {
      title: "Spot the useful clue",
      copy: "The preview is blank. The console points to line 12: “ReferenceError: tasks is not defined”.",
      action: "Highlight the error",
    },
    {
      title: "Say what it means",
      copy: "The page is trying to read a variable named tasks, but that variable has not been created in this scope.",
      action: "I understand",
    },
    {
      title: "Give AI enough context",
      copy: "“My React page is blank. Console: ReferenceError: tasks is not defined at TaskList.jsx:12. Here is the component. Explain the cause and suggest the smallest fix.”",
      action: "Send clear prompt",
    },
    {
      title: "Review the suggested change",
      copy: "Define the missing variable before using it: const tasks = [{ id: 1, title: \"Review Git notes\" }, { id: 2, title: \"Finish prompt exercise\" }]; Then tasks.map(...) has a real array to read.",
      action: "Apply reviewed fix",
    },
    {
      title: "Run the same check",
      copy: "Reload the preview, add a task, mark it complete, and confirm the console stays clear.",
      action: "Run test",
    },
  ];

  const advance = () => {
    if (step === debugSteps.length - 1) setComplete(true);
    else setStep((current) => current + 1);
  };

  const reset = () => {
    setStep(0);
    setComplete(false);
  };

  return (
    <div className="agent-debug-lab">
      <div className="agent-debug-lab__heading">
        <div>
          <span>GUIDED DEBUGGING LAB</span>
          <h4>Rescue the broken task list</h4>
        </div>
        <p>Work through one evidence-based step at a time.</p>
      </div>

      <ol className="debug-workflow" aria-label="Debugging workflow">
        {debugSteps.map((item, index) => (
          <li className={`${index === step && !complete ? "is-active" : ""} ${index < step || complete ? "is-done" : ""}`} key={item.id}>
            <span>{index < step || complete ? "✓" : index + 1}</span>
            <strong>{item.short}</strong>
          </li>
        ))}
      </ol>

      <div className="debug-mockup">
        <div className="debug-mockup__browser">
          <div className="debug-mockup__bar"><i /><i /><i /><span>localhost:5173/tasks</span></div>
          <div className="debug-mockup__page">
            <div>
              <small>TODAY</small>
              <h5>My study tasks</h5>
            </div>
            <div className={`debug-mockup__broken ${complete ? "is-fixed" : ""}`}>
              {complete ? (
                <>
                  <label><input type="checkbox" /> Review Git notes</label>
                  <label><input type="checkbox" /> Finish prompt exercise</label>
                </>
              ) : (
                <p>Something went wrong while loading tasks.</p>
              )}
            </div>
          </div>
          <div className={`debug-mockup__console ${step === 0 ? "is-highlighted" : ""}`}>
            <span>Console</span>
            <code>{complete ? "✓ Page rendered with 2 tasks. No errors." : "ReferenceError: tasks is not defined  TaskList.jsx:12"}</code>
          </div>
        </div>

        <aside className="debug-coach" aria-live="polite">
          {complete ? (
            <>
              <span className="debug-coach__step">LAB COMPLETE</span>
              <h5>Bug fixed and verified</h5>
              <p>You used the error as evidence, reviewed the AI suggestion, and tested the behaviour again.</p>
              <button type="button" onClick={reset}>Try again</button>
            </>
          ) : (
            <>
              <span className="debug-coach__step">STEP {step + 1} OF {debugSteps.length}</span>
              <h5>{actions[step].title}</h5>
              <p>{debugSteps[step].instruction}</p>
              <blockquote>{actions[step].copy}</blockquote>
              <button type="button" onClick={advance}>{actions[step].action} →</button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

function HmrDemo() {
  const [draft, setDraft] = useState("Hello, Vite!");
  const [preview, setPreview] = useState("Hello, Vite!");
  const [updated, setUpdated] = useState(false);

  const saveChange = () => {
    setPreview(draft || " ");
    setUpdated(true);
    window.setTimeout(() => setUpdated(false), 900);
  };

  return (
    <div className="hmr-demo">
      <div className="hmr-demo__heading">
        <div><span>TRY HMR</span><h4>Change, save, update</h4></div>
        <p>Edit the heading, then save the file.</p>
      </div>
      <div className="hmr-demo__workspace">
        <div className="hmr-editor">
          <div className="hmr-window-bar"><span><i /><i /><i /></span><strong>App.jsx</strong></div>
          <label htmlFor="hmr-heading">Heading text</label>
          <div className="hmr-code-line"><span>1</span><code>&lt;h1&gt;</code><input id="hmr-heading" value={draft} onChange={(event) => setDraft(event.target.value)} /><code>&lt;/h1&gt;</code></div>
          <button type="button" onClick={saveChange}>Save App.jsx</button>
        </div>
        <div className={`hmr-browser ${updated ? "is-updated" : ""}`}>
          <div className="hmr-window-bar"><span><i /><i /><i /></span><strong>localhost:5173</strong></div>
          <div className="hmr-browser__page">
            <small>LIVE PREVIEW</small>
            <h4>{preview}</h4>
            <p>The rest of this page stays in place.</p>
          </div>
          <div className="hmr-browser__status" role="status">
            {updated ? "✓ Module updated instantly" : "Waiting for a saved change"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WebDevToolchain101() {
  const [slide, setSlide] = useState(() => window.location.hash.slice(1) || "slide1");
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [answers, setAnswers] = useState(() => Array(16).fill(null));
  const [graded, setGraded] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizDirection, setQuizDirection] = useState("next");
  const [activeVscodeTool, setActiveVscodeTool] = useState(null);
  const [exploredVscodeTools, setExploredVscodeTools] = useState(() => new Set());
  const [raceDraft, setRaceDraft] = useState({
    role: "",
    action: "",
    context: "",
    expectation: "",
  });

  useEffect(() => {
    const followBrowserNavigation = () => {
      setSlide(window.location.hash.slice(1) || "slide1");
      window.scrollTo({ top: 0 });
    };

    window.addEventListener("hashchange", followBrowserNavigation);
    return () => window.removeEventListener("hashchange", followBrowserNavigation);
  }, []);

  const menuSections = [
    {
      title: "Agentic Coding",
      slide: "slideAgentic",
      pages: [
        { label: "Overview", target: "agentic-overview" },
        { label: "Coding Agents & AI Builders", slide: "slideAgents", target: "agents-overview" },
        { label: "Prompt Engineering", slide: "slidePrompts", target: "prompts-overview" },
        { label: "Plan Mode", slide: "slidePlanMode", target: "plan-mode-overview" },
        { label: "Debugging with AI", slide: "slideAgentDebug", target: "agent-debugging-overview" },
      ],
    },
    {
      title: "VS Code Basics",
      slide: "slideVSCode",
      pages: [
        { label: "VS Code Basics", target: "vscode-overview" },
      ],
    },
    {
      title: "Git & GitHub",
      slide: "gitOverview",
      pages: gitLessonPages,
    },
    {
      title: "Vite",
      slide: "slide5",
      pages: [
        { label: "Overview", target: "vite-overview" },
        { label: "Live Preview & HMR", slide: "slideViteDev", target: "vite-dev-server" },
        { label: "npm & Dependencies", slide: "slideViteNpm", target: "vite-npm" },
        { label: "Assets & Modules", slide: "slideViteAssets", target: "vite-assets" },
        { label: "Build & Deployment", slide: "slideViteBuild", target: "vite-build" },
        { label: "Why Vite?", slide: "slideViteWhy", target: "vite-why" },
      ],
    },
    {
      title: "Vercel",
      slide: "slide9",
      pages: [
        { label: "Overview", target: "vercel-overview" },
        { label: "Connect GitHub to Vercel", slide: "slideVercelSetup", target: "vercel-setup" },
        { label: "From Git Commit to Deployment", slide: "slideVercelGit", target: "vercel-git-overview" },
        { label: "Debugging on Vercel", slide: "slideVercelDebug", target: "vercel-debugging" },
      ],
    },
    {
      title: "Knowledge check",
      slide: "slide6",
      pages: [
        { label: "Ready for a Quiz?", target: "quiz-intro" },
        { label: "Quiz — Multiple Choice", slide: "slide7", target: "quiz-questions" },
        { label: "Great job!", slide: "slide8", target: "course-complete" },
      ],
    },
  ];

  const quiz = [
    { q: 'What is Vercel used for?', opts: ['Hosting websites easily','Writing backend APIs only','Designing UI mockups','Running Python locally'], a: 0 },
    { q: 'What is Git mainly used for?', opts: ['Creating graphics','Version control','Hosting servers','Writing HTML'], a: 1 },
    { q: 'What is a repository?', opts: ['A type of database','A project folder tracked by Git','A theme for VS Code','A hardware tool'], a: 1 },
    { q: 'What is a Git commit?', opts: ['A saved snapshot of your project','A backup to Google Drive','A system update','A security scan'], a: 0 },
    { q: 'What does GitHub provide?', opts: ['Cloud hosting for Git repos','Game creation tools','Image editing','Audio mixing'], a: 0 },
    { q: 'What is a Pull Request?', opts: ['A request to download files','A request to review and merge code','A request to delete a branch','A request to clone a repo'], a: 1 },
    { q: 'What does CI/CD stand for?', opts: ['Code Inspection / Code Definition','Continuous Integration / Continuous Deployment','Central Input / Command Delivery','Core Installation / Client Debug'], a: 1 },
    { q: 'What do GitHub Actions automate?', opts: ['Music playback','Development tasks like testing and deployment','Web browsing','Typing code for you'], a: 1 },
    { q: 'Which file format is used for GitHub Actions workflows?', opts: ['DOCX','PDF','YAML','CSV'], a: 2 },
    { q: 'What is a workflow trigger?', opts: ['An error message','Something that starts a workflow','A website link','A server crash'], a: 1 },
    { q: 'What is Vite?', opts: ['A code editor','A fast frontend build tool','A type of server hardware','A CSS library'], a: 1 },
    { q: 'What does HMR stand for?', opts: ['Hyper Memory Reader','Hot Module Reloading','High-Level Machine Runtime','Horizontal Module Restructure'], a: 1 },
    { q: 'Which command starts a Vite dev server?', opts: ['npm run dev','vite-boot','start-vite-now','yarn refresh'], a: 0 },
    { q: 'What are dependencies?', opts: ['Extra code packages your project needs','Unused files','Browser settings','Password files'], a: 0 },
    { q: 'What is bundling in Vite?', opts: ['Compressing images','Combining project files into optimized output','Downloading Node.js','Duplicating code for safety'], a: 1 },
    { q: 'What is a branch in Git?', opts: ['A type of folder','A separate line of development','A backup file','A deleted commit'], a: 1 }
  ];

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navigateFromMenu = (nextSlide, target) => {
    setSlide(nextSlide);
    window.location.hash = nextSlide;
    setMenuOpen(false);

    window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const goToSlide = (nextSlide) => {
    setSlide(nextSlide);
    window.location.hash = nextSlide;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moveQuiz = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= quiz.length) return;
    setQuizDirection(nextIndex > quizIndex ? "next" : "previous");
    setQuizIndex(nextIndex);
  };

  const exploreVscodeTool = (toolId) => {
    setActiveVscodeTool(toolId);
    setExploredVscodeTools((current) => {
      const updated = new Set(current);
      updated.add(toolId);
      return updated;
    });
  };

  const selectAnswer = (qIndex, optIndex) => {
    const copy = [...answers];
    copy[qIndex] = optIndex;
    setAnswers(copy);
  };

  const gradeQuiz = () => setGraded(true);
  const resetQuiz = () => {
    setAnswers(Array(quiz.length).fill(null));
    setGraded(false);
    setQuizIndex(0);
    setQuizDirection("previous");
  };

  const explanations = [
    'Vercel is used to easily deploy websites from GitHub repositories.',
    'Git tracks changes to code so you can go back in time and avoid losing work.',
    'A repository (repo) is a project folder tracked by Git, storing all changes.',
    'A commit saves a snapshot of your project at a specific moment.',
    'GitHub stores your Git repos online and helps you collaborate with others.',
    'A Pull Request lets teammates review your changes before merging them.',
    'CI/CD means automatically testing and deploying code whenever updates happen.',
    'GitHub Actions automate tasks like testing, building, and deploying code.',
    'GitHub Actions workflows are written in YAML, a structured text format.',
    'A trigger is an event like a push or pull request that starts a workflow.',
    'Vite is a fast development tool that runs your project instantly as you code.',
    'HMR updates your website instantly without refreshing the page.',
    'npm run dev starts the Vite development server.',
    'Dependencies are extra packages your project needs to work.',
    'Bundling means combining many files into optimized output for browsers.',
    'A branch is a separate area where you can work without affecting the main project.'
  ];

  const score = answers.filter((a, i) => a === quiz[i].a).length;
  const currentQuizItem = quiz[quizIndex];
  const selectedVscodeTool = vscodeTourTools.find(
    (tool) => tool.id === activeVscodeTool,
  );
  const vscodeTourComplete =
    exploredVscodeTools.size === vscodeTourTools.length;
  const headerTitles = {
    slide1: "Web Dev Toolchain 101",
    slideVSCode: "VS Code",
    ...gitLessonTitles,
    slide5: "Vite",
    slideViteDev: "Vite · Live Preview & HMR",
    slideViteNpm: "Vite · npm & Dependencies",
    slideViteAssets: "Vite · Assets & Modules",
    slideViteBuild: "Vite · Build & Deployment",
    slideViteWhy: "Vite · Why Vite?",
    slide9: "Vercel",
    slideVercelSetup: "Vercel · Connect GitHub",
    slideVercelGit: "Vercel",
    slideVercelDebug: "Vercel Debugging",
    slideAgentic: "Agentic Coding",
    slideAgents: "Coding Agents & AI Builders",
    slidePrompts: "Prompt Engineering",
    slidePlanMode: "Plan Mode",
    slideAgentDebug: "Debugging with AI",
    slide6: "Knowledge Check",
    slide7: "Knowledge Check",
    slide8: "Course Complete",
  };

  return (
    <div>
      <button
        className="menu-trigger"
        type="button"
        aria-label="Open course navigation"
        aria-controls="course-navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
      >
        <span aria-hidden="true">☰</span>
        <span>Menu</span>
      </button>

      <div
        className={`menu-backdrop ${menuOpen ? "is-visible" : ""}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <aside
        id="course-navigation"
        className={`side-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="side-menu__header">
          <div>
            <span className="side-menu__eyebrow">COURSE CONTENTS</span>
            <strong>Web Dev Toolchain 101</strong>
          </div>
          <button
            className="side-menu__close"
            type="button"
            aria-label="Close course navigation"
            onClick={() => setMenuOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav className="side-menu__nav" aria-label="Course navigation">
          <button
            type="button"
            className={`side-menu__home ${slide === "slide1" ? "is-current" : ""}`}
            onClick={() => navigateFromMenu("slide1", "home-overview")}
          >
            Home
          </button>

          {menuSections.map((section) => {
            const isExpanded = expandedSection === section.title;
            const isCurrent = slide === section.slide ||
              section.pages.some((page) => page.slide === slide);

            return (
              <div className="menu-section" key={section.title}>
                <button
                  type="button"
                  className={`menu-section__toggle ${isCurrent ? "is-current" : ""}`}
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setExpandedSection(isExpanded ? null : section.title)
                  }
                >
                  <span>{section.title}</span>
                  <span
                    className={`menu-section__chevron ${isExpanded ? "is-rotated" : ""}`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>

                <div className={`menu-section__pages ${isExpanded ? "is-expanded" : ""}`}>
                  {section.pages.map((page) => (
                    <button
                      type="button"
                      key={page.label}
                      onClick={() =>
                        navigateFromMenu(page.slide || section.slide, page.target)
                      }
                    >
                      {page.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', background: '#f5f7fa', margin: 0 }}>
        <style>{`
          :root{--primary:#4f46e5;--accent:#4338ca;--bg:#f5f7fa}
          body{margin:0;background:var(--bg);color:#111}
          h2{font-size:28px;font-weight:700;margin-bottom:16px}
          h3{font-size:22px;font-weight:700;margin-top:20px;margin-bottom:12px}
          p{margin-bottom:14px;line-height:1.6}
          ul li{margin-bottom:8px}
          header{background:var(--primary);color:#fff;padding:18px;text-align:center;font-size:24px}
          .container {box-sizing:border-box;width: 100%;max-width: none;margin: 0;padding: 20px;}
          .card{background:#fff;padding:24px;border-radius:10px;box-shadow:0 6px 18px rgba(0,0,0,0.06);margin-bottom:18px}
          img{width:100%;border-radius:8px;margin:12px 0}
          pre{background:#f0f0f0;padding:12px;border-radius:8px;overflow:auto}
          button{background:var(--primary);color:#fff;border:none;padding:10px 14px;border-radius:8px;cursor:pointer;margin:6px}
          button.secondary{background:#777}
          .hidden{display:none}
          .quiz-option{display:block;margin:6px 0}
          .explain{background:#fbfbfb;border-left:4px solid #eee;padding:8px;margin-top:8px}
        `}</style>

        <header>{headerTitles[slide]}</header>

        <div className="container">

          {/* Slide 1 - Module Grid */}
          {slide === "slide1" && (
            <section className="home-page" id="home-overview">
              <div className="learning-path__header">
                <div>
                  <span className="home-eyebrow">COURSE MODULES</span>
                  <h2>Your learning path</h2>
                </div>
                <p>Follow the modules in order or jump directly to the topic you need.</p>
              </div>

              <div className="module-grid">
                <button type="button" className="module-card" onClick={() => goToSlide('slideVSCode')}>
                  <span className="module-card__number">02</span>
                  <span className="module-card__icon" aria-hidden="true">💻</span>
                  <h3>VS Code Basics</h3>
                  <p>Learn your way around the editor and its essential tools.</p>
                  <span className="module-card__link">Start module →</span>
                </button>
                <button type="button" className="module-card" onClick={() => goToSlide('gitOverview')}>
                  <span className="module-card__number">03</span>
                  <span className="module-card__icon" aria-hidden="true">⑂</span>
                  <h3>Git &amp; GitHub</h3>
                  <p>Learn how changes move through Git, navigate repositories, publish work, use branches, and recover mistakes.</p>
                  <span className="module-card__link">Start module →</span>
                </button>
                <button type="button" className="module-card" onClick={() => goToSlide('slide5')}>
                  <span className="module-card__number">04</span>
                  <span className="module-card__icon" aria-hidden="true">⚡</span>
                  <h3>Vite</h3>
                  <p>Build frontend projects with a fast local development server.</p>
                  <span className="module-card__link">Start module →</span>
                </button>
                <button type="button" className="module-card" onClick={() => goToSlide('slide9')}>
                  <span className="module-card__number">05</span>
                  <span className="module-card__icon module-card__icon--vercel" aria-hidden="true">▲</span>
                  <h3>Vercel</h3>
                  <p>Turn Git pushes into previews and production deployments.</p>
                  <span className="module-card__link">Start module →</span>
                </button>
                <button type="button" className="module-card module-card--agentic" onClick={() => goToSlide('slideAgentic')}>
                  <span className="module-card__number">01</span>
                  <span className="module-card__icon" aria-hidden="true">✦</span>
                  <h3>Agentic Coding</h3>
                  <p>Direct AI coding teammates with strong prompts, plans, tests, and review habits.</p>
                  <span className="module-card__link">Start module →</span>
                </button>
              </div>
            </section>
          )}

          {/* Vercel overview */}
          {slide === "slide9" && (
            <section className="content-page lesson-page vercel-overview-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">FROM CODE TO A PUBLIC WEBSITE</span>
                <h2 id="vercel-overview">▲ Vercel overview</h2>
                <p>Vercel is a cloud platform for building, deploying, and hosting web applications. It connects your source code to the infrastructure needed to put a website online, so you can focus on the project instead of configuring servers.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vercel-role">
                <div className="section-heading">
                  <span>01</span>
                  <div><h3 id="vercel-role">What does Vercel do?</h3><p>Vercel takes a project, builds it, and creates a deployment that people can visit.</p></div>
                </div>
                <div className="vercel-overview-flow" aria-label="Vercel deployment overview">
                  <article><span>1</span><strong>Source code</strong><p>Your project lives locally or in a Git repository.</p></article>
                  <b aria-hidden="true">→</b>
                  <article><span>2</span><strong>Build</strong><p>Vercel runs the project’s production build.</p></article>
                  <b aria-hidden="true">→</b>
                  <article><span>3</span><strong>Deploy</strong><p>The successful build becomes a hosted deployment.</p></article>
                  <b aria-hidden="true">→</b>
                  <article><span>4</span><strong>Visit</strong><p>Vercel gives the deployment a shareable URL.</p></article>
                </div>
                <p className="lesson-callout"><strong>Vite builds your project; Vercel hosts the result.</strong> Vite prepares production files, while Vercel runs the cloud deployment and makes the website available online.</p>
              </section>

              <section className="lesson-section" aria-labelledby="vercel-core-features">
                <div className="section-heading">
                  <span>02</span>
                  <div><h3 id="vercel-core-features">Core features</h3><p>The main tools students will use when deploying a frontend project.</p></div>
                </div>
                <div className="vercel-core-grid">
                  <article><span>↗</span><h4>Git deployments</h4><p>Connect GitHub, GitLab, Bitbucket, or Azure DevOps and create deployments from repository changes.</p></article>
                  <article><span>◇</span><h4>Preview deployments</h4><p>Branches and pull requests can receive their own URLs for testing before changes go live.</p></article>
                  <article><span>●</span><h4>Production deployment</h4><p>The approved production branch powers the public version that visitors should see.</p></article>
                  <article><span>⚙</span><h4>Automatic builds</h4><p>Vercel detects common frameworks and runs the configured build command for each deployment.</p></article>
                  <article><span>⌁</span><h4>Domains &amp; HTTPS</h4><p>Use a generated <code>.vercel.app</code> address or connect a custom domain with secure HTTPS.</p></article>
                  <article><span>⌕</span><h4>Logs &amp; recovery</h4><p>Inspect build and runtime logs, redeploy a commit, or roll production back to a working deployment.</p></article>
                </div>
              </section>

              <section className="lesson-section" aria-labelledby="vercel-environments-intro">
                <div className="section-heading">
                  <span>03</span>
                  <div><h3 id="vercel-environments-intro">Three places in the workflow</h3><p>Knowing where the project is running helps you choose the right URL and debugging tools.</p></div>
                </div>
                <div className="vercel-environment-strip">
                  <article><span>LOCAL</span><h4>Your computer</h4><p>Develop and test with a local address such as <code>localhost:5173</code>.</p></article>
                  <article><span>PREVIEW</span><h4>Review online</h4><p>Share a branch or pull-request deployment without changing the live website.</p></article>
                  <article><span>PRODUCTION</span><h4>The live website</h4><p>Publish approved code on the domain intended for visitors.</p></article>
                </div>
              </section>

              <PageNavigation
                backTitle="Why Vite?"
                onBack={() => goToSlide("slideViteWhy")}
                nextTitle="Connect GitHub to Vercel"
                onNext={() => goToSlide("slideVercelSetup")}
              />
            </section>
          )}

          {/* Vercel setup */}
          {slide === "slideVercelSetup" && (
            <section className="content-page lesson-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">GETTING STARTED</span>
                <h2 id="vercel-setup">▲ Connect GitHub to Vercel</h2>
                <p>Connect a GitHub repository once and Vercel can build and host the website for you.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vercel-connect">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="vercel-connect">Connect a Repository</h3>
                    <p>Follow these steps for your first Vercel deployment.</p>
                  </div>
                </div>

                <ol className="simple-workflow">
                  <li><span>1</span><p>Sign in to Vercel using your GitHub account.</p></li>
                  <li><span>2</span><p>Select <strong>Add New Project</strong>.</p></li>
                  <li><span>3</span><p>Choose and import your GitHub repository.</p></li>
                  <li><span>4</span><p>Check the framework, root directory, build settings, and environment variables.</p></li>
                  <li><span>5</span><p>Select <strong>Deploy</strong>.</p></li>
                  <li><span>6</span><p>Keep working normally—future deployments can come from Git pushes.</p></li>
                </ol>
              </section>

              <section className="lesson-section" aria-labelledby="vercel-first-deployment">
                <div className="section-heading">
                  <span>02</span>
                  <div>
                    <h3 id="vercel-first-deployment">Your First Deployment</h3>
                    <p>Vercel turns the imported repository into a website you can open and share.</p>
                  </div>
                </div>

                <ul className="feature-list">
                  <li>Vercel builds the project using the settings you confirmed.</li>
                  <li>The finished deployment receives a URL you can open and share.</li>
                  <li>The Vercel dashboard shows the related commit and build logs.</li>
                  <li>After setup, your normal Git workflow can create future deployments.</li>
                </ul>

                <p className="lesson-callout">The setup page is only for connecting and deploying the repository. The next page explains exactly what Vercel does with later commits, branches, and pull requests.</p>
              </section>

              <PageNavigation
                backTitle="Vercel overview"
                onBack={() => goToSlide("slide9")}
                nextTitle="Vercel Git deployments"
                onNext={() => goToSlide("slideVercelGit")}
              />

            </section>
          )}

          {/* Vercel Git deployments */}
          {slide === "slideVercelGit" && (
            <section className="content-page lesson-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">VERCEL &amp; GITHUB</span>
                <h2 id="vercel-git-overview">From Git Commit to Deployment</h2>
                <p>After GitHub is connected, Vercel turns your Git activity into websites that can be previewed or published.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vercel-commit-flow">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="vercel-commit-flow">From Change to Website</h3>
                    <p>A normal Git workflow leads directly to a Vercel deployment.</p>
                  </div>
                </div>

                <ol className="process-list process-list--five">
                  <li><strong>Edit</strong><span>Make changes in your project.</span></li>
                  <li><strong>Commit</strong><span>Save the changes with Git.</span></li>
                  <li><strong>Push</strong><span>Send the commit to GitHub.</span></li>
                  <li><strong>Build</strong><span>Vercel builds the project.</span></li>
                  <li><strong>Deploy</strong><span>Open the new website link.</span></li>
                </ol>
              </section>

              <section className="lesson-section" aria-labelledby="vercel-every-push">
                <div className="section-heading">
                  <span>02</span>
                  <div>
                    <h3 id="vercel-every-push">A Deployment for Every Push</h3>
                    <p>Vercel keeps previews and the live website up to date automatically.</p>
                  </div>
                </div>

                <p className="lesson-callout">Vercel for GitHub will <strong>deploy every push by default</strong>. This includes pushes and pull requests made to branches. This allows those working within the repository to preview changes made before they are pushed to production.</p>

                <ol className="simple-workflow deployment-events">
                  <li><span>1</span><p>A push to a feature branch creates a <strong>Preview Deployment</strong>.</p></li>
                  <li><span>2</span><p>A new push to a pull request updates its preview with the latest changes.</p></li>
                  <li><span>3</span><p>Vercel adds the preview link to the pull request so the team can review it.</p></li>
                  <li><span>4</span><p>Merging into the production branch creates a <strong>Production Deployment</strong>.</p></li>
                  <li><span>5</span><p>If several commits arrive while Vercel is building, it finishes the current build and then prioritizes the newest queued commit.</p></li>
                </ol>

                <DeploymentFlowLab />
              </section>

              <section className="lesson-section" aria-labelledby="vercel-environments">
                <div className="section-heading">
                  <span>03</span>
                  <div>
                    <h3 id="vercel-environments">Preview vs Production</h3>
                    <p>Preview is for checking changes. Production is the website your visitors see.</p>
                  </div>
                </div>

                <div className="environment-comparison">
                  <div className="environment-column environment-column--preview">
                    <span className="environment-label">PREVIEW</span>
                    <h4>Test before going live</h4>
                    <ul>
                      <li>Created from other branches and pull requests.</li>
                      <li>Gets its own link for review.</li>
                      <li>Does not change the live website.</li>
                    </ul>
                  </div>
                  <div className="environment-column environment-column--production">
                    <span className="environment-label">PRODUCTION</span>
                    <h4>The live website</h4>
                    <ul>
                      <li>Usually created from the <code>main</code> branch.</li>
                      <li>Uses your main website domain.</li>
                      <li>Shows the latest approved changes to visitors.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="lesson-section" aria-labelledby="vercel-urls">
                <div className="section-heading">
                  <span>04</span>
                  <div>
                    <h3 id="vercel-urls">Deployment URLs</h3>
                    <p>Different links help you follow a branch, inspect one commit, or visit production.</p>
                  </div>
                </div>

                <dl className="lesson-terms">
                  <div>
                    <dt>Branch Preview URL</dt>
                    <dd>Always follows the latest successful deployment from that branch.</dd>
                  </div>
                  <div>
                    <dt>Commit-Specific URL</dt>
                    <dd>Stays connected to the exact deployment created from one commit.</dd>
                  </div>
                  <div>
                    <dt>Shared Preview Link</dt>
                    <dd>Can be sent to teammates so they can review changes before production.</dd>
                  </div>
                  <div>
                    <dt>Production Domain</dt>
                    <dd>Points visitors to the latest successful Production Deployment.</dd>
                  </div>
                </dl>
              </section>

              <section className="lesson-section" aria-labelledby="vercel-team-flow">
                <div className="section-heading">
                  <span>05</span>
                  <div>
                    <h3 id="vercel-team-flow">A Simple Team Workflow</h3>
                    <p>Put the pieces together and review changes before they go live.</p>
                  </div>
                </div>

                <ol className="simple-workflow">
                  <li><span>1</span><p>Create a branch such as <code>feature/new-homepage</code>.</p></li>
                  <li><span>2</span><p>Make the changes and save them in a Git commit.</p></li>
                  <li><span>3</span><p>Push the branch to GitHub.</p></li>
                  <li><span>4</span><p>Open the Vercel Preview URL and check the website.</p></li>
                  <li><span>5</span><p>Open or update the pull request for team review.</p></li>
                  <li><span>6</span><p>Make any fixes and push again to update the preview.</p></li>
                  <li><span>7</span><p>Merge the approved changes into <code>main</code>.</p></li>
                  <li><span>8</span><p>Vercel creates the Production Deployment and updates the live domain.</p></li>
                </ol>

                <div className="vercel-takeaway">
                  <strong>Remember</strong>
                  <span>Feature branch → Preview Deployment</span>
                  <span>Review and approve → Merge into <code>main</code></span>
                  <span>Production branch → Live Production Deployment</span>
                </div>

                <p className="vercel-doc-link">Want more detail? Read the <a href="https://vercel.com/docs/git" target="_blank" rel="noreferrer">official Vercel Git guide</a>.</p>
              </section>

              <PageNavigation
                backTitle="Connect GitHub to Vercel"
                onBack={() => goToSlide("slideVercelSetup")}
                nextTitle="Debugging on Vercel"
                onNext={() => goToSlide("slideVercelDebug")}
              />
            </section>
          )}

          {/* Vercel debugging and rollback */}
          {slide === "slideVercelDebug" && (
            <section className="content-page lesson-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">RECOVERY &amp; TROUBLESHOOTING</span>
                <h2 id="vercel-debugging">Debugging on Vercel</h2>
                <p>When a deployment fails or the live site stops working, Vercel’s build logs, runtime logs, and rollback tools help you find the problem and restore a working version.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vercel-rollback">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="vercel-rollback">What Is a Rollback?</h3>
                    <p>A rollback switches your live website back to a previous production deployment that was working correctly.</p>
                  </div>
                </div>

                <p className="lesson-callout">
                  Think of a rollback as an <strong>emergency undo button for production</strong>. Vercel points your production domains to an existing, known-good deployment instead of rebuilding the project, so visitors can quickly reach the working version again.
                </p>

                <div className="rollback-comparison" aria-label="Before and after a rollback">
                  <div>
                    <span className="debug-status debug-status--error">BROKEN</span>
                    <h4>Current deployment</h4>
                    <p>A recent release introduced errors on the live website.</p>
                  </div>
                  <span className="rollback-arrow" aria-hidden="true">→</span>
                  <div>
                    <span className="debug-status debug-status--healthy">RESTORED</span>
                    <h4>Previous deployment</h4>
                    <p>Production traffic returns to the last known working version.</p>
                  </div>
                </div>

                <p className="debug-note"><strong>Important:</strong> A rollback restores the deployed code, but it does not reverse changes made to an external database, API, or CMS.</p>
              </section>

              <section className="lesson-section" aria-labelledby="vercel-logs">
                <div className="section-heading">
                  <span>02</span>
                  <div>
                    <h3 id="vercel-logs">Find the Error in the Logs</h3>
                    <p>Start with the type of log that matches when the problem happened.</p>
                  </div>
                </div>

                <div className="debug-log-grid">
                  <article>
                    <span className="debug-log-label">BUILD LOGS</span>
                    <h4>The deployment did not finish</h4>
                    <p>Open <strong>Deployments</strong>, select the failed deployment, and expand <strong>Building</strong>. Look for the first red section containing “Error”.</p>
                    <ul>
                      <li>Missing package or dependency</li>
                      <li>Incorrect build command</li>
                      <li>Missing environment variable</li>
                      <li>Compile or type error</li>
                    </ul>
                  </article>
                  <article>
                    <span className="debug-log-label">RUNTIME LOGS</span>
                    <h4>The deployment finished, but the site fails</h4>
                    <p>Open <strong>Logs</strong>, select <strong>Production</strong>, and filter by the affected deployment, route, or time range.</p>
                    <ul>
                      <li><strong>4xx</strong> requests appear amber</li>
                      <li><strong>5xx</strong> requests appear red</li>
                      <li>Filter for Error or Fatal messages</li>
                      <li>Open a request to inspect its Request ID and details</li>
                    </ul>
                  </article>
                </div>

                <div className="debug-checklist">
                  <h4>How to spot the useful clue</h4>
                  <ol>
                    <li>Choose the time when the problem first appeared.</li>
                    <li>Check whether errors began immediately after a new deployment.</li>
                    <li>Focus on the first meaningful error or stack-trace line.</li>
                    <li>Look for timeouts, failed API calls, missing variables, or database errors.</li>
                    <li>Save the Request ID when sharing the problem with someone else.</li>
                  </ol>
                </div>

                <VercelDebuggingActivity />
              </section>

              <section className="lesson-section" aria-labelledby="vercel-rollback-steps">
                <div className="section-heading">
                  <span>04</span>
                  <div>
                    <h3 id="vercel-rollback-steps">Roll Back and Recover</h3>
                    <p>Restore service first, then investigate and release a tested fix.</p>
                  </div>
                </div>

                <ol className="recovery-steps">
                  <li><span>Step 1</span><p>Open the project overview and select <strong>Instant Rollback</strong>.</p></li>
                  <li><span>Step 2</span><p>Choose the last known working production deployment.</p></li>
                  <li><span>Step 3</span><p>Verify the domains and deployment, then confirm the rollback.</p></li>
                  <li><span>Step 4</span><p>Reload the website and check production logs to confirm the errors have stopped.</p></li>
                  <li><span>Step 5</span><p>Fix the problem and test it using a Preview deployment.</p></li>
                  <li><span>Step 6</span><p>Promote the corrected deployment to Production to restore normal automatic deployments.</p></li>
                </ol>

                <div className="rollback-warning">
                  <strong>Before you roll back</strong>
                  <ul>
                    <li>Hobby accounts can roll back only to the immediately previous production deployment.</li>
                    <li>A rollback does not rebuild the project with newly changed environment variables.</li>
                    <li>Cron jobs return to the configuration in the selected deployment.</li>
                    <li>After rollback, new pushes will not go live automatically until you undo the rollback or promote another deployment.</li>
                  </ul>
                </div>

                <pre className="lesson-code-block">{`# Optional Vercel CLI workflow
vercel logs --environment production --status-code 5xx --since 30m
vercel rollback
vercel rollback status
vercel logs --environment production --status-code 5xx --since 5m`}</pre>

                <p className="vercel-doc-link">
                  Learn more in Vercel’s official guides to <a href="https://vercel.com/docs/deployments/rollback-production-deployment" target="_blank" rel="noreferrer">rolling back production</a>, <a href="https://vercel.com/docs/logs/runtime" target="_blank" rel="noreferrer">runtime logs</a>, and <a href="https://vercel.com/docs/deployments/troubleshoot-a-build" target="_blank" rel="noreferrer">build errors</a>.
                </p>
              </section>

              <PageNavigation
                backTitle="Vercel Git deployments"
                onBack={() => goToSlide("slideVercelGit")}
                nextTitle="Quiz introduction"
                onNext={() => goToSlide("slide6")}
              />
            </section>
          )}

          {/* Slide 2 */}
          {slide === "slideVSCode" && (
            <section className="content-page lesson-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">YOUR CODE EDITOR</span>
                <h2 id="vscode-overview">💻 VS Code Basics</h2>
                <p>VS Code is a lightweight yet powerful code editor used by millions of developers.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vscode-why">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="vscode-why">Why VS Code?</h3>
                    <p>A flexible editor that is approachable for beginners and powerful enough for professionals.</p>
                  </div>
                </div>
                <ul className="feature-list">
                  <li>Fast and beginner‑friendly</li>
                  <li>Huge extension ecosystem</li>
                  <li>Great for JavaScript, Python, C++, and more</li>
                  <li>Integrated terminal and Git support</li>
                </ul>
              </section>

              <section className="lesson-section" aria-labelledby="vscode-concepts">
                <div className="section-heading">
                  <span>02</span>
                  <div>
                    <h3 id="vscode-concepts">Key Concepts</h3>
                    <p>The main areas you will use while working on a project.</p>
                  </div>
                </div>
                <dl className="lesson-terms">
                  <div><dt>Explorer</dt><dd>View and manage project files.</dd></div>
                  <div><dt>Extensions</dt><dd>Add new tools and languages.</dd></div>
                  <div><dt>Command Palette</dt><dd>Search all commands with Ctrl+Shift+P.</dd></div>
                  <div><dt>Integrated Terminal</dt><dd>Run commands inside the editor.</dd></div>
                </dl>
              </section>

              <section className="lesson-section" aria-labelledby="vscode-interface">
                <div className="section-heading">
                  <span>03</span>
                  <div>
                    <h3 id="vscode-interface">Interface Tour</h3>
                    <p>Use this annotated view to locate the editor’s most important tools.</p>
                  </div>
                </div>
                <div className="vscode-tour">
                  <div className="vscode-tour__progress">
                    <div>
                      <strong>{exploredVscodeTools.size} of {vscodeTourTools.length}</strong>
                      <span> features explored</span>
                    </div>
                    <div
                      className="vscode-tour__progress-track"
                      role="progressbar"
                      aria-label="VS Code interface tour progress"
                      aria-valuemin="0"
                      aria-valuemax={vscodeTourTools.length}
                      aria-valuenow={exploredVscodeTools.size}
                    >
                      <span
                        style={{
                          width: `${(exploredVscodeTools.size / vscodeTourTools.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <figure className="vscode-diagram">
                    <div className="vscode-tour__image">
                      <img
                        src="/images/vscode-pic.png"
                        alt="Visual Studio Code interface highlighting Explorer, Source Control, other views, the terminal, and Copilot chat."
                        loading="lazy"
                      />
                      {vscodeTourTools.map((tool, index) => {
                        const isActive = activeVscodeTool === tool.id;
                        const isExplored = exploredVscodeTools.has(tool.id);

                        return (
                          <button
                            type="button"
                            key={tool.id}
                            className={`vscode-tour__marker ${isActive ? "is-active" : ""} ${isExplored ? "is-explored" : ""}`}
                            style={tool.position}
                            aria-label={`Explore ${tool.label}`}
                            aria-pressed={isActive}
                            onClick={() => exploreVscodeTool(tool.id)}
                          >
                            <span aria-hidden="true">{isExplored ? "✓" : index + 1}</span>
                          </button>
                        );
                      })}

                      {selectedVscodeTool && (
                        <div
                          className={`vscode-tour__popover vscode-tour__popover--${selectedVscodeTool.popoverSide}`}
                          style={selectedVscodeTool.position}
                          role="dialog"
                          aria-label={`${selectedVscodeTool.label} explanation`}
                        >
                          <button
                            type="button"
                            className="vscode-tour__popover-close"
                            aria-label="Close explanation"
                            onClick={() => setActiveVscodeTool(null)}
                          >
                            ×
                          </button>
                          <span className="vscode-tour__popover-label">
                            FEATURE {vscodeTourTools.findIndex((tool) => tool.id === selectedVscodeTool.id) + 1} OF {vscodeTourTools.length}
                          </span>
                          <strong>{selectedVscodeTool.label}</strong>
                          <p>{selectedVscodeTool.explanation}</p>
                        </div>
                      )}
                    </div>
                  </figure>

                  {vscodeTourComplete && (
                    <div className="vscode-tour__complete" role="status">
                      <span aria-hidden="true">✓</span>
                      <div>
                        <strong>Interface tour complete!</strong>
                        <p>You explored all five highlighted features of VS Code.</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <PageNavigation
                backTitle="Debugging with AI"
                onBack={() => goToSlide("slideAgentDebug")}
                nextTitle="Git & GitHub overview"
                onNext={() => goToSlide("gitOverview")}
              />

            </section>
          )}

          {gitLessonPages.some((page) => page.slide === slide) && (
            <GitGithubLessons
              slide={slide}
              onNavigate={goToSlide}
              workflowActivity={<GitWorkflowActivity />}
              actionsBuilder={<ActionsWorkflowBuilder />}
            />
          )}

          {slide === "slide2" && (
            <section className="content-page git-lesson">
              <div className="git-lesson__intro">
                <span className="lesson-kicker">VERSION CONTROL FUNDAMENTALS</span>
                <h2 id="git-overview">🌱 What is Git?</h2>
                <p>Git is a powerful <strong>version control system</strong> that helps you track every change made to your code over time. It allows you to save checkpoints, experiment safely, undo mistakes, and collaborate with others without overwriting each other's work. Git is used by nearly every modern developer because it keeps projects organised and prevents data loss.</p>
              </div>

              <div className="git-lesson__why">
                <h3 id="git-why">Why Git Matters</h3>
                <p>When building software, you constantly update files. Without Git, it’s easy to lose track of what changed, break things accidentally, or struggle to collaborate. Git solves this by recording every update as a structured history.</p>
              </div>

              <section className="git-lesson__section" aria-labelledby="git-terms">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="git-terms">Key Terms</h3>
                    <p>The five ideas you need before using Git.</p>
                  </div>
                </div>

                <dl className="git-terms">
                  <div>
                    <dt>Repository <span>(repo)</span></dt>
                    <dd>A project folder tracked by Git. It contains your code and the full history of all changes.</dd>
                  </div>
                  <div>
                    <dt>Version Control</dt>
                    <dd>A system that records changes so you can revert, review, or branch your work.</dd>
                  </div>
                  <div>
                    <dt>Commit</dt>
                    <dd>A saved snapshot of your project at a specific moment.</dd>
                  </div>
                  <div>
                    <dt>Staging Area</dt>
                    <dd>A place where you prepare files before saving them in a commit.</dd>
                  </div>
                  <div>
                    <dt>Branch</dt>
                    <dd>A separate line of development where you can work on features without affecting the main code.</dd>
                  </div>
                </dl>
              </section>

              <section className="git-lesson__section" aria-labelledby="git-flow-heading">
                <div className="section-heading">
                  <span>02</span>
                  <div>
                    <h3 id="git-flow-heading">How Git Changes Move</h3>
                    <p>Follow a change from your project folder to a shared remote repository.</p>
                  </div>
                </div>

                <figure className="git-workflow-figure">
                  <img
                    src="/images/github-flow.png"
                    alt="Git workflow and branching diagram showing the working directory, staging area, local repository, remote repository, branches, and common commands."
                    loading="lazy"
                  />
                  <figcaption>Git workflow: edit, stage, commit, then push. Branches let multiple streams of work develop safely.</figcaption>
                </figure>

                <GitWorkflowActivity />
              </section>

              <section className="git-lesson__section" aria-labelledby="git-commands">
                <div className="section-heading">
                  <span>03</span>
                  <div>
                    <h3 id="git-commands">Common Commands</h3>
                    <p>Your first three steps in a new Git project.</p>
                  </div>
                </div>

                <div className="git-command-layout">
                  <pre>{`git init\ngit add .\ngit commit -m "First commit"`}</pre>

                  <div className="explain git-command-explanation">
                    <strong>Simple explanation</strong>
                    <div className="git-command-step">
                      <code>git init</code>
                      <span>Start Git tracking in your project folder.</span>
                    </div>
                    <div className="git-command-step">
                      <code>git add .</code>
                      <span>Choose all your current changes for the next save.</span>
                    </div>
                    <div className="git-command-step">
                      <code>git commit</code>
                      <span>Save those chosen changes as a named snapshot.</span>
                    </div>
                  </div>
                </div>
              </section>

              <PageNavigation
                backTitle="VS Code Basics"
                onBack={() => goToSlide("slideVSCode")}
                nextTitle="What is GitHub?"
                onNext={() => goToSlide("slide3")}
              />

            </section>
          )}

          {/* Slide 3 */}
          {slide === "slide3" && (
            <section className="content-page lesson-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">COLLABORATION IN THE CLOUD</span>
                <h2 id="github-overview">🐙 What is GitHub?</h2>
                <p>GitHub is an online hosting platform built around Git. It stores your repositories in the cloud, making them accessible from anywhere and easy to share. It also provides tools for collaboration, automation, issue tracking, reviewing changes, and managing software projects.</p>
              </div>

              <div className="lesson-summary">
                <h3 id="github-why">Why GitHub Is Useful</h3>
                <p>When teams work together, GitHub keeps everything organised. Developers can open pull requests, leave comments, review code, track bugs, and store documentation all in one place. GitHub also powers automation through GitHub Actions.</p>
              </div>

              <section className="lesson-section" aria-labelledby="github-terms">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="github-terms">Key Terms</h3>
                    <p>The language used when local Git work moves online.</p>
                  </div>
                </div>
                <dl className="lesson-terms">
                  <div><dt>Repository <span>(repo)</span></dt><dd>A project stored on GitHub containing your files and complete change history.</dd></div>
                  <div><dt>Remote</dt><dd>An online version of your repository stored on platforms like GitHub.</dd></div>
                  <div><dt>Push</dt><dd>Upload your local commits to GitHub.</dd></div>
                  <div><dt>Pull Request <span>(PR)</span></dt><dd>A request asking others to review and approve changes before merging them.</dd></div>
                  <div><dt>Clone</dt><dd>Download a GitHub repo so you can work on it locally.</dd></div>
                </dl>
              </section>

              <section className="lesson-section" aria-labelledby="github-commands">
                <div className="section-heading">
                  <span>02</span>
                  <div>
                    <h3 id="github-commands">Common Commands</h3>
                    <p>Connect a local repository and publish its commits.</p>
                  </div>
                </div>
                <div className="git-command-layout">
                  <pre>{`git remote add origin https://github.com/username/repo.git\ngit push -u origin main`}</pre>
                  <div className="explain git-command-explanation">
                    <strong>Simple explanation</strong>
                    <div className="git-command-step">
                      <code>git remote add</code>
                      <span>Connect your local project to its repository on GitHub.</span>
                    </div>
                    <div className="git-command-step">
                      <code>git push</code>
                      <span>Upload your saved commits so others can view and collaborate on them.</span>
                    </div>
                  </div>
                </div>
              </section>

              <PageNavigation
                backTitle="What is Git?"
                onBack={() => goToSlide("slide2")}
                nextTitle="GitHub Actions"
                onNext={() => goToSlide("slide4")}
              />

            </section>
          )}

          {/* Slide 4 */}
          {slide === "slide4" && (
            <section className="content-page lesson-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">AUTOMATION &amp; CI/CD</span>
                <h2 id="actions-overview">⚙️ What are GitHub Actions?</h2>
                <p>GitHub Actions is an automation system built directly into GitHub. It allows you to run tasks automatically whenever something happens in your repository, such as when someone pushes code, opens a pull request, or creates a release. This is known as <strong>CI/CD</strong> (Continuous Integration / Continuous Deployment).</p>
              </div>

              <div className="lesson-summary">
                <h3 id="actions-why">Why GitHub Actions Matters</h3>
                <p>Instead of doing repetitive tasks manually—like installing packages, running tests, linting code, or deploying your website—GitHub Actions runs them automatically. This ensures your project stays healthy and errors are caught early.</p>
              </div>

              <section className="lesson-section" aria-labelledby="actions-terms">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="actions-terms">Key Terms</h3>
                    <p>The building blocks of an automated GitHub workflow.</p>
                  </div>
                </div>
                <dl className="lesson-terms">
                  <div><dt>Workflow</dt><dd>A file that tells GitHub what to automate. Written in YAML.</dd></div>
                  <div><dt>Trigger <span>(event)</span></dt><dd>Something that starts a workflow, such as a push, PR, or issue creation.</dd></div>
                  <div><dt>Job</dt><dd>A group of steps that run in a virtual environment.</dd></div>
                  <div><dt>Runner</dt><dd>A machine provided by GitHub where your automation runs, such as Ubuntu or Windows.</dd></div>
                  <div><dt>Step</dt><dd>A single instruction inside a job, like “install dependencies” or “run tests”.</dd></div>
                  <div><dt>Dependencies</dt><dd>Extra code your project needs to work, installed using <code>npm install</code>.</dd></div>
                  <div><dt>Package Manager</dt><dd>A tool like npm or yarn used to install or update dependencies.</dd></div>
                </dl>
              </section>

              <section className="lesson-section" aria-labelledby="actions-example">
                <div className="section-heading">
                  <span>02</span>
                  <div>
                    <h3 id="actions-example">Example Workflow</h3>
                    <p>A YAML workflow that checks the project whenever code is pushed.</p>
                  </div>
                </div>
                <div className="git-command-layout">
                  <pre>{`name: CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm install\n      - run: npm test`}</pre>
                  <div className="explain git-command-explanation">
                    <strong>Simple explanation</strong>
                    <div className="git-command-step">
                      <code>on: [push]</code>
                      <span>Start this workflow every time code is pushed.</span>
                    </div>
                    <div className="git-command-step">
                      <code>checkout</code>
                      <span>Download the repository code onto the runner.</span>
                    </div>
                    <div className="git-command-step">
                      <code>npm install</code>
                      <span>Install all packages the project needs.</span>
                    </div>
                    <div className="git-command-step">
                      <code>npm test</code>
                      <span>Run the tests to check that nothing is broken.</span>
                    </div>
                  </div>
                </div>
                <ActionsWorkflowBuilder />
              </section>

              <PageNavigation
                backTitle="What is GitHub?"
                onBack={() => goToSlide("slide3")}
                nextTitle="What is Vite?"
                onNext={() => goToSlide("slide5")}
              />

            </section>
          )}

          {/* Slide 5 */}
          {slide === "slide5" && (
            <section className="content-page lesson-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">VITE FUNDAMENTALS</span>
                <h2 id="vite-overview">⚡ Vite overview</h2>
                <p>Vite is a tool that supports your frontend project from the first edit to deployment. It gives you a live preview while you work, understands modern JavaScript modules and assets, and prepares an optimized website when you are ready to publish.</p>
              </div>

              <div className="lesson-summary">
                <h3>One tool, two stages</h3>
                <p>During <strong>development</strong>, Vite runs a fast local preview and updates it as files change. For <strong>deployment</strong>, Vite creates a production-ready version of the project inside the <code>dist</code> folder.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vite-journey">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="vite-journey">The Vite journey</h3>
                    <p>These four stages will guide the rest of this module.</p>
                  </div>
                </div>
                <dl className="lesson-terms">
                  <div><dt>1 · Create</dt><dd>Start with a ready-made project structure instead of configuring every tool yourself.</dd></div>
                  <div><dt>2 · Develop</dt><dd>Run a live preview on your computer and see saved changes quickly.</dd></div>
                  <div><dt>3 · Organize</dt><dd>Use modules, dependencies, and asset folders to keep the project manageable.</dd></div>
                  <div><dt>4 · Build</dt><dd>Create smaller production files that a hosting platform can deploy.</dd></div>
                </dl>
              </section>

              <section className="lesson-section" aria-labelledby="vite-starter">
                <div className="section-heading">
                  <span>02</span>
                  <div>
                    <h3 id="vite-starter">Start a Vite project</h3>
                    <p>These commands create the project, download what it needs, and open the development workflow.</p>
                  </div>
                </div>
                <div className="git-command-layout">
                  <pre>{`npm create vite@latest my-app\ncd my-app\nnpm install\nnpm run dev`}</pre>
                  <div className="explain git-command-explanation">
                    <strong>Simple explanation</strong>
                    <div className="git-command-step">
                      <code>npm create vite</code>
                      <span>Create a new project using the Vite starter.</span>
                    </div>
                    <div className="git-command-step">
                      <code>cd my-app</code>
                      <span>Move into the new project folder.</span>
                    </div>
                    <div className="git-command-step">
                      <code>npm install</code>
                      <span>Download all packages the project needs.</span>
                    </div>
                    <div className="git-command-step">
                      <code>npm run dev</code>
                      <span>Start the fast local server with instant updates.</span>
                    </div>
                  </div>
                </div>
              </section>

              <PageNavigation
                backTitle="Git command reference"
                onBack={() => goToSlide("gitReference")}
                nextTitle="Live Preview & HMR"
                onNext={() => goToSlide("slideViteDev")}
              />

            </section>
          )}

          {/* Vite: live development */}
          {slide === "slideViteDev" && (
            <section className="content-page lesson-page vite-learning-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">SEE CHANGES AS YOU WORK</span>
                <h2 id="vite-dev-server">Live Preview &amp; HMR</h2>
                <p>Vite gives you a live preview of your project that runs on your own computer. Save a file and the browser can show the change almost immediately.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vite-dev-command">
                <div className="section-heading"><span>01</span><div><h3 id="vite-dev-command">Start the live preview</h3><p>Run one command from inside the project folder.</p></div></div>
                <div className="vite-command-focus">
                  <div><span>TERMINAL</span><code>npm run dev</code></div>
                  <ul>
                    <li>Starts a local web server</li>
                    <li>Lets you preview the website in a browser</li>
                    <li>Watches your project files for saved changes</li>
                  </ul>
                </div>
                <p className="lesson-callout"><strong>Local does not mean public.</strong> This preview is for development on your computer. Other people cannot visit it like a deployed website.</p>
              </section>

              <section className="lesson-section" aria-labelledby="vite-localhost">
                <div className="section-heading"><span>02</span><div><h3 id="vite-localhost">What does localhost:5173 mean?</h3><p>The preview address contains two useful pieces of information.</p></div></div>
                <div className="localhost-explainer">
                  <div className="localhost-address"><span>http://</span><strong>localhost</strong><b>:</b><strong>5173</strong></div>
                  <dl>
                    <div><dt>localhost</dt><dd>Your own computer. The site is running locally rather than on the public internet.</dd></div>
                    <div><dt>5173</dt><dd>The default port Vite uses for its development server—like a numbered doorway into the preview.</dd></div>
                  </dl>
                </div>
              </section>

              <section className="lesson-section" aria-labelledby="vite-hmr">
                <div className="section-heading"><span>03</span><div><h3 id="vite-hmr">Hot Module Replacement (HMR)</h3><p>Instead of refreshing the entire webpage, Vite updates the part that changed.</p></div></div>
                <p>HMR makes development feel immediate: change text, save the file, and see the browser update. Other parts of the page—and often its current state—can stay in place.</p>
                <HmrDemo />
              </section>

              <PageNavigation backTitle="Vite overview" onBack={() => goToSlide("slide5")} nextTitle="npm & Dependencies" onNext={() => goToSlide("slideViteNpm")} />
            </section>
          )}

          {/* Vite: npm and dependencies */}
          {slide === "slideViteNpm" && (
            <section className="content-page lesson-page vite-learning-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">COMMANDS YOUR PROJECT UNDERSTANDS</span>
                <h2 id="vite-npm">npm Scripts &amp; Dependencies</h2>
                <p>Vite projects use npm scripts as short, consistent commands. npm also downloads the libraries that the project depends on.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vite-scripts">
                <div className="section-heading"><span>01</span><div><h3 id="vite-scripts">Three scripts to remember</h3><p>Each command matches a different stage of your workflow.</p></div></div>
                <div className="vite-script-table">
                  <div className="vite-script-table__head"><strong>Command</strong><strong>Purpose</strong></div>
                  <div><code>npm run dev</code><span>Develop your website using the live local preview.</span></div>
                  <div><code>npm run build</code><span>Prepare an optimized version for deployment.</span></div>
                  <div><code>npm run preview</code><span>Test the production build locally before publishing it.</span></div>
                </div>
              </section>

              <section className="lesson-section" aria-labelledby="vite-package-json">
                <div className="section-heading"><span>02</span><div><h3 id="vite-package-json">package.json is the project’s checklist</h3><p>It records the scripts you can run and the packages the project needs.</p></div></div>
                <div className="vite-package-layout">
                  <pre>{`{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0"
  }
}`}</pre>
                  <div>
                    <article><span>SCRIPTS</span><p>Friendly command names that npm connects to development tools.</p></article>
                    <article><span>DEPENDENCIES</span><p>Libraries your application needs in order to work.</p></article>
                  </div>
                </div>
              </section>

              <section className="lesson-section" aria-labelledby="vite-dependencies">
                <div className="section-heading"><span>03</span><div><h3 id="vite-dependencies">Download dependencies with npm</h3><p>You do not need to copy library files into the project manually.</p></div></div>
                <div className="dependency-commands">
                  <article><code>npm install</code><p>Reads <code>package.json</code> and downloads everything the project already needs.</p></article>
                  <article><code>npm install axios</code><p>Adds the Axios library to the project and records it as a dependency.</p></article>
                </div>
                <p className="lesson-callout">Downloaded packages go into <code>node_modules</code>. You normally work from <code>package.json</code> rather than editing that large folder yourself.</p>
              </section>

              <PageNavigation backTitle="Live Preview & HMR" onBack={() => goToSlide("slideViteDev")} nextTitle="Assets & Modules" onNext={() => goToSlide("slideViteAssets")} />
            </section>
          )}

          {/* Vite: assets and modules */}
          {slide === "slideViteAssets" && (
            <section className="content-page lesson-page vite-learning-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">ORGANIZE THE PROJECT</span>
                <h2 id="vite-assets">Assets &amp; Modules</h2>
                <p>Vite helps organize both visual files and JavaScript. The right folder and module structure keeps a growing project easier to understand.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vite-asset-folders">
                <div className="section-heading"><span>01</span><div><h3 id="vite-asset-folders">src/assets or public?</h3><p>Both hold static files, but Vite treats them differently.</p></div></div>
                <div className="asset-folder-comparison">
                  <article>
                    <div><span>PROCESSED</span><code>src/assets/</code></div>
                    <p>Ideal for images, fonts, and media imported by your application.</p>
                    <ul><li>Referenced from source code</li><li>Processed as part of the build</li><li>Can receive optimized, unique filenames</li></ul>
                    <pre>{`import logo from "./assets/logo.png";`}</pre>
                  </article>
                  <article>
                    <div><span>COPIED DIRECTLY</span><code>public/</code></div>
                    <p>Useful when a file must keep its name or is referenced directly by URL.</p>
                    <ul><li>Copied into the build as-is</li><li>Good for favicon.ico, PDFs, or robots.txt</li><li>Referenced from the root path</li></ul>
                    <pre>{`<a href="/guide.pdf">Guide</a>`}</pre>
                  </article>
                </div>
              </section>

              <section className="lesson-section" aria-labelledby="vite-modules">
                <div className="section-heading"><span>02</span><div><h3 id="vite-modules">Split JavaScript into modules</h3><p>Instead of one huge file, use smaller files with focused jobs.</p></div></div>
                <div className="module-code-example">
                  <div><span>math.js · EXPORT</span><pre>{`export function add(a, b) {
  return a + b;
}`}</pre></div>
                  <b aria-hidden="true">→</b>
                  <div><span>main.js · IMPORT</span><pre>{`import { add } from "./math.js";

const total = add(2, 3);`}</pre></div>
                </div>
                <div className="module-benefits">
                  <span>One clear job per file</span><span>Reusable functions</span><span>Easier testing</span><span>Easier teamwork</span>
                </div>
                <p className="lesson-callout"><strong>This idea goes beyond Vite.</strong> Importing and exporting modules is a standard modern JavaScript skill you will use across frameworks and projects.</p>
              </section>

              <PageNavigation backTitle="npm & Dependencies" onBack={() => goToSlide("slideViteNpm")} nextTitle="Build & Deployment" onNext={() => goToSlide("slideViteBuild")} />
            </section>
          )}

          {/* Vite: production build */}
          {slide === "slideViteBuild" && (
            <section className="content-page lesson-page vite-learning-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">FROM PROJECT TO PUBLISHABLE FILES</span>
                <h2 id="vite-build">Build &amp; Deployment</h2>
                <p>During development, Vite prioritizes speed. When you are ready to publish, it creates a smaller, production-ready copy of the site.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vite-build-command">
                <div className="section-heading"><span>01</span><div><h3 id="vite-build-command">Create the production build</h3><p>Run the build command and look for a new output folder.</p></div></div>
                <div className="vite-build-flow">
                  <article><span>YOUR PROJECT</span><strong>src/ + public/</strong><p>Readable files used while developing.</p></article>
                  <b aria-hidden="true">→ <code>npm run build</code> →</b>
                  <article className="vite-build-flow__dist"><span>OUTPUT</span><strong>dist/</strong><p>Optimized files ready for a host.</p></article>
                </div>
                <div className="build-benefits">
                  <article><span>↓</span><strong>Smaller files</strong><p>Less data for visitors to download.</p></article>
                  <article><span>⚡</span><strong>Faster loading</strong><p>Production assets are prepared for browsers.</p></article>
                  <article><span>↗</span><strong>Ready to deploy</strong><p>The <code>dist</code> folder can be published by a hosting service.</p></article>
                </div>
              </section>

              <section className="lesson-section" aria-labelledby="vite-preview-build">
                <div className="section-heading"><span>02</span><div><h3 id="vite-preview-build">Preview before publishing</h3><p>Test the actual production output on your own computer.</p></div></div>
                <div className="vite-command-focus">
                  <div><span>TERMINAL</span><code>npm run preview</code></div>
                  <ul><li>Serves the files created inside <code>dist</code></li><li>Lets you check the production version locally</li><li>Does not publish the site to the internet</li></ul>
                </div>
                <p className="lesson-callout"><strong>Vite builds; a host deploys.</strong> Vite prepares the website files. Vercel, GitHub Pages, or another service makes those files available on the public internet.</p>
              </section>

              <PageNavigation backTitle="Assets & Modules" onBack={() => goToSlide("slideViteAssets")} nextTitle="Why Vite?" onNext={() => goToSlide("slideViteWhy")} />
            </section>
          )}

          {/* Vite: motivation */}
          {slide === "slideViteWhy" && (
            <section className="content-page lesson-page vite-learning-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">PUT THE PIECES TOGETHER</span>
                <h2 id="vite-why">Why use Vite?</h2>
                <p>Vite removes repetitive setup while keeping the normal web skills—HTML, CSS, JavaScript, modules, npm, and deployment—visible and useful.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vite-comparison">
                <div className="section-heading"><span>01</span><div><h3 id="vite-comparison">Without Vite vs with Vite</h3><p>The main benefit is a smoother path from a blank project to a deployed website.</p></div></div>
                <div className="vite-why-table">
                  <div className="vite-why-table__head"><strong>Without Vite</strong><strong>With Vite</strong></div>
                  <div><span>Manual project setup</span><span>Ready-made project</span></div>
                  <div><span>Refresh the browser manually</span><span>Instant HMR updates</span></div>
                  <div><span>Difficult package management</span><span>npm integration</span></div>
                  <div><span>Manual production optimization</span><span>Easy production build</span></div>
                  <div><span>Lots of configuration</span><span>Sensible defaults</span></div>
                </div>
              </section>

              <section className="lesson-section" aria-labelledby="vite-recap">
                <div className="section-heading"><span>02</span><div><h3 id="vite-recap">The complete workflow</h3><p>These commands now have a clear place in the project lifecycle.</p></div></div>
                <ol className="vite-recap-flow">
                  <li><span>1</span><div><strong>Create</strong><code>npm create vite@latest</code></div></li>
                  <li><span>2</span><div><strong>Install</strong><code>npm install</code></div></li>
                  <li><span>3</span><div><strong>Develop</strong><code>npm run dev</code></div></li>
                  <li><span>4</span><div><strong>Build</strong><code>npm run build</code></div></li>
                  <li><span>5</span><div><strong>Check</strong><code>npm run preview</code></div></li>
                  <li><span>6</span><div><strong>Deploy</strong><code>dist/ → hosting</code></div></li>
                </ol>
              </section>

              <PageNavigation backTitle="Build & Deployment" onBack={() => goToSlide("slideViteBuild")} nextTitle="Deploying with Vercel" onNext={() => goToSlide("slide9")} />
            </section>
          )}

          {/* Agentic coding fundamentals */}
          {slide === "slideAgentic" && (
            <section className="content-page lesson-page agentic-page">
              <div className="lesson-intro" id="agentic-overview">
                <span className="lesson-kicker">A NEW WAY TO BUILD SOFTWARE</span>
                <h2>Meet your AI coding teammate</h2>
                <p><strong>Agentic coding</strong> is working with an AI that can plan, write, debug, and improve code on your behalf. Instead of asking AI one question at a time, you give it a goal, and it helps complete the task through multiple steps.</p>
              </div>

              <section className="lesson-section" aria-labelledby="coding-approaches">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="coding-approaches">Three ways to work with code</h3>
                    <p>The difference is how much of the task the AI can carry forward.</p>
                  </div>
                </div>
                <div className="approach-table" role="table" aria-label="Coding approaches comparison">
                  <div className="approach-table__head" role="row">
                    <strong role="columnheader">Traditional Coding</strong>
                    <strong role="columnheader">AI-Assisted Coding</strong>
                    <strong role="columnheader">Agentic Coding</strong>
                  </div>
                  <div className="approach-table__row" role="row">
                    <p role="cell">You write everything yourself.</p>
                    <p role="cell">AI helps answer questions or generate snippets.</p>
                    <p role="cell">AI acts like a software teammate that plans, writes, tests, and iterates.</p>
                  </div>
                </div>
              </section>

              <section className="lesson-section" aria-labelledby="agentic-importance">
                <div className="section-heading">
                  <span>02</span>
                  <div>
                    <h3 id="agentic-importance">Why it matters</h3>
                    <p>Agentic coding changes your role from typing every line to directing, reviewing, and deciding.</p>
                  </div>
                </div>
                <div className="agentic-benefit-grid">
                  <article><span>⚡</span><h4>Move faster</h4><p>Delegate setup, repetitive edits, tests, and documentation while you focus on the outcome.</p></article>
                  <article><span>↗</span><h4>Learn by reviewing</h4><p>Ask the agent to explain unfamiliar code, trade-offs, and errors in plain language.</p></article>
                  <article><span>◎</span><h4>Handle bigger tasks</h4><p>An agent can coordinate changes across several files and keep working through test failures.</p></article>
                </div>
                <div className="agent-capabilities">
                  <h4>What can an AI coding agent do?</h4>
                  <ul>
                    <li>Inspect a project and propose a plan</li>
                    <li>Create and edit files</li>
                    <li>Run commands, builds, and tests</li>
                    <li>Read errors and debug problems</li>
                    <li>Refactor and improve existing code</li>
                    <li>Explain its work for human review</li>
                  </ul>
                </div>
                <p className="agentic-safety-note"><strong>You stay accountable.</strong> An agent can act, but you decide the goal, permissions, and whether the result is safe to ship.</p>
              </section>

              <section className="lesson-section" aria-labelledby="agentic-habits">
                <div className="section-heading">
                  <span>03</span>
                  <div>
                    <h3 id="agentic-habits">Six habits for good agentic coding</h3>
                    <p>Strong results come from a careful working loop—not blind acceptance.</p>
                  </div>
                </div>
                <ol className="habit-grid">
                  <li><span>01</span><strong>Break big tasks into smaller prompts.</strong><p>Give the agent one clear milestone at a time.</p></li>
                  <li><span>02</span><strong>Test after every change.</strong><p>Catch problems while the change is still easy to understand.</p></li>
                  <li><span>03</span><strong>Use Git commits frequently.</strong><p>Create safe checkpoints you can compare or restore.</p></li>
                  <li><span>04</span><strong>Read generated code before accepting it.</strong><p>Check logic, security, accessibility, and project fit.</p></li>
                  <li><span>05</span><strong>Verify AI-generated information.</strong><p>Confirm APIs, package versions, and important claims.</p></li>
                  <li><span>06</span><strong>Keep prompts clear and specific.</strong><p>State the context, constraints, outcome, and checks.</p></li>
                </ol>
              </section>

              <PageNavigation
                backTitle="Home"
                onBack={() => goToSlide("slide1")}
                nextTitle="Coding agents & builders"
                onNext={() => goToSlide("slideAgents")}
              />
            </section>
          )}

          {/* Coding agents and website builders */}
          {slide === "slideAgents" && (
            <section className="content-page lesson-page agent-tools-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">CHOOSE THE RIGHT WORKSPACE</span>
                <h2 id="agents-overview">Different kinds of coding agents</h2>
                <p>Some agents work inside a codebase and terminal. Others provide an agent-first workspace for coordinating work. The best choice depends on your task and how much control you need.</p>
              </div>

              <div className="agent-profile-grid">
                <article className="agent-profile agent-profile--claude">
                  <div className="agent-profile__top"><span>CC</span><div><small>ANTHROPIC</small><h3>Claude Code</h3></div></div>
                  <p>A coding agent for the terminal, IDE, and cloud that reads a codebase, edits files, runs tests, and iterates.</p>
                  <dl><div><dt>Access</dt><dd><span className="tier-pill tier-pill--paid">Paid</span> Included with paid Claude plans or pay-as-you-go API usage; Claude’s general chat has a free plan, but Claude Code is listed with paid plans.</dd></div><div><dt>Excels at</dt><dd>Understanding large codebases, multi-file refactors, careful explanations, and terminal workflows.</dd></div></dl>
                </article>
                <article className="agent-profile agent-profile--google">
                  <div className="agent-profile__top"><span>AG</span><div><small>GOOGLE</small><h3>Antigravity</h3></div></div>
                  <p>An agent-first development platform with desktop, IDE, and CLI experiences for managing autonomous work.</p>
                  <dl><div><dt>Access</dt><dd><span className="tier-pill tier-pill--free">Free tier</span> Individuals can start at $0 with basic weekly limits; paid Google AI plans increase capacity.</dd></div><div><dt>Excels at</dt><dd>Parallel agents, browser control and verification, multimodal tasks, and coordinating work across projects.</dd></div></dl>
                </article>
                <article className="agent-profile agent-profile--openai">
                  <div className="agent-profile__top"><span>OX</span><div><small>OPENAI</small><h3>Codex</h3></div></div>
                  <p>A coding agent across desktop, CLI, IDE, and cloud that helps write, review, test, and ship code.</p>
                  <dl><div><dt>Access</dt><dd><span className="tier-pill tier-pill--free">Free tier</span> Included across ChatGPT plans, including Free and Go, with limits that vary by plan.</dd></div><div><dt>Excels at</dt><dd>End-to-end repository tasks, code review, test-driven iteration, parallel work, and long-running delegation.</dd></div></dl>
                </article>
              </div>

              <p className="pricing-stamp">Plan availability checked 30 July 2026. Limits and models can change—always verify the product’s current pricing page.</p>

              <section className="lesson-section" aria-labelledby="agent-summary">
                <div className="section-heading">
                  <span>01</span>
                  <div><h3 id="agent-summary">Quick comparison</h3><p>Use this table as a starting point, not a permanent ranking.</p></div>
                </div>
                <div className="agent-summary-table">
                  <table>
                    <thead><tr><th>Tool</th><th>Made by</th><th>Free tier?</th><th>Best starting point</th></tr></thead>
                    <tbody>
                      <tr><th>Claude Code</th><td>Anthropic</td><td>No dedicated free Claude Code tier</td><td>Deep codebase work in a terminal or IDE</td></tr>
                      <tr><th>Antigravity</th><td>Google</td><td>Yes, with basic limits</td><td>Agent-first, multimodal and browser-verified workflows</td></tr>
                      <tr><th>Codex</th><td>OpenAI</td><td>Yes, usage-limited</td><td>Delegating, reviewing, and shipping repository tasks</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="lesson-section" aria-labelledby="website-builders">
                <div className="section-heading">
                  <span>02</span>
                  <div><h3 id="website-builders">Prompt-to-website platforms</h3><p>These tools hide more of the code setup so you can go from an idea to a hosted web app quickly.</p></div>
                </div>
                <div className="builder-platforms">
                  <article>
                    <div className="builder-platforms__brand"><span>♥</span><div><small>AI SOFTWARE ENGINEER</small><h4>Lovable</h4></div></div>
                    <p>Describe an interface or web app in chat, refine the generated result visually, connect services, and publish.</p>
                    <ul><li>Good for polished prototypes and frontend-first web apps</li><li>GitHub and cloud workflows available</li><li>Free plan includes limited build and cloud credits</li></ul>
                    <a href="https://lovable.dev/" target="_blank" rel="noreferrer">Visit Lovable ↗</a>
                  </article>
                  <article>
                    <div className="builder-platforms__brand"><span>B44</span><div><small>WIX</small><h4>Base44</h4></div></div>
                    <p>Build an app through natural language with database, authentication, analytics, and integrations included.</p>
                    <ul><li>Good for data-driven apps and internal tools</li><li>Backend features are built into the platform</li><li>Free plan includes limited message and integration credits</li></ul>
                    <a href="https://base44.com/" target="_blank" rel="noreferrer">Visit Base44 ↗</a>
                  </article>
                </div>
                <p className="lesson-callout"><strong>Agent or builder?</strong> Choose a coding agent when you want direct codebase control. Choose a prompt-to-website platform when speed, built-in hosting, and managed services matter more than controlling every technical detail.</p>
              </section>

              <PageNavigation
                backTitle="Agentic coding basics"
                onBack={() => goToSlide("slideAgentic")}
                nextTitle="Prompt engineering"
                onNext={() => goToSlide("slidePrompts")}
              />
            </section>
          )}

          {/* Prompt engineering */}
          {slide === "slidePrompts" && (
            <section className="content-page lesson-page prompt-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">DIRECT THE WORK</span>
                <h2 id="prompts-overview">Prompt engineering</h2>
                <p><strong>Prompt engineering</strong> is the practice of giving AI clear instructions, useful context, and a definition of success. It matters because the agent can only make good decisions from the goal and evidence you provide.</p>
              </div>

              <section className="lesson-section" aria-labelledby="prompt-importance">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="prompt-importance">Why prompt engineering matters</h3>
                    <p>A thoughtful prompt gives the AI a reliable brief, helping it produce work that is useful, relevant, and easier to trust.</p>
                  </div>
                </div>
                <div className="prompt-importance-grid">
                  <article><span>01</span><h4>Better results</h4><p>Clear goals and context reduce guesswork, so the first response is more accurate and relevant.</p></article>
                  <article><span>02</span><h4>Less rework</h4><p>Constraints and success checks prevent avoidable mistakes and reduce repeated corrections.</p></article>
                  <article><span>03</span><h4>More control</h4><p>You guide the scope, style, tools, and quality instead of leaving important decisions to chance.</p></article>
                  <article><span>04</span><h4>Safer collaboration</h4><p>Explicit boundaries help the AI avoid unwanted changes and make its output easier for you to review.</p></article>
                </div>
                <p className="prompt-importance-note"><strong>Think of a prompt as a project brief:</strong> the clearer the brief, the more confidently the AI can help you reach the intended outcome.</p>
              </section>

              <div className="prompt-comparison">
                <article className="prompt-example prompt-example--bad"><span>WEAK PROMPT</span><h3>“Make me a website.”</h3><p>Missing audience, content, style, technology, constraints, and success checks.</p></article>
                <article className="prompt-example prompt-example--good"><span>STRONG PROMPT</span><h3>“Build a responsive one-page study timer…”</h3><p>Use React and the existing purple styles. Include 25/5 minute modes, start, pause, and reset. Do not add packages. Run the build and check mobile layout.</p></article>
              </div>

              <section className="lesson-section" aria-labelledby="race-framework">
                <div className="section-heading">
                  <span>02</span>
                  <div><h3 id="race-framework">Frame prompts with RACE</h3><p>Use four simple ingredients to make your request actionable and testable.</p></div>
                </div>
                <div className="race-grid">
                  <article><span>R</span><div><h4>Role</h4><p>Who should the AI act as?</p><code>You are a frontend developer…</code></div></article>
                  <article><span>A</span><div><h4>Action</h4><p>What should it do?</p><code>Build a study timer…</code></div></article>
                  <article><span>C</span><div><h4>Context</h4><p>What must it know?</p><code>This is a React course app…</code></div></article>
                  <article><span>E</span><div><h4>Expectation</h4><p>What does “done” mean?</p><code>Test all controls and mobile layout.</code></div></article>
                </div>
              </section>

              <section className="lesson-section" id="race-exercise" aria-labelledby="race-exercise-title">
                <div className="section-heading">
                  <span>03</span>
                  <div><h3 id="race-exercise-title">Exercise: build a prompt from scratch</h3><p>Fill in each RACE field. Your complete prompt appears on the right.</p></div>
                </div>
                <div className="race-builder">
                  <div className="race-builder__fields">
                    {[
                      ["role", "R · Role", "e.g. You are a careful React developer"],
                      ["action", "A · Action", "e.g. Build a searchable glossary"],
                      ["context", "C · Context", "e.g. Use the existing course card styles"],
                      ["expectation", "E · Expectation", "e.g. Test search and responsive layout"],
                    ].map(([id, label, placeholder]) => (
                      <label key={id}><span>{label}</span><textarea value={raceDraft[id]} placeholder={placeholder} onChange={(event) => setRaceDraft((current) => ({ ...current, [id]: event.target.value }))} /></label>
                    ))}
                  </div>
                  <div className="race-builder__output">
                    <div><span>PROMPT PREVIEW</span><small>{Object.values(raceDraft).filter(Boolean).length}/4 parts</small></div>
                    <p>{raceDraft.role || "[Role]"}</p>
                    <p>{raceDraft.action || "[Action]"}</p>
                    <p>{raceDraft.context || "[Context]"}</p>
                    <p>{raceDraft.expectation || "[Expectation]"}</p>
                    {Object.values(raceDraft).every((value) => value.trim()) && <strong>✓ Your prompt has all four RACE ingredients.</strong>}
                  </div>
                </div>
              </section>

              <PageNavigation
                backTitle="Coding agents & builders"
                onBack={() => goToSlide("slideAgents")}
                nextTitle="Plan mode"
                onNext={() => goToSlide("slidePlanMode")}
              />
            </section>
          )}

          {/* Plan mode */}
          {slide === "slidePlanMode" && (
            <section className="content-page lesson-page plan-mode-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">THINK BEFORE EDITING</span>
                <h2 id="plan-mode-overview">Plan mode</h2>
                <p><strong>Plan mode</strong> asks the agent to inspect, reason, and propose an approach before changing code. It gives you a moment to correct the direction while changes are still cheap.</p>
              </div>
              <div className="plan-importance">
                <div><span>Without a plan</span><p>Prompt → edits → surprise → undo</p></div>
                <b>VS</b>
                <div><span>With plan mode</span><p>Goal → inspect → agree → implement → verify</p></div>
              </div>
              <section className="lesson-section" aria-labelledby="plan-contents">
                <div className="section-heading"><span>01</span><div><h3 id="plan-contents">What belongs in a useful plan?</h3><p>A strong plan makes scope, sequence, and success visible.</p></div></div>
                <dl className="plan-parts">
                  <div><dt>Goal</dt><dd>The exact user outcome.</dd></div>
                  <div><dt>Context</dt><dd>Relevant architecture, patterns, and constraints.</dd></div>
                  <div><dt>Steps</dt><dd>An ordered implementation approach.</dd></div>
                  <div><dt>Files</dt><dd>Likely edits and anything that must not change.</dd></div>
                  <div><dt>Risks</dt><dd>Unknowns, trade-offs, and decisions to confirm.</dd></div>
                  <div><dt>Checks</dt><dd>Tests and acceptance criteria that prove completion.</dd></div>
                </dl>
                <p className="lesson-callout"><strong>Plan mode is most useful</strong> for unfamiliar repositories, multi-file changes, risky refactors, or tasks with several possible designs. A tiny typo fix usually does not need a long plan.</p>
              </section>
              <section className="lesson-section" id="plan-builder-exercise" aria-labelledby="plan-builder-heading">
                <div className="section-heading"><span>02</span><div><h3 id="plan-builder-heading">Exercise: assemble the plan</h3><p>Build the document from the same kinds of blocks you used in the YAML exercise.</p></div></div>
                <PlanModeBuilder />
              </section>
              <PageNavigation backTitle="Prompt engineering" onBack={() => goToSlide("slidePrompts")} nextTitle="Debugging with AI" onNext={() => goToSlide("slideAgentDebug")} />
            </section>
          )}

          {/* Agentic debugging */}
          {slide === "slideAgentDebug" && (
            <section className="content-page lesson-page agent-debug-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">USE ERRORS AS EVIDENCE</span>
                <h2 id="agent-debugging-overview">Debugging with AI</h2>
                <p><strong>Debugging</strong> is the process of finding, understanding, and fixing the cause of a problem. It matters because software rarely works perfectly on the first attempt—and a quick guess can hide the real cause.</p>
              </div>
              <section className="lesson-section" aria-labelledby="debug-ai-role">
                <div className="section-heading"><span>01</span><div><h3 id="debug-ai-role">How AI can help</h3><p>Give the agent evidence and use it as a reasoning partner, not a magic “fix everything” button.</p></div></div>
                <div className="debug-ai-capabilities">
                  <article><span>?</span><h4>Explain</h4><p>Translate an error message or stack trace into plain language.</p></article>
                  <article><span>⌕</span><h4>Investigate</h4><p>Trace related code and suggest likely root causes.</p></article>
                  <article><span>⌁</span><h4>Fix carefully</h4><p>Propose a small change and explain why it should work.</p></article>
                  <article><span>✓</span><h4>Verify</h4><p>Run targeted tests and check whether the behaviour changed.</p></article>
                </div>
              </section>
              <section className="lesson-section" aria-labelledby="debug-workflow-heading">
                <div className="section-heading"><span>02</span><div><h3 id="debug-workflow-heading">The debugging workflow</h3><p>Move from evidence to understanding, then change and verify.</p></div></div>
                <ol className="debug-process">
                  <li><span>Error</span><p>Read the exact message</p></li><li aria-hidden="true">↓</li>
                  <li><span>Understand</span><p>Work out what it means</p></li><li aria-hidden="true">↓</li>
                  <li><span>Ask AI</span><p>Share evidence and relevant code</p></li><li aria-hidden="true">↓</li>
                  <li><span>Fix</span><p>Review and apply the smallest change</p></li><li aria-hidden="true">↓</li>
                  <li><span>Test again</span><p>Repeat the action and check nearby behaviour</p></li>
                </ol>
              </section>
              <section className="lesson-section" id="agent-debugging-lab" aria-labelledby="debug-lab-heading">
                <div className="section-heading"><span>03</span><div><h3 id="debug-lab-heading">Exercise: debug a broken interface</h3><p>Follow the workflow to rescue a task-list mockup.</p></div></div>
                <AgenticDebugLab />
              </section>
              <PageNavigation backTitle="Plan mode" onBack={() => goToSlide("slidePlanMode")} nextTitle="VS Code Basics" onNext={() => goToSlide("slideVSCode")} />
            </section>
          )}

          {/* Slide 6 */}
          {slide === "slide6" && (
            <section className="content-page lesson-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">KNOWLEDGE CHECK</span>
                <h2 id="quiz-intro">Ready for a Quiz?</h2>
                <p>Let's check what you've learned so far — multiple choice questions.</p>
              </div>
              <section className="lesson-section" aria-labelledby="quiz-format">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="quiz-format">What to Expect</h3>
                    <p>Move through one question at a time and submit when you are ready.</p>
                  </div>
                </div>
                <ul className="feature-list">
                  <li>16 questions across the full course</li>
                  <li>One answer per multiple-choice question</li>
                  <li>Explanations shown after you submit</li>
                  <li>Reset and try again at any time</li>
                </ul>
              </section>
              <PageNavigation
                backTitle="Debugging on Vercel"
                onBack={() => goToSlide("slideVercelDebug")}
                nextTitle="Take the quiz"
                onNext={() => goToSlide("slide7")}
              />
            </section>
          )}

          {/* Slide 7: Quiz */}
          {slide === "slide7" && (
            <section className="content-page quiz-page lesson-page">
              <div className="lesson-intro quiz-lesson-intro">
                <span className="lesson-kicker">KNOWLEDGE CHECK</span>
                <h2 id="quiz-questions">📝 Quiz — Multiple Choice</h2>
                <p>Use the arrows to move between questions. Your selected answers are saved as you go.</p>
              </div>
              <div className="quiz-actions">
                <button onClick={gradeQuiz}>Submit Answers</button>
                <button onClick={resetQuiz} className="secondary">Reset</button>
              </div>

              <div id="quizArea" className="quiz-carousel">
                <button
                  className="quiz-arrow quiz-arrow--previous"
                  type="button"
                  aria-label="Previous question"
                  disabled={quizIndex === 0}
                  onClick={() => moveQuiz(quizIndex - 1)}
                >
                  <span aria-hidden="true">←</span>
                </button>

                <div className="quiz-card-window">
                  <article
                    key={quizIndex}
                    className={`quiz-question-card quiz-question-card--${quizDirection}`}
                  >
                    <div className="quiz-progress">
                      <span>Question {quizIndex + 1} of {quiz.length}</span>
                      <span>{Math.round(((quizIndex + 1) / quiz.length) * 100)}%</span>
                    </div>
                    <div className="quiz-progress__track" aria-hidden="true">
                      <span style={{ width: `${((quizIndex + 1) / quiz.length) * 100}%` }} />
                    </div>

                    <p className="quiz-question">
                      <strong>{currentQuizItem.q}</strong>
                    </p>

                    <div className="quiz-options">
                      {currentQuizItem.opts.map((opt, idx) => {
                        const selected = answers[quizIndex] === idx;
                        const isCorrect = graded && currentQuizItem.a === idx;
                        const isSelectedWrong =
                          graded && selected && currentQuizItem.a !== idx;

                        return (
                          <label
                            key={opt}
                            className={`quiz-option ${selected ? "is-selected" : ""} ${isCorrect ? "is-correct" : ""} ${isSelectedWrong ? "is-incorrect" : ""}`}
                          >
                            <input
                              type="radio"
                              name={`q${quizIndex}`}
                              checked={selected}
                              onChange={() => selectAnswer(quizIndex, idx)}
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>

                    {graded && (
                      <div className="explain">
                        {answers[quizIndex] === currentQuizItem.a
                          ? <span className="correct">Correct!</span>
                          : <span className="incorrect">Incorrect.</span>}
                        <br />
                        {explanations[quizIndex]}
                      </div>
                    )}
                  </article>
                </div>

                <button
                  className="quiz-arrow quiz-arrow--next"
                  type="button"
                  aria-label="Next question"
                  disabled={quizIndex === quiz.length - 1}
                  onClick={() => moveQuiz(quizIndex + 1)}
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              {graded && (
                <p className="quiz-score">Your score: {score} / {quiz.length}</p>
              )}

              <PageNavigation
                backTitle="Quiz introduction"
                onBack={() => goToSlide("slide6")}
                nextTitle="Course complete"
                onNext={() => goToSlide("slide8")}
              />

            </section>
          )}

          {/* Slide 8 */}
          {slide === "slide8" && (
            <section className="content-page lesson-page">
              <div className="lesson-intro completion-intro">
                <span className="lesson-kicker">COURSE COMPLETE</span>
                <h2 id="course-complete">🎉 Great job!</h2>
                <p>You’ve completed the entire Web Dev Toolchain 101 course.</p>
              </div>
              <section className="lesson-section" aria-labelledby="course-summary">
                <div className="section-heading">
                  <span>✓</span>
                  <div>
                    <h3 id="course-summary">What You Learned</h3>
                    <p>You now understand the tools that take a project from local development to the web.</p>
                  </div>
                </div>
                <p className="completion-summary">You learned about Git, GitHub, GitHub Actions, Vite, and modern development workflows.</p>
              </section>
              <PageNavigation
                backTitle="Take the quiz"
                onBack={() => goToSlide("slide7")}
                nextTitle="Home"
                onNext={() => goToSlide("slide1")}
              />
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
