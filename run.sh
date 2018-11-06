#!/usr/bin/env bash
echo "module.exports = { url: '${TIX_WEB_API_URL}'};" > ./src/apiConfig.js
npm start
