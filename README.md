# Frontend Starter

### Requirements

| Prerequisite    | How to check | How to install
| --------------- | ------------ | ------------- |
| Node.js 4.2.x  | `node -v`    | [nodejs.org](http://nodejs.org/) |
| gulp >= 3.9.x  | `gulp -v`    | `npm install -g gulp` |
| Bower >= 1.7.x | `bower -v`   | `npm install -g bower` |

### Installation

1. Install [gulp](http://gulpjs.com) and [Bower](http://bower.io/) globally with `npm install -g gulp bower`
2. Navigate to the project directory, then run `npm install`
3. Run `bower install`

### Available npm/gulp commands

* `gulp` — Starts local server, browser sync, and compile assets when files change
* `gulp build` — Starts local server, browser sync, and compile assets when files change
* `gulp jshint` — Checks Javascript errors across various files
* `gulp build` — Compiles Sass, Minifies JS, Minifies Images, Build Pack

### How do I name my branch? ###

* Name your feature branch beginning with your initials (ex. ch-case-study)
* Lowercase only
* Dashes only
* No Underlines
* No Camel Case (branchName, BranchName)
* No Snake Case (branch_name)
* No Spaces

### How to create a pull request?

1. Create a branch using the guidelines mentioned above.
2. Commit and Push your code. (Make frequent commits. Don't commit broken features/code)
3. [Create a pull request](https://github.com/robdvr/frontend-starter/pulls) by selecting your branch on left and master on right. 
4. Click on "Create Pull Request"

### How do I install a bower package? ###

1. Find the desired bower package [bower.io](http://bower.io/search/)
2. Run `bower install [PACKAGE_NAME] --save`
3. Find the required CSS/JS files from **bower_components** folder
4. Include the required files in `assets.js`
5. Restart Server

### How does deployment work?

The app is deployed on [Heroku]. There are two environments set up there:
staging and production. They are hosted at two separate URLs:

* Staging: <https://usax-staging.herokuapp.com>
* Production: <https://usax-production.herokuapp.com>

Whenever you push master, the app will automatically be deployed to staging.
This is happening via a continuous integration service, [CircleCI], which is
also set up for the app.

Of course, sometimes you may need to deploy the app manually, so for that, read
the next section.

### How do I deploy the app?

The app is deployed on [Heroku]. In order to deploy the site, you need to
create an account first. Once you've created an account, run:

    heroku login

and enter your credentials.

Next, you need to ask to be added to the app itself. Post a message in Slack and
we'll get you squared away.

Now you can add remotes that will enable you to deploy to staging and
production:

    heroku git:remote -r staging -a usax-staging
    heroku git:remote -r production -a usax-production

Finally, depending on which environment you want to deploy, run one of these
commands:

    heroku push staging master
    heroku push production master

[Heroku]: http://heroku.com
[CircleCI]: http://circleci.com
