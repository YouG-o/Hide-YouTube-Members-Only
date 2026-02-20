# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.7] - 2026-02-20

### Fixed
- Improved detection of "Members Only" videos in the "related videos" section: now only hides `.yt-badge-shape--commerce` badges if they contain a `.yt-badge-shape__icon`, which is present on members-only badges but not on fundraiser/commerce badges. This avoids hiding fundraiser videos while still hiding members-only content in related lists.


## [1.3.6] - 2026-02-17

### Fixed
- Avoid hiding fundraiser/commerce videos: `.yt-badge-shape--commerce` handling is commented out in src/content/memberVideos/MemberVideos.ts to prevent false positives when detecting "members-only" videos in related/grid lists. Added TODO to implement a safer detection for members-only items in the related section.

## [1.3.5] - 2026-01-08

### Fix
- Hide parent ytd-rich-item-renderer on the homepage to prevent empty grid slots when members-only videos are hidden.

## [1.3.4] - 2025-11-24

### Fix
- Add support for new "Members only" badge selector

## [1.3.3] - 2025-10-21
- Changed extension name in Popup

## [1.3.2] - 2025-10-20
- New icon

## [1.3.1] - 2025-10-16

### Fix
- Fixed missing observer initialization after full page reload by manually calling `handleUrlChange()` in `setupUrlObserver`. This ensures all observers and features are correctly set up whether the user navigates via SPA or refreshes the browser.

## [1.3.0] - 2025-09-22

### Feat
- Added suggested videos support.

## [1.2.0] - 2025-08-02

### Changed
- Updated extension icon.

### Added
- Added a log in the script showing the total number of members-only videos hidden from API responses.
- Added a warning message in the welcome page and a refresh button instead of auto-reloading on install.

### Removed
- Removed automatic page reload on extension install.

## [1.1.0] - 2025-07-14

### Added
- Add request interception method to filter members-only videos before DOM rendering.

## [1.0.0] - 2025-07-14



---

[Unreleased]: https://github.com/YouG-o/Hide_YouTube_Members-Only/compare/v1.3.7...HEAD
[1.3.7]: https://github.com/YouG-o/Hide_YouTube_Members-Only/compare/v1.3.6...v1.3.7
[1.3.6]: https://github.com/YouG-o/Hide_YouTube_Members-Only/compare/v1.3.5...v1.3.6
[1.3.5]: https://github.com/YouG-o/Hide_YouTube_Members-Only/compare/v1.3.4...v1.3.5
[1.3.4]: https://github.com/YouG-o/Hide_YouTube_Members-Only/compare/v1.3.3...v1.3.4
[1.3.3]: https://github.com/YouG-o/Hide_YouTube_Members-Only/compare/v1.3.1...v1.3.3
[1.3.1]: https://github.com/YouG-o/Hide_YouTube_Members-Only/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/YouG-o/Hide_YouTube_Members-Only/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/YouG-o/Hide_YouTube_Members-Only/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/YouG-o/Hide_YouTube_Members-Only/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/YouG-o/Hide_YouTube_Members-Only/releases/tag/v1.0.0

