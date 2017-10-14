#!/usr/bin/env node

const readline = require('readline');
const utils = require('./utils');
const output = require('./output'); // Small utility for conveniently writing to stdout by Mike Bostock

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// Initial start time to be measured against when the stream is closed
const duration = process.hrtime();

// Report issued on end
const totalReport = {
    throughputRate: 0,
    totalBytes: 0,
    timeElapsed: 0, // In seconds
    linesRead: 0
}

rl.on('line', function (line) {

    const lineTime = process.hrtime();
    const lineBuf = Buffer.from(line, 'utf8');

    // Report issued per line
    const lineReport = {
        bytes: 0,
        timeElapsed: 0
    }

    // Store the current total bytes to be referenced in subsequent lines
    totalReport.totalBytes += lineReport.bytes = lineBuf.byteLength;
    totalReport.linesRead++;

    // Measure the time since starting the timer
    lineReport.timeElapsed = utils.time.getSecondsFromHRTime(process.hrtime(lineTime));
    output(lineReport);

})

rl.on('close', function () {

    // Allow the user to skip the human readable output
    if (!utils.parseCLIArgs('--pure', process.argv)) {
        // Measure the totals
        totalReport.timeElapsed = utils.time.getSecondsFromHRTime(process.hrtime(duration));
        totalReport.throughputRate = `${totalReport.totalBytes / totalReport.timeElapsed} bytes/sec`;

        const humanReport = 
`

    The input took ${totalReport.timeElapsed} seconds to process
    at a rate of ${totalReport.throughputRate} bytes per second.

    There were ${totalReport.linesRead} lines
    at a total of ${totalReport.totalBytes} bytes.


`;
        process.stdout.write(humanReport);

    }
});