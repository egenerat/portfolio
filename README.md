# portfolio

## Output
One of the objectives is to identify securities that are highly correlated together.
![Example of output](correlations/picture.png "Example of output")

[![Build Status](https://travis-ci.org/egenerat/portfolio.svg?branch=master)](https://travis-ci.org/egenerat/portfolio)


## Local build and run
Install
```
npm install
```

Run tests
```
# Run all the tests
npm test
# Run one test
npm test -- test/test-financials.js
```

Parser
```
node parser
```

NODE_ENV=production node parser
or
export NODE_ENV=production

Analyzer

```
node analyzer
```




Requirements:
- Node.js 8.9.1
