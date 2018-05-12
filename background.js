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

chrome.runtime.onMessage.addListener( function(request) {
    if (request.traceRequireTree) {
        setActiveState(true);
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    setActiveState(true);
    chrome.tabs.executeScript(tab.id, {code: 'window.location.reload();'});
    setTimeout(function() {
        chrome.tabs.executeScript(tab.id, {file: 'contentExtraction.js'}, function (data) {
            // console.log(data[0]);
        });
    }, 8000);
});

function setActiveState(isActive) {
    if (isActive && !chrome.webRequest.onBeforeRequest.hasListener(requireRedirect)) {
        chrome.webRequest.onBeforeRequest.addListener(
            requireRedirect,
            {
                urls: ["*://static.parastorage.com/services/third-party/requirejs/2.1.15/require.min.js"],
                types: ["script"]
            },
            ["blocking"]
        );
    } else {
        chrome.webRequest.onBeforeRequest.removeListener(requireRedirect)
    }
}

function requireRedirect() {
    setActiveState(false);
    return {redirectUrl: 'https://michabeeri.github.io/requirer/require.js'};
}

