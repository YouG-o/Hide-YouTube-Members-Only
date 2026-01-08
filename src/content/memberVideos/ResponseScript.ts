/* 
 * Copyright (C) 2025-present YouGo (https://github.com/youg-o)
 * This program is licensed under the GNU Affero General Public License v3.0.
 * You may redistribute it and/or modify it under the terms of the license.
 * 
 * Attribution must be given to the original author.
 * This program is distributed without any warranty; see the license for details.
 */

import { memberVideosLog } from "../../utils/logger";

// List of YouTube endpoints to intercept
const fetchEndpoints = [
    '/youtubei/v1/search',
    '/youtubei/v1/browse',
];

// Counter for removed sponsorship videos in the current fetch response
let removedCount = 0;

// Helper function to detect sponsorship badge
function isSponsorshipVideo(videoRenderer: any): boolean {
    if (!videoRenderer || !Array.isArray(videoRenderer.badges)) return false;
    return videoRenderer.badges.some((badge: any) =>
        badge.metadataBadgeRenderer &&
        badge.metadataBadgeRenderer.icon &&
        badge.metadataBadgeRenderer.icon.iconType === 'SPONSORSHIP_STAR'
    );
}

// Helper function to get video title
function getVideoTitle(videoRenderer: any): string {
    if (videoRenderer && videoRenderer.title && videoRenderer.title.runs && videoRenderer.title.runs[0]) {
        return videoRenderer.title.runs[0].text;
    }
    return '[Unknown Title]';
}

// Recursive filter function: remove richItemRenderer containing sponsorship video
function filterSponsorshipVideos(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        const filtered: any[] = [];
        for (const item of obj) {
            let remove = false;

            // Check for richItemRenderer > content > videoRenderer
            if (
                item &&
                item.richItemRenderer &&
                item.richItemRenderer.content &&
                item.richItemRenderer.content.videoRenderer &&
                isSponsorshipVideo(item.richItemRenderer.content.videoRenderer)
            ) {
                const videoRenderer = item.richItemRenderer.content.videoRenderer;
                const title = getVideoTitle(videoRenderer);
                //memberVideosLog(`Removed members-only video: "%c${title}%c"`, 'color: white;', '');
                removedCount++;
                remove = true;
            }

            // Check for direct videoRenderer (for other layouts)
            if (!remove && item && item.videoRenderer && isSponsorshipVideo(item.videoRenderer)) {
                const videoRenderer = item.videoRenderer;
                const title = getVideoTitle(videoRenderer);
                //memberVideosLog(`Removed members-only video: "%c${title}%c"`, 'color: white;', '');
                removedCount++;
                remove = true;
            }

            if (!remove) {
                filtered.push(filterSponsorshipVideos(item));
            }
        }
        return filtered;
    }

    // Recursively process all properties
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj[key] = filterSponsorshipVideos(obj[key]);
        }
    }
    return obj;
}

// Hook fetch to intercept and filter sponsorship videos
const originalFetch = window.fetch;
window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    let url: string;
    if (typeof input === 'string') {
        url = input;
    } else if (input instanceof URL) {
        url = input.toString();
    } else if (input instanceof Request) {
        url = input.url;
    } else {
        url = String(input);
    }

    if (fetchEndpoints.some(endpoint => url.includes(endpoint))) {
        return originalFetch(input, init).then(response => {
            return response.clone().json().then(data => {
                // Reset counter for this response and run filter
                removedCount = 0;
                const filteredData = filterSponsorshipVideos(data);

                // Log total removed in this fetch response, like the DOM method does
                if (removedCount > 0) {
                    memberVideosLog(`Removed ${removedCount} members-only videos (Response-Interceptor method).`);
                }

                return new Response(JSON.stringify(filteredData), {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers
                });
            });
        });
    }
    return originalFetch(input, init);
};

memberVideosLog('Sponsorship video fetch interceptor installed');