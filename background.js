// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log('The color is green.');
//   });
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: '*'},
//       })],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });

var localRequire = 'https://localhost:3000/playground/require.js';
chrome.webRequest.onBeforeRequest.addListener(
    function() {
        return {redirectUrl: localRequire};
    },
    {
        urls: [
            "*://static.parastorage.com/services/third-party/requirejs/2.1.15/require.min.js"
        ],
        types: ["script"]
    },
    ["blocking"]
);
