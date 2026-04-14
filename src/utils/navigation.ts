/* 
 * Copyright (C) 2025-present YouGo (https://github.com/youg-o)
 * This program is licensed under the GNU Affero General Public License v3.0.
 * You may redistribute it and/or modify it under the terms of the license.
 * 
 * Attribution must be given to the original author.
 * This program is distributed without any warranty; see the license for details.
 */


/**
 * Checks if the current context is an iframe that should be ignored by the extension
 * (e.g. live chat, background auth pages, etc.).
 * Returns true if we are in an iframe AND it is not an embedded video player.
 */
function isIrrelevantIframe() {
    // If we are in the top window, we are relevant.
    if (window === window.top) {
        return false;
    }
}

export { isIrrelevantIframe };