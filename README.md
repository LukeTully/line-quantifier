# Line Quantifier
A small cli utility that accepts input of any newline delimited text and measure the following properties of each line.

- Time taken to measure the line
- Total size in bytes of the line

This utility also measures the totals of the following properties

- Time taken to process all lines
- Total size in bytes of all lines
- Throughput rate over all lines
- Total number of lines processed

## Installation
Clone the repo and run the following command
```
npm install -g
```
This will install the app globally which can be run under the name `lineq`

## Usage
An example of it's usage would be to measure the output of tail
```
tail package.json | lineq
```
You can use the `--pure` argument to skip the human readable output. This could be useful for outputting the measurements of each line and redirecting it to a file for further processing.
```
tail package.json | lineq --pure > tailoutput.ndjson
```
