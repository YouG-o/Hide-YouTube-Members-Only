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
        // only when the commerce badge contains an icon. Fundraiser badges
        // usually contain only text (no `.yt-badge-shape__icon`), so this shoud be
        // language-independent and avoids hiding fundraisers.
        const relatedMembersBadgeIcon = item.querySelector('.yt-badge-shape--commerce .yt-badge-shape__icon');
        if (relatedMembersBadgeIcon) {
            shouldHide = true;
        }

        if (shouldHide) {
            // Determine the best element to hide to avoid leaving empty slots in grids.
            // Keep existing behavior, but handle home rich-grid case where yt-lockup-view-model
            // is nested inside ytd-rich-item-renderer which reserves layout space.
            let target: HTMLElement;

            if (item.tagName.toLowerCase() === 'yt-lockup-view-model') {
                const richItemRenderer = item.closest('ytd-rich-item-renderer') as HTMLElement | null;
                target = richItemRenderer ?? (item as HTMLElement);
            } else {
                // For grid videos, hide the parent grid item to avoid breaking layout
                const parentItem = item.closest('ytd-rich-item-renderer');
                target = parentItem ? (parentItem as HTMLElement) : (item as HTMLElement);
            }

            if (target.style.display !== 'none') {
                target.style.display = 'none';
                hiddenCount++;
            }
        }
    });

    if (hiddenCount > 0) {
        memberVideosLog(`Hidden ${hiddenCount} members-only videos (DOM Method).`);
    }
}