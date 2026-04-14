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
    // Select all known membership badge variants.
    // Including new PascalCase classes found in yt-lockup-view-model.
    const badges = document.querySelectorAll(`
        .ytBadgeShapeMembership, 
        .yt-badge-shape--membership, 
        .badge-style-type-members-only, 
        .yt-badge-shape--commerce .yt-badge-shape__icon,
        .ytBadgeShapeCommerce .ytBadgeShapeIcon
    `);
    
    let hiddenCount = 0;

    badges.forEach(badge => {
        // Find the closest video component.
        const container = badge.closest(`
            ytd-video-renderer, 
            ytd-compact-video-renderer, 
            yt-lockup-view-model, 
            ytd-grid-video-renderer,
            ytd-rich-grid-media
        `) as HTMLElement | null;

        if (container) {
            // If the video is inside a grid slot (rich-item), hide the slot 
            // to prevent leaving empty gaps in the home/channel layout.
            const gridSlot = container.closest('ytd-rich-item-renderer') as HTMLElement | null;
            const target = gridSlot || container;

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