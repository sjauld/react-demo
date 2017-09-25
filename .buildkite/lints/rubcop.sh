#!/bin/bash

set -euo pipefail

echo ":rubocop: linting :middle_finger:"

bundle exec rubocop

echo "Looks good!"
