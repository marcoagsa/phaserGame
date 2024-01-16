# phaserGame

Welcome to the phaserGame game project! This project utilizes Ionic 7, Phaser 3 and Angular 17 with standalone components and incorporates the latest features from Angular 17. Additionally, it employs Capacitor iOS and Android version 5 for cross-platform functionality.

#### Feel free to explore, contribute, or provide feedback to enhance this project further!

#### Feel free to adjust the wording or details as needed for your project's specifics!

This is a Tic-Tac-Toe game, build with:

- Ionic framework V7
- Phaser 3
- Angular V17
- Capacitor android and ios V5
- typescript V5

This game can run in browser / android / ios

This project uses Ionic as app development platform and the Ionic CLI.
This project uses angular standalone components

# Game Video

https://github.com/marcoagsa/phaserGame/assets/14275804/198bf352-0b85-46ac-932d-b525010d8a78

# Development Setup 💻

### Prerequisites

- Install Node.js which includes Node Package Manager
- Android development: Install Android Studio
- iOS development: Install XCode

## Getting Started

**Clone this repository:**

> git clone https://github.com/marcoagsa/phaserGame.git

**Change to the root directory of the project:**

> cd phaserGame

**Install all dependencies:**

> npm i or yarn

**Prepare and launch the Android app:**

> npx ionic cap sync android
>
> npx ionic cap run android

**Prepare and launch the iOS app:**

> npx ionic cap sync ios
>
> npx ionic cap run ios

# TODO LIST

## [`Bugs`]

> - [x] The Game don't update more then level 3
> - [x] Fix update scale meter

## [`Feactures`]

> - [x] Add more background's images for the game
> - [x] Improve background changes
> - [x] Improve score panel to have a health bar using the monkey scale
> - [ ] Try to fix the reduce scale of the monkey on change levels [ use tweens ]
> - [ ] Add new object to give or remove life
> - [ ] Add new object to add more points
> - [ ] Create a class for all object that monkey can collider
> - [ ] Create a class for all colliders
> - [ ] Refactor main scene to improve the code
> - [ ] Start layout for the about page
> - [ ] Start layout for the scores page
