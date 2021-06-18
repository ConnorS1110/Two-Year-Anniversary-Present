## [1.8] - 06-18-21

### Added

-   Surprise at the very end of the game

### Changed

-   Adjusted default music volume so it's not as loud
-   Adjusted sizing of UI elements to be more properly aligned with the game board

## [1.7.1] - 06-18-2021

### Fixed

-   Added sound effect that was not properly implemented in v1.7

## [1.7] - 06-18-2021

### Added

-   Added sound effects
-   Added 'Launch Game' button with transition to game screen (to allow for audio to auto-play)
-   Audio sliders for music and sound effects

### Changed

-   Further adjusted sizings of pop-up UI
-   Smoothed edges of game board
-   Forced font colors to white instead of leaving the black default

### Fixed

-   Fixed issue causing golden-taco spawner to spawn at incorrect times
-   Fixed issue causing half-speed power-up to not pause when answering a question
-   Fixed issue causing window to incorrectly scale
-   Fixed issue causing the game to freeze when interacting with golden-taco spawner power-up
-   Fixed issues with position of pop-up UI being not-centered
-   Fixed issue causing incorrect number of pieces to be removed when acquiring -4 length power-up

## [1.6.2] - 06-12-2021

### Fixed

-   Fixed issue causing the character to move automatically after choosing a difficulty when choosing to play again
-   Fixed issue causing x, y coordinates (but not the drawing) of the head of the snake to be one unit ahead of where it was supposed to be after touching a power-up

## [1.6.1] - 06-11-2021

### Added

-   Implemented true/false questions

### Changed

-   Changed logic on game over to leave a black screen when pushing no on play again UI to prevent a harsh white light on non-dark mode browser configurations
-   Updated welcome instructions to explain how to move
-   Further updated pop-up sizings

### Fixed

-   Fixed spawn logic for power-ups that made an unequal chance for all types of power-ups
-   Fixed issue allowing you to move on the welcome screen

## [1.6] - 06-11-2021

### Added

-   Implemented 4-choice and 3-choice questions

### Changed

-   Updated sizings of pop-up UI
-   Split functions for pop-up UI into a separate file to improve code readability

### Fixed

-   Fixed logic for -4 length power-up that was also removing the head if your length was less than 4
-   Fixed issue causing incorrect events to stay attached to buttons after they were needed

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
