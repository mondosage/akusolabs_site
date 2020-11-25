/**
 * Script Name: simpleAppSynth
 *
 * 
 * Generated using  New Relic Synthetics Formatter for Katalon
 *
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 */

/** CONFIGURATIONS **/

// Theshold for duration of entire script - fails test if script lasts longer than X (in ms)
var ScriptTimeout = 180000;
// Script-wide timeout for all wait and waitAndFind functions (in ms)
var DefaultTimeout = 30000;
// Change to any User Agent you want to use.
// Leave as "default" or empty to use the Synthetics default.
var UserAgent = "default";

/** HELPER VARIABLES AND FUNCTIONS **/

const assert = require('assert'),
	By = $driver.By,
	browser = $browser.manage()
/** BEGINNING OF SCRIPT **/

console.log('Starting synthetics script: simpleAppSynth');
console.log('Default timeout is set to ' + (DefaultTimeout/1000) + ' seconds');

// Setting User Agent is not then-able, so we do this first (if defined and not default)
if (UserAgent && (0 !== UserAgent.trim().length) && (UserAgent != 'default')) {
  $browser.addHeader('User-Agent', UserAgent);
  console.log('Setting User-Agent to ' + UserAgent);
}

// Get browser capabilities and do nothing with it, so that we start with a then-able command
$browser.getCapabilities().then(function () { })
	.then(() => {
            logger.log(1, "http://34.221.176.0/");
            return $browser.get("http://34.221.176.0/");
        })
	.then(() => {
            logger.log(2, "clickElement link=Simple Demo App");
            return $browser.waitForAndFindElement(By.linkText("Simple Demo App"), DefaultTimeout)
                .then(function (el) {
                    el.click();
                })
        })
	.then(() => {
            logger.log(3, "clickElement link=Contact Us! »");
            return $browser.waitForAndFindElement(By.linkText("Contact Us! »"), DefaultTimeout)
                .then(function (el) {
                    el.click();
                })
        })
	.then(() => {
            logger.log(4, "clickElement id=name");
            return $browser.waitForAndFindElement(By.id("name"), DefaultTimeout)
                .then(function (el) {
                    el.click();
                })
        })
	.then(() => {
            logger.log(5, "type John Doe");
            return $browser.waitForAndFindElement(By.id("name"), DefaultTimeout)
                .then(function (el) {
                    el.clear();
                    el.sendKeys('John Doe');
                })
        })
	.then(() => {
            logger.log(6, "type jdoe@somewhere.com");
            return $browser.waitForAndFindElement(By.id("email"), DefaultTimeout)
                .then(function (el) {
                    el.clear();
                    el.sendKeys('jdoe@somewhere.com');
                })
        })
	.then(() => {
            logger.log(7, "type Hey There");
            return $browser.waitForAndFindElement(By.id("subject"), DefaultTimeout)
                .then(function (el) {
                    el.clear();
                    el.sendKeys('Hey There');
                })
        })
	.then(() => {
            logger.log(8, "type boo");
            return $browser.waitForAndFindElement(By.id("message"), DefaultTimeout)
                .then(function (el) {
                    el.clear();
                    el.sendKeys('boo');
                })
        })
	.then(() => {
            logger.log(9, "clickElement id=submit");
            return $browser.waitForAndFindElement(By.id("submit"), DefaultTimeout)
                .then(function (el) {
                    el.click();
                })
        })
	.then(() => {
            logger.log(10, "clickElement link=About");
            return $browser.waitForAndFindElement(By.linkText("About"), DefaultTimeout)
                .then(function (el) {
                    el.click();
                })
        })
	.then(() => {
            logger.log(11, "clickElement link=Simple Demo App");
            return $browser.waitForAndFindElement(By.linkText("Simple Demo App"), DefaultTimeout)
                .then(function (el) {
                    el.click();
                })
        })
	.then(function() {
		logger.end();
		console.log('Browser script execution SUCCEEDED.');
	}, function(err) {
		logger.end();
		console.log ('Browser script execution FAILED.');
		throw(err);
	});


//** Export Functions
const logger=(function (timeout=3000, mode='production') {

    var startTime = Date.now(),
        stepStartTime = Date.now(),
        prevMsg = '',
        prevStep = 0;


    if (typeof $util == 'undefined'  ){
        $util = {
            insights: {
                set: (msg) => {
                    console.log(`dryRun: sending to Insights using ${msg}`)
                }
            }
        }

    }

    function log(thisStep, thisMsg) {

        if (thisStep > prevStep && prevStep != 0) {
            end()
        }

        stepStartTime = Date.now() - startTime;

        if (mode != "production") {
            stepStartTime = 0

        }

        console.log(`Step ${thisStep}: ${thisMsg} STARTED at ${stepStartTime}ms.`);

        prevMsg = thisMsg;
        prevStep = thisStep;

    }

    function end() {
        var totalTimeElapsed = Date.now() - startTime;
        var prevStepTimeElapsed = totalTimeElapsed - stepStartTime;

        if (mode != 'production') {
            prevStepTimeElapsed = 0
            totalTimeElapsed = 0
        }

        console.log(`Step ${prevStep}: ${prevMsg} FINISHED. It took ${prevStepTimeElapsed}ms to complete.`);

        $util.insights.set(`Step ${prevStep}: ${prevMsg}`, prevStepTimeElapsed);
        if (timeout > 0 && totalTimeElapsed > timeout) {
            throw new Error('Script timed out. ' + totalTimeElapsed + 'ms is longer than script timeout threshold of ' + timeout + 'ms.');
        }
    }

    return {
        log,
        end
    }
})(ScriptTimeout)
