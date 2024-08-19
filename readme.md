# node-reporter-minimal

## Screenshot

![](/docs/shot.png)

## About

A simple test reporter for `node:test` (Node.js's test runner). The reporter
will prioritize logging errors and hides everything else while staying relevant.

You get

- Per **root** test execution time
- Nested test errors and nesting path
- A decently colorised output

> [!TIP]
>
> `reporter-minimal` is a lot more effective for running in CI systems where the
> passing tests don't mean much and the failed ones are what need to be
> re-validated. This saves you from missed log data when there's a limit to the
> size of the log on certain CI systems

## Installation

```sh
npm add -D reporter-minimal
```

## Usage

```sh
node --test-reporter=reporter-minimal --test-reporter-destination=stdout
```

## Why should we use this ?

1. You have a large project where the reduced output could help with the size of
   the logs in a CI environment and you don't use Github (Check out
   [nearform/node-test-github-reporter](https://github.com/nearform/node-test-github-reporter))
2. You need a reporter that only logs errors and nothing else.

## License

[MIT](/LICENSE)
