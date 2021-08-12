interface User {
  /** GitHub website url for the author's profile */
  html_url?: string;
  /** Author's username */
  login?: string;
  /** Author's profile picture */
  avatar_url?: string;
}

interface Commit {
  author?: {
    /** Author's real name (NOT username) */
    name?: string;
    email?: string;
    date?: string;
  };
  committer?: {
    /** Committer's real name (NOT username) */
    name?: string;
    email?: string;
    date?: string;
  };
  /** Commit message */
  message?: string;
  comment_count?: number;
}

/** Object holding the entire data of an individual file. */
export interface File {
  /** Number of line changes to the file. */
  changes?: number;
  /** Number of line additions to the file. */
  additions?: number;
  /** Number of line deletions to the file. */
  deletions?: number;
  /** The affected file's name. */
  filename?: string;
  /** GitHub website url for the specific file change. */
  blob_url?: string;
  /** Link leading to a page containing the raw text of the changed file. */
  raw_url?: string;
  /** Type of change to the file. */
  status?: string;
}

/** Object holding the entire data of an individual commit. */
export interface SingleCommit {
  /** GitHub API url for the specific commit */
  url?: string;
  /** GitHub website url for the specific commit */
  html_url?: string;
  /** The commit's unique id */
  sha?: string;
  /** Object containing important commit information */
  commit?: Commit;
  /** Detailed author information  */
  author?: User;
  /** Detailed committer information */
  committer?: User;
  /** Holds all the changed files from this commit. */
  files?: File[];
}

export type CommitArray = SingleCommit[];

/** Commit information deemed important to be visualized */
export interface CommitInfo {
  message?: string;
  sha?: string;
  author?: {
    realName?: string;
    userName?: string;
    avatar?: string;
    profile?: string;
  },
}

export interface SingleBranch {
  name?: string;
}

export type BranchList = SingleBranch[];

/** The fetched object from local server when fetching for the repo's branch data. */
export interface BranchData {
  defaultBranch: string;
  branchList: BranchList;
}

/** Object containing information of the parsed link. Used by parseLink function helper */
export type ParsedLink = {
  userName: string;
  repoName: string;
};

// Example data from official GitHub API web page
// [
//   {
//     url: "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
//     sha: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
//     node_id:
//       "MDY6Q29tbWl0NmRjYjA5YjViNTc4NzVmMzM0ZjYxYWViZWQ2OTVlMmU0MTkzZGI1ZQ==",
//     html_url:
//       "https://github.com/octocat/Hello-World/commit/6dcb09b5b57875f334f61aebed695e2e4193db5e",
//     comments_url:
//       "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e/comments",
//     commit: {
//       url: "https://api.github.com/repos/octocat/Hello-World/git/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
//       author: {
//         name: "Monalisa Octocat",
//         email: "support@github.com",
//         date: "2011-04-14T16:00:49Z",
//       },
//       committer: {
//         name: "Monalisa Octocat",
//         email: "support@github.com",
//         date: "2011-04-14T16:00:49Z",
//       },
//       message: "Fix all the bugs",
//       tree: {
//         url: "https://api.github.com/repos/octocat/Hello-World/tree/6dcb09b5b57875f334f61aebed695e2e4193db5e",
//         sha: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
//       },
//       comment_count: 0,
//       verification: {
//         verified: false,
//         reason: "unsigned",
//         signature: null,
//         payload: null,
//       },
//     },
//     author: {
//       login: "octocat",
//       id: 1,
//       node_id: "MDQ6VXNlcjE=",
//       avatar_url: "https://github.com/images/error/octocat_happy.gif",
//       gravatar_id: "",
//       url: "https://api.github.com/users/octocat",
//       html_url: "https://github.com/octocat",
//       followers_url: "https://api.github.com/users/octocat/followers",
//       following_url:
//         "https://api.github.com/users/octocat/following{/other_user}",
//       gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
//       starred_url:
//         "https://api.github.com/users/octocat/starred{/owner}{/repo}",
//       subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
//       organizations_url: "https://api.github.com/users/octocat/orgs",
//       repos_url: "https://api.github.com/users/octocat/repos",
//       events_url: "https://api.github.com/users/octocat/events{/privacy}",
//       received_events_url:
//         "https://api.github.com/users/octocat/received_events",
//       type: "User",
//       site_admin: false,
//     },
//     committer: {
//       login: "octocat",
//       id: 1,
//       node_id: "MDQ6VXNlcjE=",
//       avatar_url: "https://github.com/images/error/octocat_happy.gif",
//       gravatar_id: "",
//       url: "https://api.github.com/users/octocat",
//       html_url: "https://github.com/octocat",
//       followers_url: "https://api.github.com/users/octocat/followers",
//       following_url:
//         "https://api.github.com/users/octocat/following{/other_user}",
//       gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
//       starred_url:
//         "https://api.github.com/users/octocat/starred{/owner}{/repo}",
//       subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
//       organizations_url: "https://api.github.com/users/octocat/orgs",
//       repos_url: "https://api.github.com/users/octocat/repos",
//       events_url: "https://api.github.com/users/octocat/events{/privacy}",
//       received_events_url:
//         "https://api.github.com/users/octocat/received_events",
//       type: "User",
//       site_admin: false,
//     },
//     parents: [
//       {
//         url: "https://api.github.com/repos/octocat/Hello-World/commits/6dcb09b5b57875f334f61aebed695e2e4193db5e",
//         sha: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
//       },
//     ],
//   },
// ];
