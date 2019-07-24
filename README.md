# README

Sample project to experiment with and demonstrate testing techniques for Electron/React apps that manipulate the file system.
This repo is used by the Clear My Record team at Code for America to support their development of Electron apps.

## Install

First, clone the repo via git:

```bash
$ git clone git@github.com:codeforamerica/electron_react_jest_mocks.git
```

And then install the dependencies with yarn.

```bash
$ cd electron_react_jest_mocks
$ yarn
```

## Starting Development

Start the app in the `dev` environment.

```bash
$ yarn dev
```

## Testing

To run the unit tests:

```bash
$ yarn test
```

To run all tests including the linter and the Flow type-checker:

```bash
$ yarn test-all
```

To update the test snapshots when you have made intentional changes to the UI:

```bash
$ yarn test -u
```

No end-to-end tests included yet.
