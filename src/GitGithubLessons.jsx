import "./GitGithubLessons.css";
import { gitLessonPages } from "./gitLessonsData";

const lessonOrder = gitLessonPages.map((page) => page.slide);

function CommandBlock({ children, label = "TERMINAL" }) {
  return (
    <div className="quickstart-command">
      <span>{label}</span>
      <pre>{children}</pre>
    </div>
  );
}

function Outcome({ children }) {
  return (
    <div className="quickstart-outcome">
      <span aria-hidden="true">✓</span>
      <div>
        <strong>What success looks like</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

function Checkpoint({ title, children }) {
  return (
    <aside className="quickstart-checkpoint">
      <span>PAUSE &amp; CHECK</span>
      <h4>{title}</h4>
      <p>{children}</p>
    </aside>
  );
}

function TaskSteps({ children }) {
  return <ol className="quickstart-steps">{children}</ol>;
}

function LessonShell({
  slide,
  kicker,
  title,
  intro,
  onNavigate,
  children,
}) {
  const index = lessonOrder.indexOf(slide);
  const previous = index > 0 ? gitLessonPages[index - 1] : null;
  const next = index < gitLessonPages.length - 1 ? gitLessonPages[index + 1] : null;

  return (
    <section className="content-page lesson-page quickstart-page">
      <div className="lesson-intro" id={gitLessonPages[index]?.target}>
        <span className="lesson-kicker">{kicker}</span>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>

      {children}

      <div className="page-navigation" aria-label="Page navigation">
        <button
          className="page-navigation__button page-navigation__button--back"
          onClick={() => onNavigate(previous?.slide || "slideVSCode")}
        >
          <span className="page-navigation__direction">← Back</span>
          <span className="page-navigation__title">{previous?.label || "VS Code Basics"}</span>
        </button>
        <button
          className="page-navigation__button page-navigation__button--next"
          onClick={() => onNavigate(next?.slide || "slide5")}
        >
          <span className="page-navigation__direction">Next →</span>
          <span className="page-navigation__title">{next?.label || "What is Vite?"}</span>
        </button>
      </div>
    </section>
  );
}

function Overview({ onNavigate }) {
  return (
    <LessonShell
      slide="gitOverview"
      kicker="THE WHOLE WORKFLOW, BEFORE THE COMMANDS"
      title="Git and GitHub: your project’s save system"
      intro="Git records useful checkpoints on your computer. GitHub hosts a copy online so you can share, review, and automate the work. They are connected, but they are not the same thing."
      result="You can explain where your work lives and choose the next Git action."
      time="8 min"
      onNavigate={onNavigate}
    >
      <section className="lesson-section">
        <div className="section-heading">
          <span>01</span>
          <div>
            <h3>The four places a change can live</h3>
            <p>Most Git confusion disappears when you know which place you are changing.</p>
          </div>
        </div>
        <div className="four-places" aria-label="Git mental model">
          <article><span>1</span><strong>Working folder</strong><p>The files you are editing now.</p><code>edit</code></article>
          <b aria-hidden="true">→</b>
          <article><span>2</span><strong>Staging area</strong><p>The changes chosen for the next save.</p><code>git add</code></article>
          <b aria-hidden="true">→</b>
          <article><span>3</span><strong>Local history</strong><p>Checkpoints stored on your computer.</p><code>git commit</code></article>
          <b aria-hidden="true">→</b>
          <article><span>4</span><strong>GitHub</strong><p>The shared copy hosted online.</p><code>git push</code></article>
        </div>
        <p className="quickstart-callout"><strong>The key distinction:</strong> a commit is local. It does not appear on GitHub until you push it.</p>
      </section>

      <section className="lesson-section">
        <div className="section-heading">
          <span>02</span>
          <div><h3>The everyday loop</h3><p>This same loop powers solo projects, teamwork, pull requests, and deployments.</p></div>
        </div>
        <div className="golden-path">
          {["Edit", "Check", "Stage", "Commit", "Push", "Review", "Merge", "Pull"].map((item, index) => (
            <div key={item}><span>{index + 1}</span><strong>{item}</strong></div>
          ))}
        </div>
        <Checkpoint title="Which tool is doing what?">
          Git is the version-control system. GitHub is one service that hosts Git repositories.
          GitHub Desktop is a visual interface for many of the same Git operations.
        </Checkpoint>
      </section>
    </LessonShell>
  );
}

function FirstRepo({ onNavigate, workflowActivity }) {
  return (
    <LessonShell
      slide="gitFirstRepo"
      kicker="YOUR FIRST LOCAL CHECKPOINT"
      title="Turn a folder into a Git repository"
      intro="You will create a tiny portfolio project, ask Git what changed, choose one file, and save a meaningful checkpoint."
      result="Your project has one commit and a clean working tree."
      time="15 min"
      onNavigate={onNavigate}
    >
      <section className="lesson-section">
        <div className="section-heading"><span>01</span><div><h3>Make the first commit</h3><p>Run each command from inside your project folder.</p></div></div>
        <TaskSteps>
          <li><span>1</span><div><h4>Create or open a project folder</h4><CommandBlock>{`mkdir portfolio\ngit init portfolio\ncd portfolio`}</CommandBlock><p><code>git init</code> adds Git history without changing your project files.</p></div></li>
          <li><span>2</span><div><h4>Create a README.md file</h4><p>Add a heading such as <code># My portfolio</code>, then save the file.</p></div></li>
          <li><span>3</span><div><h4>Ask Git what it sees</h4><CommandBlock>{`git status`}</CommandBlock><p>The README appears under “Untracked files” because Git has never saved it.</p></div></li>
          <li><span>4</span><div><h4>Choose the file and check again</h4><CommandBlock>{`git add README.md\ngit status`}</CommandBlock><p>The file moves to “Changes to be committed.” This is the staging area.</p></div></li>
          <li><span>5</span><div><h4>Save the checkpoint</h4><CommandBlock>{`git commit -m "Add portfolio README"\ngit status\ngit log --oneline`}</CommandBlock></div></li>
        </TaskSteps>
        <Outcome><code>git status</code> says “working tree clean” and <code>git log --oneline</code> shows your commit.</Outcome>
      </section>
      <section className="lesson-section">
        <div className="section-heading"><span>02</span><div><h3>Watch the file move</h3><p>The existing activity now reinforces the workflow you just completed.</p></div></div>
        {workflowActivity}
      </section>
    </LessonShell>
  );
}

function Publish({ onNavigate }) {
  return (
    <LessonShell
      slide="gitPublish"
      kicker="FROM YOUR COMPUTER TO THE CLOUD"
      title="Publish the repository to GitHub"
      intro="Create an empty repository on GitHub, connect it to your local history, and push the commits online."
      result="The README and first commit are visible on GitHub."
      time="12 min"
      onNavigate={onNavigate}
    >
      <section className="lesson-section">
        <div className="section-heading"><span>01</span><div><h3>Create the remote</h3><p>A remote is a named address for another copy of your repository.</p></div></div>
        <TaskSteps>
          <li><span>1</span><div><h4>Create an empty GitHub repository</h4><p>On GitHub, select <strong>New repository</strong>, name it <code>portfolio</code>, and do not add a README because your local project already has one.</p></div></li>
          <li><span>2</span><div><h4>Connect the address</h4><CommandBlock>{`git remote add origin https://github.com/YOUR-USERNAME/portfolio.git\ngit remote -v`}</CommandBlock><p><code>origin</code> is the conventional nickname for the GitHub copy.</p></div></li>
          <li><span>3</span><div><h4>Name the main branch and publish it</h4><CommandBlock>{`git branch -M main\ngit push -u origin main`}</CommandBlock><p>The <code>-u</code> remembers where this branch should push next time.</p></div></li>
          <li><span>4</span><div><h4>Refresh GitHub</h4><p>Your files, commit message, and README should now appear on the repository page.</p></div></li>
        </TaskSteps>
        <Outcome>Your browser and local terminal show the same latest commit. Future updates usually need only <code>git push</code>.</Outcome>
        <Checkpoint title="A GitHub password will not work in Git">
          With an HTTPS remote, sign in through the credential manager or browser prompt. GitHub no longer accepts an account password for Git operations.
        </Checkpoint>
      </section>
    </LessonShell>
  );
}

function Sync({ onNavigate }) {
  return (
    <LessonShell
      slide="gitSync"
      kicker="START OR CONTINUE EXISTING WORK"
      title="Clone a repository and keep it in sync"
      intro="Cloning creates a complete local copy. Fetch checks for remote history; pull brings that history into your current branch."
      result="You can download a project, inspect its history, and safely get updates."
      time="12 min"
      onNavigate={onNavigate}
    >
      <section className="lesson-section">
        <div className="section-heading"><span>01</span><div><h3>Clone the portfolio</h3><p>Do this in a different parent folder so you do not clone inside the original repository.</p></div></div>
        <TaskSteps>
          <li><span>1</span><div><h4>Copy the repository URL from GitHub</h4><p>Use the green <strong>Code</strong> button and copy the HTTPS address.</p></div></li>
          <li><span>2</span><div><h4>Download the repository and its history</h4><CommandBlock>{`git clone https://github.com/YOUR-USERNAME/portfolio.git\ncd portfolio\ngit log --oneline`}</CommandBlock></div></li>
          <li><span>3</span><div><h4>Check before integrating updates</h4><CommandBlock>{`git fetch origin\ngit status`}</CommandBlock><p><code>fetch</code> updates your knowledge of GitHub without changing your files.</p></div></li>
          <li><span>4</span><div><h4>Bring the latest main branch into your files</h4><CommandBlock>{`git pull origin main`}</CommandBlock></div></li>
        </TaskSteps>
        <div className="command-comparison">
          <article><code>clone</code><p>Create a new local copy.</p></article>
          <article><code>fetch</code><p>Check and download remote history.</p></article>
          <article><code>pull</code><p>Fetch, then integrate into your branch.</p></article>
          <article><code>push</code><p>Send local commits to the remote.</p></article>
        </div>
        <Outcome><code>git status</code> reports that your branch is up to date with <code>origin/main</code>.</Outcome>
      </section>
    </LessonShell>
  );
}

function Branches({ onNavigate }) {
  return (
    <LessonShell
      slide="gitBranches"
      kicker="EXPERIMENT WITHOUT BREAKING MAIN"
      title="Build a feature on a branch"
      intro="A branch is a movable label pointing to a line of commits. It lets you develop and review work before changing the stable main branch."
      result="A feature branch is created, committed, merged, and removed."
      time="15 min"
      onNavigate={onNavigate}
    >
      <section className="lesson-section">
        <div className="section-heading"><span>01</span><div><h3>Create and merge a branch</h3><p>You will add a short About section without editing main directly.</p></div></div>
        <TaskSteps>
          <li><span>1</span><div><h4>Begin from an up-to-date main</h4><CommandBlock>{`git switch main\ngit pull\ngit switch -c feature/about-section`}</CommandBlock></div></li>
          <li><span>2</span><div><h4>Edit, review, and commit</h4><p>Add an About section to the README, then run:</p><CommandBlock>{`git diff\ngit add README.md\ngit commit -m "Add portfolio about section"`}</CommandBlock></div></li>
          <li><span>3</span><div><h4>Merge locally</h4><CommandBlock>{`git switch main\ngit merge feature/about-section\ngit log --oneline --graph --all`}</CommandBlock></div></li>
          <li><span>4</span><div><h4>Remove the finished label</h4><CommandBlock>{`git branch -d feature/about-section`}</CommandBlock><p>Deleting a merged branch does not delete its commits from main.</p></div></li>
        </TaskSteps>
        <Outcome>The About section appears on <code>main</code>, and the graph shows the saved work in history.</Outcome>
      </section>
    </LessonShell>
  );
}

function PullRequests({ onNavigate }) {
  return (
    <LessonShell
      slide="gitPullRequests"
      kicker="PROPOSE, DISCUSS, THEN MERGE"
      title="Collaborate through a pull request"
      intro="A pull request is not a Git command. It is GitHub’s review space around changes on a branch."
      result="A branch is reviewed and merged on GitHub, then synchronized locally."
      time="15 min"
      onNavigate={onNavigate}
    >
      <section className="lesson-section">
        <div className="section-heading"><span>01</span><div><h3>Run the complete team loop</h3><p>Even when working alone, this creates a safer and more visible workflow.</p></div></div>
        <TaskSteps>
          <li><span>1</span><div><h4>Create and publish a branch</h4><CommandBlock>{`git switch -c feature/contact-link\n# edit and save README.md\ngit add README.md\ngit commit -m "Add contact link"\ngit push -u origin feature/contact-link`}</CommandBlock></div></li>
          <li><span>2</span><div><h4>Open the pull request</h4><p>On GitHub, select <strong>Compare &amp; pull request</strong>. Explain what changed, why, and how you checked it.</p></div></li>
          <li><span>3</span><div><h4>Review the actual diff</h4><p>Open <strong>Files changed</strong>. Leave a comment or request a change if the result does not match the goal.</p></div></li>
          <li><span>4</span><div><h4>Merge and clean up</h4><p>Select <strong>Merge pull request</strong>, confirm it, and delete the remote feature branch.</p></div></li>
          <li><span>5</span><div><h4>Update your computer</h4><CommandBlock>{`git switch main\ngit pull\ngit branch -d feature/contact-link`}</CommandBlock></div></li>
        </TaskSteps>
        <Outcome>GitHub says the pull request is merged, and your local <code>main</code> contains the contact link.</Outcome>
      </section>
    </LessonShell>
  );
}

function Recovery({ onNavigate }) {
  return (
    <LessonShell
      slide="gitRecovery"
      kicker="RECOVER WITH CONFIDENCE"
      title="Fix common mistakes and merge conflicts"
      intro="The safest recovery command depends on where the mistake lives: in your files, in staging, in a local commit, or in shared history."
      result="You can choose a safe undo and resolve a simple conflict."
      time="18 min"
      onNavigate={onNavigate}
    >
      <section className="lesson-section">
        <div className="section-heading"><span>01</span><div><h3>Use the recovery ladder</h3><p>Inspect first. Avoid destructive commands when you are unsure.</p></div></div>
        <div className="recovery-grid">
          <article><span>UNCOMMITTED FILE</span><h4>Discard one file’s edits</h4><code>git restore README.md</code><p>Returns the file to its last committed version.</p></article>
          <article><span>STAGED BY ACCIDENT</span><h4>Remove it from staging</h4><code>git restore --staged README.md</code><p>Keeps the file edits but removes them from the next commit.</p></article>
          <article><span>LAST LOCAL COMMIT</span><h4>Improve the checkpoint</h4><code>git commit --amend</code><p>Use only before that commit has been shared.</p></article>
          <article><span>ALREADY SHARED</span><h4>Create a reversing commit</h4><code>git revert &lt;commit&gt;</code><p>Preserves shared history instead of rewriting it.</p></article>
        </div>
      </section>
      <section className="lesson-section">
        <div className="section-heading"><span>02</span><div><h3>Resolve a merge conflict</h3><p>A conflict is Git asking a human which overlapping edit should win.</p></div></div>
        <TaskSteps>
          <li><span>1</span><div><h4>Find the files</h4><CommandBlock>{`git status`}</CommandBlock></div></li>
          <li><span>2</span><div><h4>Open each conflicted file</h4><p>Choose or combine the content between <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>. Remove the marker lines.</p></div></li>
          <li><span>3</span><div><h4>Mark the decision and finish</h4><CommandBlock>{`git add README.md\ngit commit`}</CommandBlock></div></li>
        </TaskSteps>
        <Checkpoint title="Need to stop and reconsider?">
          During a merge, <code>git merge --abort</code> returns to the state before the merge began.
        </Checkpoint>
      </section>
    </LessonShell>
  );
}

function Desktop({ onNavigate }) {
  const mappings = [
    ["Changes list", "git status + git diff", "See exactly what changed"],
    ["Commit to branch", "git add + git commit", "Choose and save a checkpoint"],
    ["Publish / Push origin", "git push", "Send commits to GitHub"],
    ["Fetch / Pull origin", "git fetch / git pull", "Get remote updates"],
    ["New branch", "git switch -c", "Start an isolated line of work"],
    ["Create Pull Request", "GitHub web workflow", "Propose the published branch"],
  ];
  return (
    <LessonShell
      slide="gitDesktop"
      kicker="THE SAME MODEL, WITH BUTTONS"
      title="Use GitHub Desktop without losing the Git intuition"
      intro="GitHub Desktop provides visual confirmation for common operations. The files, commits, branches, and remote repository remain the same."
      result="You can translate Desktop buttons into the Git operation underneath."
      time="10 min"
      onNavigate={onNavigate}
    >
      <section className="lesson-section">
        <div className="section-heading"><span>01</span><div><h3>Run the same workflow visually</h3><p>Sign in, clone or add the portfolio repository, then make one small README change.</p></div></div>
        <TaskSteps>
          <li><span>1</span><div><h4>Install and sign in</h4><p>Download GitHub Desktop, authenticate with GitHub, and confirm your Git name and email.</p><a href="https://desktop.github.com/download/" target="_blank" rel="noreferrer">Download GitHub Desktop ↗</a></div></li>
          <li><span>2</span><div><h4>Clone the portfolio</h4><p>Select <strong>File → Clone repository</strong>, choose the repository, and choose a local folder.</p></div></li>
          <li><span>3</span><div><h4>Create a branch and edit</h4><p>Use <strong>Current branch → New branch</strong>, then open the project in VS Code and edit the README.</p></div></li>
          <li><span>4</span><div><h4>Commit, publish, and open a PR</h4><p>Review the changed lines, write a clear summary, commit, publish the branch, then select <strong>Create Pull Request</strong>.</p></div></li>
        </TaskSteps>
        <div className="desktop-map">
          {mappings.map(([button, command, meaning]) => <div key={button}><strong>{button}</strong><code>{command}</code><span>{meaning}</span></div>)}
        </div>
      </section>
    </LessonShell>
  );
}

function Actions({ onNavigate, actionsBuilder }) {
  return (
    <LessonShell
      slide="gitActions"
      kicker="AUTOMATE CHECKS BEFORE YOU DEPLOY"
      title="From GitHub Actions to deployment"
      intro="A push can trigger GitHub Actions to test and build the project. When those checks pass, the same commit is ready for a deployment platform to publish as a preview or live website."
      result="Every push is checked before the approved commit becomes a deployment."
      time="15 min"
      onNavigate={onNavigate}
    >
      <section className="lesson-section">
        <div className="section-heading"><span>01</span><div><h3>Create the workflow file</h3><p>For a Vite project with a committed package-lock.json, use npm ci for repeatable installs.</p></div></div>
        <CommandBlock label=".github/workflows/ci.yml">{`name: Project checks

on:
  push:
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build`}</CommandBlock>
        <TaskSteps>
          <li><span>1</span><div><h4>Save and push the file</h4><CommandBlock>{`git add .github/workflows/ci.yml\ngit commit -m "Add project build check"\ngit push`}</CommandBlock></div></li>
          <li><span>2</span><div><h4>Watch the run</h4><p>Open the repository’s <strong>Actions</strong> tab, choose the latest run, then open the <strong>build</strong> job.</p></div></li>
          <li><span>3</span><div><h4>Read a failure from the top down</h4><p>Open the first failed step, find the first useful error, reproduce it locally, and commit the fix.</p></div></li>
        </TaskSteps>
        <Outcome>The run shows a green check. A failing build now appears before a pull request is merged or deployed.</Outcome>
      </section>
      <section className="lesson-section">
        <div className="section-heading"><span>02</span><div><h3>How checks connect to deployment</h3><p>GitHub Actions and a deployment platform can respond to the same Git activity, but they have different jobs.</p></div></div>
        <div className="actions-deployment-flow" aria-label="Flow from Git push through GitHub Actions to deployment">
          <article><span>1</span><strong>Push</strong><p>A commit reaches GitHub.</p></article>
          <b aria-hidden="true">→</b>
          <article><span>2</span><strong>Check</strong><p>Actions installs, tests, and builds.</p></article>
          <b aria-hidden="true">→</b>
          <article><span>3</span><strong>Approve</strong><p>Required checks pass and the change is merged.</p></article>
          <b aria-hidden="true">→</b>
          <article><span>4</span><strong>Deploy</strong><p>Vercel or another host publishes that commit.</p></article>
          <b aria-hidden="true">→</b>
          <article><span>5</span><strong>Visit</strong><p>A preview or production URL is ready.</p></article>
        </div>
        <div className="actions-deployment-roles">
          <article><span>CI · CONTINUOUS INTEGRATION</span><h4>Protect the deployment</h4><p>GitHub Actions checks that the project can build and that tests pass. A failed check should stop unsafe code from moving forward.</p></article>
          <article><span>CD · CONTINUOUS DEPLOYMENT</span><h4>Publish the approved commit</h4><p>A deployment service builds and hosts the website. Feature branches usually create previews; the production branch updates the live site.</p></article>
        </div>
        <p className="quickstart-callout"><strong>Important:</strong> GitHub Actions does not automatically host the website. It can run deployment commands itself, or it can act as the quality gate while Vercel reacts to the approved Git commit.</p>
        <button type="button" className="actions-deployment-link" onClick={() => onNavigate("slideVercelGit")}>
          Continue to the Vercel deployment flow →
        </button>
      </section>
      <section className="lesson-section">
        <div className="section-heading"><span>03</span><div><h3>Build the workflow interactively</h3><p>Experiment with triggers and steps, then run the simulated job.</p></div></div>
        {actionsBuilder}
      </section>
    </LessonShell>
  );
}

function Reference({ onNavigate }) {
  const groups = [
    ["Inspect", [["git status", "What changed and where?"], ["git diff", "Show unstaged line changes"], ["git log --oneline --graph --all", "Show compact history"]]],
    ["Save", [["git add <file>", "Stage one file"], ["git commit -m \"Message\"", "Save a checkpoint"], ["git restore --staged <file>", "Unstage but keep edits"]]],
    ["Share", [["git clone <url>", "Create a local copy"], ["git pull", "Fetch and integrate"], ["git push", "Send local commits"]]],
    ["Branch", [["git switch -c <name>", "Create and enter a branch"], ["git switch main", "Return to main"], ["git merge <branch>", "Integrate a branch"]]],
  ];
  return (
    <LessonShell
      slide="gitReference"
      kicker="USE THIS WHILE YOU WORK"
      title="Git command and troubleshooting reference"
      intro="You do not need to memorize every command. Start by identifying your goal and checking the repository state."
      result="You can quickly find a command and know what it changes."
      time="5 min"
      onNavigate={onNavigate}
    >
      <section className="lesson-section">
        <div className="section-heading"><span>01</span><div><h3>Commands by job</h3><p>Run <code>git status</code> before and after an unfamiliar operation.</p></div></div>
        <div className="reference-grid">
          {groups.map(([name, commands]) => (
            <article key={name}><h4>{name}</h4>{commands.map(([command, meaning]) => <div key={command}><code>{command}</code><span>{meaning}</span></div>)}</article>
          ))}
        </div>
      </section>
      <section className="lesson-section">
        <div className="section-heading"><span>02</span><div><h3>When something looks wrong</h3><p>Read the exact message and inspect before trying random commands.</p></div></div>
        <div className="troubleshooting-list">
          <details><summary>“Not a git repository”</summary><p>You are in the wrong folder or have not run <code>git init</code>. Use <code>pwd</code> on macOS or <code>Get-Location</code> in PowerShell to check your location.</p></details>
          <details><summary>“Nothing to commit”</summary><p>Your files match the latest commit, or the changed file was not saved. Run <code>git status</code>.</p></details>
          <details><summary>Push is rejected</summary><p>GitHub probably has commits you do not have. Run <code>git pull</code>, resolve any conflict, then push again.</p></details>
          <details><summary>Committed on the wrong branch</summary><p>Do not delete anything immediately. Note the commit ID from <code>git log --oneline</code> and ask for help moving or cherry-picking it.</p></details>
        </div>
      </section>
      <section className="lesson-section">
        <div className="section-heading"><span>03</span><div><h3>Go deeper when you need to</h3><p>Use official documentation for exhaustive options and edge cases.</p></div></div>
        <div className="resource-links">
          <a href="https://git-scm.com/book/en/v2" target="_blank" rel="noreferrer"><strong>Pro Git book</strong><span>Free, detailed Git concepts ↗</span></a>
          <a href="https://git-scm.com/docs" target="_blank" rel="noreferrer"><strong>Git reference</strong><span>Every command and option ↗</span></a>
          <a href="https://docs.github.com/en/get-started/using-git" target="_blank" rel="noreferrer"><strong>GitHub Git guides</strong><span>Remotes and collaboration ↗</span></a>
          <a href="https://docs.github.com/en/actions" target="_blank" rel="noreferrer"><strong>GitHub Actions docs</strong><span>Workflows, runners, and security ↗</span></a>
        </div>
      </section>
    </LessonShell>
  );
}

export default function GitGithubLessons({
  slide,
  onNavigate,
  workflowActivity,
  actionsBuilder,
}) {
  if (slide === "gitOverview") return <Overview onNavigate={onNavigate} />;
  if (slide === "gitFirstRepo") return <FirstRepo onNavigate={onNavigate} workflowActivity={workflowActivity} />;
  if (slide === "gitPublish") return <Publish onNavigate={onNavigate} />;
  if (slide === "gitSync") return <Sync onNavigate={onNavigate} />;
  if (slide === "gitBranches") return <Branches onNavigate={onNavigate} />;
  if (slide === "gitPullRequests") return <PullRequests onNavigate={onNavigate} />;
  if (slide === "gitRecovery") return <Recovery onNavigate={onNavigate} />;
  if (slide === "gitDesktop") return <Desktop onNavigate={onNavigate} />;
  if (slide === "gitActions") return <Actions onNavigate={onNavigate} actionsBuilder={actionsBuilder} />;
  if (slide === "gitReference") return <Reference onNavigate={onNavigate} />;
  return null;
}
