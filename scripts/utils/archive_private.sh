#!/usr/bin/env bash

# Script used to backup all the private files excluded from Git

DATE=`date "+%Y-%m-%d_%H-%M-%S"`
tar cf private_${DATE}.tar.gz \
    data \
    app/parsers \
    test/parsers \
    scripts/main-test \
    app/config/constants/constants-private.js \
    app/config/mappings/parser-mapping-private.js
