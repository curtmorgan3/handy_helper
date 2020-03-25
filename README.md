# Handy Helper 

## [Kanban Board](https://github.com/curtmorgan3/handy_helper/projects/1)

All cards in 'To-Do' need to be claimed. If you're comfortable with a described task, feel free to create an issue (right click a task and click "convert to issue"), set yourself as an assignee on the card and move it into 'In Progress'. Each card should have its own feature branch. 

## Requirements
Ensure you have the latest version of Node on your local machine. I recommend using Node Version Manager to install and manage multiple Node versions: [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)

Also, you'll need [Node Package Manager](https://www.npmjs.com/get-npm)

To run the server locally, from the `server` directory, run `npm start`. A server should start on `127.0.0.1:3001`.

To run the client locally, from the `client` directory, run `npm start`. A server should start on `127.0.0.1:3000`.

To develop the server locally, you'll need a database called "handy_helper_db" running locally. Install [PostgreSQL](https://www.postgresqltutorial.com/install-postgresql/). Postgres will need to be running alongside the local server in order for Database calls to be made. The linked tutorial covers this pretty well. To view changes to the database, you can use the included `psql` command line tool, but I recommend something like [Postico](https://eggerapps.at/postico/) to make your life much easier. 

## Contributing

### Developing Locally
Clone this repo to your local machine

Before starting a new feature, run `git checkout master && git pull` to get the most up to date `master` branch.

On your local machine, create a local branch for the feature you're implementing. Branch names should follow the convention of your-initials/feature-to-be-implemented, such as `cm/updating-readme`. 

Make code changes to your local branch. 

To commit your changes locally, run `git add .`, then `git commit -m 'message describing commit'`.

To push a commit directly to an issue that is generated from a task item in the Kanban board, simply add `#issueNo` to your commit message. For example, when working on issue #8, add `#8` to your commit message.

Push your changes to the remote branch by running `git push --set-upstream origin cm/updating-readme`, replacing this branch name with your own. You only need to set the upstream the first push. After that, running `git push` will be fine. 

### Submitting a Pull Request

When the feature is complete and ready to be merged into the master branch, submit a Pull Request on GitHub. Navigate to https://github.com/curtmorgan3/handy_helper 

![button](https://github.com/curtmorgan3/handy_helper/blob/master/readme_images/pr_button.png)

You should see a prompt to submit a PR on the recently pushed remote branch. Click on 'Compare and Pull Request'

![screen](https://github.com/curtmorgan3/handy_helper/blob/master/readme_images/pr_screen.png)

Fill out some relevant details about the branch, including any parameters needed to test functionality, then click 'Create Pull Request'

All PRs will be reviewed by `curtmorgan3` before being merged. 

Once a PR has been approved, it will be merged into `master` and the remote feature branch will be deleted. 
