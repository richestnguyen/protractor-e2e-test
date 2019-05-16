var jasmineReporters = require('jasmine-reporters');
var htmlReporter = require('protractor-html-reporter-2');
var fs = require('fs-extra');
var globals = require('protractor/built');
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: false,
    firefoxPath: null,
    allScriptsTimeout: 120000,
    getPageTimeout: 180000,
    maxSessions: 1,
    baseUrl: 'http://www.way2automation.com/angularjs-protractor/banking/',

    specs: ['./e2e/tests/*.spec.ts'],
    suites: {
        smoke: ['e2e/tests/smoke/**/*.ts'],
        full: ['./e2e/tests/**/*.spec.ts']
    },

    capabilities: {
        browserName: 'firefox'
    },
    onPrepare: function() {
        require('ts-node').register({
            project: 'tsconfig.json'
        });

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'reports',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            docName: 'report.html',
            docTitle: 'Test Report'

        }).getJasmine2Reporter());

        browser.manage().window().maximize();
    },

    onComplete: function() {
    },

    framework: 'jasmine',
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 180000,
        isVerbose: true,
        realtimeFailure: true,
        includeStackTrace: true
    },
    SELENIUM_PROMISE_MANAGER: false
};
