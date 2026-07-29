import { useState, useEffect } from "react";
import "./App.css";

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

export default function WebDevToolchain101() {
  const [slide, setSlide] = useState("slide1");
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [answers, setAnswers] = useState(() => Array(16).fill(null));
  const [graded, setGraded] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizDirection, setQuizDirection] = useState("next");

  const menuSections = [
    {
      title: "VS Code Basics",
      slide: "slideVSCode",
      pages: [
        { label: "Overview", target: "vscode-overview" },
        { label: "Why VS Code?", target: "vscode-why" },
        { label: "Key concepts", target: "vscode-concepts" },
      ],
    },
    {
      title: "Git Basics",
      slide: "slide2",
      pages: [
        { label: "What is Git?", target: "git-overview" },
        { label: "Why Git matters", target: "git-why" },
        { label: "Key terms", target: "git-terms" },
        { label: "Common commands", target: "git-commands" },
      ],
    },
    {
      title: "GitHub",
      slide: "slide3",
      pages: [
        { label: "What is GitHub?", target: "github-overview" },
        { label: "Why GitHub is useful", target: "github-why" },
        { label: "Key terms", target: "github-terms" },
        { label: "Common commands", target: "github-commands" },
      ],
    },
    {
      title: "GitHub Actions",
      slide: "slide4",
      pages: [
        { label: "Actions overview", target: "actions-overview" },
        { label: "Why automation matters", target: "actions-why" },
        { label: "Key terms", target: "actions-terms" },
        { label: "Example workflow", target: "actions-example" },
      ],
    },
    {
      title: "Vite",
      slide: "slide5",
      pages: [
        { label: "What is Vite?", target: "vite-overview" },
        { label: "Why Vite is fast", target: "vite-why" },
        { label: "Key terms", target: "vite-terms" },
        { label: "Create a Vite project", target: "vite-example" },
      ],
    },
    {
      title: "Vercel",
      slide: "slide9",
      pages: [
        { label: "Getting started", target: "vercel-overview" },
        { label: "Connect a repository", target: "vercel-connect" },
        { label: "First deployment", target: "vercel-first-deployment" },
        { label: "Git deployments", slide: "slideVercelGit", target: "vercel-git-overview" },
        { label: "Every push", slide: "slideVercelGit", target: "vercel-every-push" },
        { label: "Preview vs production", slide: "slideVercelGit", target: "vercel-environments" },
        { label: "Deployment URLs", slide: "slideVercelGit", target: "vercel-urls" },
        { label: "Team workflow", slide: "slideVercelGit", target: "vercel-team-flow" },
        { label: "Debugging on Vercel", slide: "slideVercelDebug", target: "vercel-debugging" },
        { label: "What is a rollback?", slide: "slideVercelDebug", target: "vercel-rollback" },
        { label: "Finding errors in logs", slide: "slideVercelDebug", target: "vercel-logs" },
      ],
    },
    {
      title: "Knowledge check",
      slide: "slide6",
      pages: [
        { label: "Quiz introduction", target: "quiz-intro" },
        { label: "Take the quiz", slide: "slide7", target: "quiz-questions" },
        { label: "Course completion", slide: "slide8", target: "course-complete" },
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moveQuiz = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= quiz.length) return;
    setQuizDirection(nextIndex > quizIndex ? "next" : "previous");
    setQuizIndex(nextIndex);
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
  const headerTitles = {
    slide1: "Web Dev Toolchain 101",
    slideVSCode: "VS Code",
    slide2: "Git",
    slide3: "GitHub",
    slide4: "GitHub Actions",
    slide5: "Vite",
    slide9: "Vercel",
    slideVercelGit: "Vercel",
    slideVercelDebug: "Vercel Debugging",
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
          .container {width: 100%;max-width: none;margin: 0;padding: 20px;}
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
            <section className="card" id="home-overview">
              <h2>Welcome!</h2>
              <p>Select a module below to begin learning:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
                <div className="card module-card" onClick={() => goToSlide('slideVSCode')}>
                  <h3>💻 VS Code Basics</h3>
                  <p>Learn the essentials of Visual Studio Code.</p>
                </div>
                <div className="card module-card" onClick={() => goToSlide('slide2')}>
                  <h3>🧩 Git Basics</h3>
                  <p>Learn what Git is and how version control works.</p>
                </div>
                <div className="card module-card" onClick={() => goToSlide('slide3')}>
                  <h3>🐙 GitHub</h3>
                  <p>Understand online repos and collaboration.</p>
                </div>
                <div className="card module-card" onClick={() => goToSlide('slide4')}>
                  <h3>⚙️ GitHub Actions</h3>
                  <p>Automate tasks with CI/CD.</p>
                </div>
                <div className="card module-card" onClick={() => goToSlide('slide5')}>
                  <h3>⚡ Vite</h3>
                  <p>Build super-fast frontend apps.</p>
                </div>
                <div className="card module-card" onClick={() => goToSlide('slide9')}>
                  <h3>▲ Vercel</h3>
                  <p>Deploy your Git repo to the web.</p>
                </div>
              </div>
            </section>
          )}

          {/* Slide 9 */}
          {slide === "slide9" && (
            <section className="content-page lesson-page">
              <div className="lesson-intro">
                <span className="lesson-kicker">GETTING STARTED</span>
                <h2 id="vercel-overview">▲ Connect GitHub to Vercel</h2>
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
                backTitle="Vite"
                onBack={() => goToSlide("slide5")}
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
                backTitle="Deploying with Vercel"
                onBack={() => goToSlide("slide9")}
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
              </section>

              <section className="lesson-section" aria-labelledby="vercel-rollback-steps">
                <div className="section-heading">
                  <span>03</span>
                  <div>
                    <h3 id="vercel-rollback-steps">Roll Back and Recover</h3>
                    <p>Restore service first, then investigate and release a tested fix.</p>
                  </div>
                </div>

                <ol className="simple-workflow">
                  <li><span>1</span><p>Open the project overview and select <strong>Instant Rollback</strong>.</p></li>
                  <li><span>2</span><p>Choose the last known working production deployment.</p></li>
                  <li><span>3</span><p>Verify the domains and deployment, then confirm the rollback.</p></li>
                  <li><span>4</span><p>Reload the website and check production logs to confirm the errors have stopped.</p></li>
                  <li><span>5</span><p>Fix the problem and test it using a Preview deployment.</p></li>
                  <li><span>6</span><p>Promote the corrected deployment to Production to restore normal automatic deployments.</p></li>
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
                <figure className="vscode-diagram">
                  <img
                    src="/images/vscode-basics.png"
                    alt="Annotated Visual Studio Code interface showing the Explorer, Extensions, other views, Copilot chatbox, and integrated terminal."
                    loading="lazy"
                  />
                </figure>
              </section>

              <PageNavigation
                backTitle="Home"
                onBack={() => goToSlide("slide1")}
                nextTitle="What is Git?"
                onNext={() => goToSlide("slide2")}
              />

            </section>
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
                <span className="lesson-kicker">FAST FRONTEND DEVELOPMENT</span>
                <h2 id="vite-overview">⚡ What is Vite?</h2>
                <p>Vite is a modern frontend build tool designed to make development extremely fast. It provides a lightning‑quick dev server, instant updates when you save your files, and optimized production builds.</p>
              </div>

              <div className="lesson-summary">
                <h3 id="vite-why">Why Vite Is Game‑Changing</h3>
                <p>Traditional bundlers rebuild your entire project every time you make a change, which slows things down. Vite uses a new approach powered by <strong>ES Modules</strong>, which lets the browser handle module loading natively—making updates nearly instant.</p>
              </div>

              <section className="lesson-section" aria-labelledby="vite-terms">
                <div className="section-heading">
                  <span>01</span>
                  <div>
                    <h3 id="vite-terms">Key Terms</h3>
                    <p>The concepts behind Vite’s fast development experience.</p>
                  </div>
                </div>
                <dl className="lesson-terms">
                  <div><dt>ES Modules <span>(ESM)</span></dt><dd>A system that lets JavaScript import and export code cleanly between files.</dd></div>
                  <div><dt>Bundling</dt><dd>Combining your files and code into an optimized package for the browser.</dd></div>
                  <div><dt>Libraries</dt><dd>Pre-written code packages that make building features easier, like React or Vue.</dd></div>
                  <div><dt>Dependencies</dt><dd>Extra modules your Vite project needs to work properly.</dd></div>
                  <div><dt>Hot Module Reloading <span>(HMR)</span></dt><dd>A feature that updates your website instantly when you change code—without refreshing the page.</dd></div>
                </dl>
              </section>

              <section className="lesson-section" aria-labelledby="vite-example">
                <div className="section-heading">
                  <span>02</span>
                  <div>
                    <h3 id="vite-example">Create a Vite Project</h3>
                    <p>Four commands take you from a blank folder to a live development server.</p>
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
                backTitle="GitHub Actions"
                onBack={() => goToSlide("slide4")}
                nextTitle="Deploying with Vercel"
                onNext={() => goToSlide("slide9")}
              />

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
                backTitle="Vercel Git deployments"
                onBack={() => goToSlide("slideVercelGit")}
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
