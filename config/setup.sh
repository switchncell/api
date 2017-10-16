#!/bin/bash

dropdb switchncell_dev
createdb switchncell_dev
yarn migrate
yarn seeds

dropdb switchncell_test
createdb switchncell_test
yarn migrate-test
yarn seeds-test
