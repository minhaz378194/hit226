# CalorieTracker

A modern, accessible, and user-friendly web application for tracking daily calorie intake. Built with vanilla HTML, CSS, and JavaScript, this application offers a clean interface and essential features for monitoring your nutritional goals.

## 🌟 Features

- **Daily Calorie Goal Setting**
  - Set and update your daily calorie target
  - Visual progress bar showing goal completion
  - Real-time progress updates

- **Meal Logging**
  - Quick food search with auto-suggestions
  - Built-in database of common foods
  - Custom food entry support
  - Instant calorie calculations

- **Progress Tracking**
  - 7-day history visualization
  - Interactive bar chart
  - Daily meal history
  - Easy meal deletion

- **Accessibility**
  - ARIA labels and roles
  - Keyboard navigation support
  - Screen reader compatibility
  - Focus management
  - Clear error messaging

- **Mobile-Friendly**
  - Responsive design
  - Touch-friendly interface
  - Optimized for all screen sizes

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/calorie-tracker.git
```

2. Navigate to the project directory:
```bash
cd calorie-tracker
```

3. Open `index.html` in your web browser

That's it! No build process or server setup required.

## 💻 Usage

1. **Setting Your Goal**
   - Enter your daily calorie goal in the top section
   - Click "Set Goal" to update

2. **Logging Meals**
   - Type a food name in the search box
   - Select from suggestions or enter custom food
   - Enter calories
   - Click "Add Meal"

3. **Tracking Progress**
   - View today's progress in the bar
   - Check your 7-day history in the graph
   - Review and manage today's meals in the list

4. **Managing Meals**
   - Delete individual meals with the delete button
   - All data is automatically saved locally

## 🔒 Data Storage

All data is stored locally in your browser using localStorage. No data is sent to any server, ensuring your privacy.

## 🎨 Customization

The application uses CSS custom properties (variables) for easy theming. Main colors and styles can be modified in the `styles.css` file:

```css
:root {
    --primary-color: #4CAF50;
    --secondary-color: #2196F3;
    --background-color: #f5f5f5;
    --text-color: #333;
    /* ... other variables */
}
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## ♿ Accessibility

This application follows WCAG 2.1 guidelines and includes:
- Proper heading hierarchy
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support
- High contrast colors
- Responsive text sizing

## 📱 Mobile Support

The application is fully responsive and includes:
- Touch-friendly buttons
- Optimized input fields
- Readable text at all sizes
- Proper spacing for touch targets
- Portrait and landscape support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Chart.js for data visualization
- USDA Food Database for nutrition information reference
- Modern web browsers for localStorage support 