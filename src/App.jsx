import { useState, useEffect } from "react";

export default function WebDevToolchain101() {
  const [slide, setSlide] = useState("slide1");
  const [answers, setAnswers] = useState([]);
  const [graded, setGraded] = useState(false);

  const quiz = [
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
    setAnswers(Array(quiz.length).fill(null));
  }, [quiz.length]);

  const selectAnswer = (qIndex, optIndex) => {
    const copy = [...answers];
    copy[qIndex] = optIndex;
    setAnswers(copy);
  };

  const gradeQuiz = () => setGraded(true);
  const resetQuiz = () => { setAnswers(Array(quiz.length).fill(null)); setGraded(false); };

  const explanations = [
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

  return (
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
        .controls{margin-top:12px}
      `}</style>

      <header>Web Dev Toolchain 101</header>

      <div className="container">

        {/* Slide 1 */}
        {slide === "slide1" && (
          <section className="card">
            <h2>Welcome!</h2>
            <p>This interactive page will teach the basics of the modern web development toolchain in a beginner-friendly way. Use the buttons to navigate the slides.</p>
            <div className="controls">
              <button onClick={() => setSlide("slide2")}>Start Learning →</button>
            </div>
          </section>
        )}

        {/* Slide 2 */}
        {slide === "slide2" && (
          <section className="card">
            <h2>🌱 What is Git?</h2>
            <p>Git is a powerful <strong>version control system</strong> that helps you track every change made to your code over time. It allows you to save checkpoints, experiment safely, undo mistakes, and collaborate with others without overwriting each other's work. Git is used by nearly every modern developer because it keeps projects organised and prevents data loss.</p>

            <h3>Why Git Matters</h3>
            <p>When building software, you constantly update files. Without Git, it’s easy to lose track of what changed, break things accidentally, or struggle to collaborate. Git solves this by recording every update as a structured history.</p>

            <h3>Key Terms</h3>
            <ul>
              <li><strong>Repository (repo):</strong> A project folder tracked by Git. It contains your code and the full history of all changes.</li>
              <li><strong>Version Control:</strong> A system that records changes so you can revert, review, or branch your work.</li>
              <li><strong>Commit:</strong> A saved snapshot of your project at a specific moment.</li>
              <li><strong>Staging Area:</strong> A place where you prepare files before saving them in a commit.</li>
              <li><strong>Branch:</strong> A separate line of development where you can work on features without affecting the main code.</li>
            </ul>

            <h3>Common Commands (Example)</h3>
            <pre>{`git init\ngit add .\ngit commit -m "First commit"`}</pre>

            <div className="explain"><strong>Simple explanation:</strong> git init starts Git tracking in your folder. git add . tells Git which changes you want to save. git commit saves those changes permanently as a numbered snapshot.</div>

            <div className="controls">
              <button className="secondary" onClick={() => setSlide("slide1")}>← Back</button>
              <button onClick={() => setSlide("slide3")}>Next →</button>
            </div>
          </section>
        )}

        {/* Slide 3 */}
        {slide === "slide3" && (
          <section className="card">
            <h2>🐙 What is GitHub?</h2>
            <p>GitHub is an online hosting platform built around Git. It stores your repositories in the cloud, making them accessible from anywhere and easy to share. It also provides tools for collaboration, automation, issue tracking, reviewing changes, and managing software projects.</p>

            <h3>Why GitHub Is Useful</h3>
            <p>When teams work together, GitHub keeps everything organised. Developers can open pull requests, leave comments, review code, track bugs, and store documentation all in one place. GitHub also powers automation through GitHub Actions.</p>

            <h3>Key Terms</h3>
            <ul>
              <li><strong>Repository (repo):</strong> A project stored on GitHub containing your files and complete change history.</li>
              <li><strong>Remote:</strong> An online version of your repository stored on platforms like GitHub.</li>
              <li><strong>Push:</strong> Upload your local commits to GitHub.</li>
              <li><strong>Pull Request (PR):</strong> A request asking others to review and approve changes before merging them.</li>
              <li><strong>Clone:</strong> Download a GitHub repo so you can work on it locally.</li>
            </ul>

            <h3>Common Commands (Example)</h3>
            <pre>{`git remote add origin https://github.com/username/repo.git\ngit push -u origin main`}</pre>
            <div className="explain"><strong>Simple explanation:</strong> <code>git remote add</code> links your local repository to its GitHub version. <code>git push</code> sends your saved commits online so others can view or collaborate.</div>

            <div className="controls">
              <button className="secondary" onClick={() => setSlide("slide2")}>← Back</button>
              <button onClick={() => setSlide("slide4")}>Next →</button>
            </div>
          </section>
        )}

        {/* Slide 4 */}
        {slide === "slide4" && (
          <section className="card">
            <h2>⚙️ What are GitHub Actions?</h2>
            <p>GitHub Actions is an automation system built directly into GitHub. It allows you to run tasks automatically whenever something happens in your repository, such as when someone pushes code, opens a pull request, or creates a release. This is known as <strong>CI/CD</strong> (Continuous Integration / Continuous Deployment).</p>

            <h3>Why GitHub Actions Matters</h3>
            <p>Instead of doing repetitive tasks manually—like installing packages, running tests, linting code, or deploying your website—GitHub Actions runs them automatically. This ensures your project stays healthy and errors are caught early.</p>

            <h3>Key Terms</h3>
            <ul>
              <li><strong>Workflow:</strong> A file that tells GitHub what to automate. Written in YAML.</li>
              <li><strong>Trigger (event):</strong> Something that starts a workflow (push, PR, issue creation).</li>
              <li><strong>Job:</strong> A group of steps that run in a virtual environment.</li>
              <li><strong>Runner:</strong> A machine provided by GitHub where your automation runs (like Ubuntu or Windows).</li>
              <li><strong>Step:</strong> A single instruction inside a job, like “install dependencies” or “run tests”.</li>
              <li><strong>Dependencies:</strong> Extra code your project needs to work, installed using <code>npm install</code>.</li>
              <li><strong>Package Manager:</strong> A tool (like npm or yarn) used to install/update dependencies.</li>
            </ul>

            <h3>Example workflow (YAML)</h3>
            <pre>{`name: CI\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - run: npm install\n      - run: npm test`}</pre>

            <div className="explain"><strong>Simple explanation:</strong> This workflow runs every time code is pushed. It downloads the code, installs the necessary dependencies, and runs tests to ensure nothing breaks.</div>

            <div className="controls">
              <button className="secondary" onClick={() => setSlide("slide3")}>← Back</button>
              <button onClick={() => setSlide("slide5")}>Next →</button>
            </div>
          </section>
        )}

        {/* Slide 5 */}
        {slide === "slide5" && (
          <section className="card">
            <h2>⚡ What is Vite?</h2>
            <p>Vite is a modern frontend build tool designed to make development extremely fast. It provides a lightning‑quick dev server, instant updates when you save your files, and optimized production builds.</p>

            <h3>Why Vite Is Game‑Changing</h3>
            <p>Traditional bundlers rebuild your entire project every time you make a change, which slows things down. Vite uses a new approach powered by <strong>ES Modules</strong>, which lets the browser handle module loading natively—making updates nearly instant.</p>

            <h3>Key Terms</h3>
            <ul>
              <li><strong>ES Modules (ESM):</strong> A system that lets JavaScript import and export code cleanly between files.</li>
              <li><strong>Bundling:</strong> Combining your files and code into an optimized package for the browser.</li>
              <li><strong>Libraries:</strong> Pre-written code packages that make building features easier (like React or Vue).</li>
              <li><strong>Dependencies:</strong> Extra modules your Vite project needs to work properly.</li>
              <li><strong>Hot Module Reloading (HMR):</strong> A feature that updates your website instantly when you change code—without refreshing the page.</li>
            </ul>

            <h3>Example: Creating a Vite project</h3>
            <pre>{`npm create vite@latest my-app\ncd my-app\nnpm install\nnpm run dev`}</pre>
            <div className="explain"><strong>Simple explanation:</strong> The first command creates a new Vite project. <code>npm install</code> downloads its dependencies. <code>npm run dev</code> starts a fast development server that updates instantly whenever you edit your code.</div>

            <div className="controls">
              <button className="secondary" onClick={() => setSlide("slide4")}>← Back</button>
              <button onClick={() => setSlide("slide6")}>Next →</button>
            </div>
          </section>
        )}

        {/* Slide 6 */}
        {slide === "slide6" && (
          <section className="card">
            <h2>Ready for a Quiz?</h2>
            <p>Let's check what you've learned so far — multiple choice questions.</p>
            <div className="controls">
              <button className="secondary" onClick={() => setSlide("slide5")}>← Back</button>
              <button onClick={() => setSlide("slide7")}>Go to Quiz →</button>
            </div>
          </section>
        )}

        {/* Slide 7: Quiz */}
        {slide === "slide7" && (
          <section className="card">
            <h2>📝 Quiz — Multiple Choice</h2>

            <div id="quizArea">
              {quiz.map((item, i) => (
                <div key={i} className="card" style={{ marginBottom: '8px' }}>
                  <p><strong>{i + 1}. {item.q}</strong></p>

                  {item.opts.map((opt, idx) => {
                    const selected = answers[i] === idx;
                    const isCorrect = graded && item.a === idx;
                    const isSelectedWrong = graded && answers[i] === idx && item.a !== idx;
                    return (
                      <label key={idx} className="quiz-option" style={{ color: isCorrect ? 'green' : isSelectedWrong ? '#b00' : undefined, fontWeight: isCorrect ? 'bold' : undefined }}>
                        <input type="radio" name={`q${i}`} checked={selected || false} onChange={() => selectAnswer(i, idx)} /> {opt}
                      </label>
                    );
                  })}

                  {graded && (
                    <div className="explain">
                      {answers[i] === item.a ? <span className="correct">Correct!</span> : <span className="incorrect">Incorrect.</span>}
                      <br />
                      {explanations[i]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {graded && (
              <p style={{ fontWeight: 'bold' }}>Your score: {score} / {quiz.length}</p>
            )}

            <div className="controls">
              <button className="secondary" onClick={() => setSlide("slide6")}>← Back</button>
              <button onClick={gradeQuiz}>Submit Answers</button>
              <button onClick={resetQuiz} className="secondary">Reset</button>
              {graded && <button onClick={() => setSlide("slide8")}>Next →</button>}
            </div>

          </section>
        )}

        {/* Slide 8 */}
        {slide === "slide8" && (
          <section className="card">
            <h2>🎉 Course Complete!</h2>
            <p>Great job! You’ve completed the entire Web Dev Toolchain 101 course.</p>
            <p>You learned about Git, GitHub, GitHub Actions, Vite, and modern development workflows.</p>
            <div className="controls">
              <button onClick={() => setSlide("slide1")}>Restart Course</button>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
