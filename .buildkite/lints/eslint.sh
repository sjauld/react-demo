#!/bin/bash

set -euo pipefail

echo ":eslint: linting :middle_finger:"

./node_modules/.bin/eslint $(pwd)/client/**/*

echo "Looks good!"
