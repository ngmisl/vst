# Visual Sensitivity Test (VST)

## Description

This web application provides a Visual Sensitivity Test (VST) to measure visual processing speed and assess cognitive function. It includes both simple and complex trials, offering insights into potential cognitive health risks.

## Features

- Simple VST with 10 trials
- Complex VST with 10 trials
- Automatic score calculation
- Personalized recommendations based on test results
- Progressive Web App (PWA) functionality for offline use

## Installation

1. Clone this repository
2. Ensure you have a web server that supports HTTPS
3. Place all files in your web server directory

## Usage

1. Open the application in a web browser
2. Click "Start Test" to begin the Simple VST
3. Press the spacebar when you see a triangle appear
4. After completing the Simple VST, start the Complex VST
5. View your results and recommendations

## Files

- `index.html`: Main HTML structure
- `style.css`: Styling for the application
- `script.js`: Core functionality and test logic
- `sw.js`: Service Worker for offline capabilities
- `manifest.json`: PWA manifest file
- `icon-192x192.png`: App icon (192x192)
- `icon-512x512.png`: App icon (512x512)

## Technical Details

- The VST uses logarithmic scoring
- Simple VST cutoff: 6.48
- Complex VST cutoff: 7.72

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

[Add your chosen license here]

## Contact

[Your contact information]
