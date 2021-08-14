# GitCommits
Accepts a GitHub repository link and lists the commits of a specified branch.

Small full-stack React-Typescript project to familiarize myself with React Redux.

# Build Notes
Detailed changes and updates of every new build.

Trello board: https://trello.com/b/7pyaOYPG/gitcommits

## Build 1.2 (<i>14th of August, 2021</i>)
File Selection and Change Information Feature.

Commit visualizer layout changed
- The commit author's avatar will now be displayed on the top-left along with their GitHub username
- The commit message will be shown directly below the author's avatar and username
- An "expand" drop-down arrow will be displayed on the top-right of each Commit Visualizer container

User is able to press the "expand" drop-down arrow to show further information regarding that specific commit
- Changed files are listed on the left
- Selecting a file from the list will show the changed file lines on the right

Changes regarding states now accounts for various errors
- Previous states are now cleared when the user inputs a new valid GitHub repository link while Commit Visualizer containers have been expanded
- All expanded Commit Visualizer containers are now set to minimize when the user:
  1. Inputs a new valid GitHub repository link
  2. Switches to a different branch

### 1.2 Tasks to work on
- Include line highlights for the file content within Commit Visualizer containers depending on the type of modification (addition or deletion)
- Style the Commit Visualizer containers

## Build 1.1 (<i>12th of August, 2021</i>)
Branch Selection Feature.

User is able to switch between branches after inputting a valid GitHub repository link
- The latest 30 commits from the specified branch will be fetched

Commit messages are now organized into separate lines

Fixed issue where inputting an invalid GitHub repository link would crash

### 1.1 Tasks to work on
- Have yet to account for GitHub repository links already containing the desired branch to fetch commits from

## Build 1.0 (<i>10th of August, 2021</i>)
Minimum Viable Product.

User is able to input a GitHub repository link
- The input field will parse for a GitHub username and repository name
- Both the user and repo name will be validated by the local server
  - If successful, the local server will fetch from the GitHub API and render the latest <b>30</b> commits of that repository's default branch

### 1.0 Tasks to work on
- Have yet to include a visual cue if parsing or validation failed