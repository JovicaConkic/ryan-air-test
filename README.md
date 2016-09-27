# ryan-air-test
> Test project for RyanAir

## Prerequisites

In order to run development environment and self-hosted application, you'll need to install the latest version of [nodeJS](https://nodejs.org/en/download/) and for Windows users [Ruby](http://rubyinstaller.org/downloads/). 
Once when you install the latest version of nodeJS, or you already have it, you'll need to install globally following packages using 
node package manager (npm):
* grunt
* grunt-cli
* bower

To do so, you can just simply run npm command
```
npm install -g grunt grunt-cli bower
```

Once when you install Ruby or you already have it, you'll need to install following ruby gems (required for Grunt sass task):
* sass
* compass

To do so, you can just simply run command
```
gem install sass compass
```

This application is built by using [generator-nswebangular](https://github.com/JovicaConkic/generator-nswebangular): Yeoman generator for AngularJS applications with GruntJS, which is the one of my development products(projects). 

Once you are done with installation of all prerequisites, you'll be good to start application.

To start application just run following commands in your console (terminal):

```
npm install
```

This command will install all required dependencies from package.json file for local development environment.

Then install bower dependencies:

```
bower install
```

This command will install all required application dependencies from bower.json file.

Bower has defined post script which will run grunt default task after install bower dependencies and your local server which is using port 9000 will open and start on your default browser.


## Gruntfile.js & Grunt tasks

Gruntfile.js contains following main grunt tasks:

* [grunt](#grunt) or [grunt default](#grunt)
* [grunt build](#grunt-build)
* [grunt test](#grunt-test)

### Grunt
Grunt default task runner.

Example:
```bash
grunt
```
or
```bash
grunt default
```


### Grunt Build
Grunt build task runner. Running tests, applying new build version, copy, minify application files into dist directory, adding file revisions and perform content optimization for distribution.

After grunt build task is finished, you can find dist folder in the root which holds optimized and minified content ready for deployment.

Example:
```bash
grunt build
```

Grunt build task can take a option `--semver`. By default this option is included and its value is `--semver=patch`. This option will tell bump grunt task which version application will have. This option could have following values: patch, minor, major, prepatch, preminor, premajor, prerelease  etc. More about these values you can check out [here](https://github.com/vojtajina/grunt-bump).

Build with minor updated version example:
```bash
grunt build --semver=minor
```

### Grunt Test
Grunt test task runner.

Example:
```bash
grunt test
```

After running this command, it can take some time while grunt task updating webdrivers (if you already don't have it installed and up to date) for selenium-protractor tests. 

## Testing

Grunt test task runs two types of testing:

* [Unit Tests](#unit-tests)
* [End-to-end Tests](#end-to-end-tests)

### Unit Tests

[Karma](http://karma-runner.github.io/) is JavaScript command line tool which is used to runs unit test by using [Jasmine](http://jasmine.github.io/1.3/introduction.html) test framework and [angular-mocks](https://docs.angularjs.org/api/ngMock). To use Jasmine with Karma, we use the [karma-jasmine](https://github.com/karma-runner/karma-jasmine) test runner. Browsers that are used for unit tests are: Chrome, Firefox or PhantomJS.

```
unit-tests/                     --> unit tests directory
  specs/                        --> scenarios directory to be run by Karma
    service.spec.js                --> unit test scenarios to be run by Karma
  karma.conf.js                 --> Karma config file
```

### End-to-end Tests

[Protractor](http://angular.github.io/protractor/) is an end-to-end test framework for AngularJS applications. Protractor is using web-drivers to start Java Selenium server and using [Jasmine](http://jasmine.github.io/1.3/introduction.html) test framework runs the test against application. Protractor can use Chrome or Firefox (or other) browsers to perform e2e tests which could be set in `protractor.conf.js` file.

```
e2e-tests/                      --> end-to-end tests directory
  specs/                        --> scenarios directory to be run by Protractor
    index.spec.js               --> end-to-end scenarios to be run by Protractor
  protractor.conf.js            --> Protractor config file
```

