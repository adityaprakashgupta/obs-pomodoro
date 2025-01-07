# OBS Pomodoro Overlay

Pomodoro overlay for OBS, built using Vite and React.

## Description

This project provides a customizable Pomodoro timer overlay for OBS (Open Broadcaster Software). The overlay can be used to manage work and break intervals during live streaming or recording.

## Features

- Customizable Pomodoro sessions
- Adjustable focus, short break, and long break durations
- Configurable number of total sessions and long break intervals
- Option to show/hide the pause button

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/adityaprakashgupta/obs-pomodoro.git
   cd obs-pomodoro
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the development server:
   ```sh
   npm run dev
   ```

4. Build the project for production:
   ```sh
   npm run build
   ```

5. Preview the production build:
   ```sh
   npm run preview
   ```

## Usage

To use the Pomodoro overlay in OBS, add a Browser source with the following URL and query parameters for customization:

```
http://localhost:4173/?focusTime=60&shortBreakTime=5&longBreakTime=15&totalSessions=10&longBreakAfter=4&showPauseButton=true&twitchChannel={{YourChannelName}}
```

### Query Parameters

- `focusTime`: Duration of the focus period in minutes (default: 25)
- `shortBreakTime`: Duration of the short break in minutes (default: 5)
- `longBreakTime`: Duration of the long break in minutes (default: 15)
- `totalSessions`: Total number of Pomodoro sessions (default: 4)
- `longBreakAfter`: Number of sessions after which a long break occurs (default: 4)
- `showPauseButton`: Whether to show the pause button (default: true)
- `twitchChannel`: If provided, the broadcaster can play/pause the timer by sending the `!timer` command in the chat.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

Feel free to customize this draft further according to your preferences.
