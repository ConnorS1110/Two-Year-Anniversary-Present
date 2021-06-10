## [1.5] - 06-10-2021

### Added

-   Added functionality to the pop-up UI to let you restart the game when you die

### Changed

-   Force the board to occupy the entire width or height of the viewport (whichever fills up first)

### Fixed

-   Updated functionality of the pop-up UI that was incorrectly executing the wrong functions when clicking a button

## [1.4] - 06-09-2021

### Added

-   Created pop-up UI that explains the game and lets you choose a difficulty mode
-   Changed favicon from default

### Fixed

-   Updated logic for power-ups to prevent issue causing half-speed to keep moving when eating a taco

## [1.3.1] - 06-08-2021

### Changed

-   Changed color for the number of tacos needed to level up to improve visibility

### Fixed

-   Fixed a bug that was causing the incorrect score needed to level up
-   Fixed a bug that caused power-up images to not properly despawn from the UI

## [1.3] - 06-08-2021

### Added

-   Added image sprites for all game components
-   Added UI to show you which power-up the player touched
-   Added UI to show what speed level the player is on
-   Added functionality that makes snake parts rotate with direction

### Changed

-   Updated board colors to help with better visibility
-   Updated font to make numbers appear level
-   Update score UI to improve readability
-   Hidden unused UI

### Fixed

-   Fixed issue causing parts to not properly rotate with direction

## [1.2] - 06-05-2021

### Added

-   Added bonus points, -4 length, and golden tacos power-ups
-   Added countdown timer that displays when interacting with half-speed power-up

### Changed

-   Changed logic for key presses to add 3 key presses to a queue rather than executing the last pushed key in a draw cycle
-   Reworked spawn logic for tacos and power-ups to prevent them from spawning inside each other (i.e. a half-speed spawning on top of a -4 length)
-   Separated styles into a separate file to improve readability

### Fixed

-   Fixed issue causing tab to freeze when inputting multiple key presses in one draw cycle, causing the game to think the snake self collides
-   Fixed issue causing tab freeze when touching tacos or power-ups

## [1.1] - 06-01-2021

### Added

-   New UI elements to show score and score until speed increase
-   Added power-up that cuts the speed of the game in half for 15 seconds
-   Added logic for collisions with walls and snake body (may be source of freezing issue)

### Fixed

-   Fixed issue which allowed tacos and power-ups to spawn on the snake's body
-   Fixed an issue that wasn't causing the game to speed-up after acquiring the required number of tacos

## [1.0] - 05-31-2021

### Added

-   Implemented most of the basic snake game logic
-   Designed the board
