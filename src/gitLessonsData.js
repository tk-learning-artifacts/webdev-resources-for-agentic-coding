export const gitLessonPages = [
  { label: "Overview", slide: "gitOverview", target: "git-overview" },
  { label: "Your first repository", slide: "gitFirstRepo", target: "git-first-repo" },
  { label: "Publish to GitHub", slide: "gitPublish", target: "git-publish" },
  { label: "Clone and sync", slide: "gitSync", target: "git-sync" },
  { label: "Branches and merging", slide: "gitBranches", target: "git-branches" },
  { label: "Pull requests", slide: "gitPullRequests", target: "git-pull-requests" },
  { label: "Fix mistakes", slide: "gitRecovery", target: "git-recovery" },
  { label: "GitHub Desktop", slide: "gitDesktop", target: "git-desktop" },
  { label: "GitHub Actions", slide: "gitActions", target: "git-actions" },
  { label: "Command reference", slide: "gitReference", target: "git-reference" },
];

export const gitLessonTitles = Object.fromEntries(
  gitLessonPages.map((page) => [page.slide, `Git & GitHub · ${page.label}`]),
);
