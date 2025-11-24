/* 
 * Copyright (C) 2025-present YouGo (https://github.com/youg-o)
 * This program is licensed under the GNU Affero General Public License v3.0.
 * You may redistribute it and/or modify it under the terms of the license.
 * 
 * Attribution must be given to the original author.
 * This program is distributed without any warranty; see the license for details.
 */

import { memberVideosLog, memberVideosErrorLog } from "../../utils/logger";


export function hideMembersOnlyVideos() {
    // Select all video grid items and recommended videos
    const videoItems = document.querySelectorAll('ytd-rich-grid-media, ytd-video-renderer, yt-lockup-view-model');
    let hiddenCount = 0;

    videoItems.forEach(item => {
        let shouldHide = false;

        // "Members only" badge for most videos (new format)
        const oldMembersBadge = item.querySelector('.yt-badge-shape--membership');
        if (oldMembersBadge) {
            shouldHide = true;
        }

        // "Members only" for most videos (old format)
        const membersBadge = item.querySelector('.badge-style-type-members-only');
        if (membersBadge) {
            shouldHide = true;
        }

        // "Members only" for related videos
        const relatedMembersBadge = item.querySelector('.yt-badge-shape--commerce');
        if (relatedMembersBadge) {
            shouldHide = true;
        }

        if (shouldHide) {
            // For related videos (yt-lockup-view-model), hide the element directly
            // For grid videos, hide the parent grid item to avoid breaking layout
            let target: HTMLElement;
            if (item.tagName.toLowerCase() === 'yt-lockup-view-model') {
                target = item as HTMLElement;
            } else {
                const parentItem = item.closest('ytd-rich-item-renderer');
                target = parentItem ? parentItem as HTMLElement : item as HTMLElement;
            }
            
            if (target.style.display !== 'none') {
                target.style.display = 'none';
                hiddenCount++;
            }
        }
    });

    if (hiddenCount > 0) {
        memberVideosLog(`Hidden ${hiddenCount} members-only videos from DOM.`);
    }
}