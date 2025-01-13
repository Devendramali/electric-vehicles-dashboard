# Electric Vehicles Dashboard

This is a React-based web application designed to visualize and interact with electric vehicle Population data. The application provides insights into various models, manufacturers, and types of electric vehicles, making it easier to explore the growing EV ecosystem.

---

## Features

### 1. **Vehicles Dashboard**
   - Select a vehicle make from a dropdown to view all available models.
   - View additional details, such as electric range and model year, in a table format.
   - Automatically highlight the best model for a selected year based on electric range.
   - Default data for the year 2024 is displayed.

### 2. **Categories Dashboard**
   - Group and display models by their `Electric Vehicle Type`.
   - Ensure no duplicate models appear under the same category.

### 3. **Dynamic Filtering**
   - Filter data dynamically by `Make`, `Model Year`, and `Electric Vehicle Type`.
   - Aggregated data, such as average electric range by year, is calculated and displayed.

### 4. **Data Integration**
   - Fetch electric vehicle data from a hosted CSV file.
   - Parse and process CSV data for seamless integration.

---

## Setup and Installation

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or later)
- npm (Node Package Manager)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Devendramali/electric-vehicles-dashboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd electric-vehicles-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Data Source
The application fetches data from a CSV file hosted online. The data includes details like:
- `Make`
- `Model`
- `Electric Range`
- `Model Year`
- `City`
- `County`

---

## Key Technologies
- **Frontend**: React, React Router, Vite
- **Styling**: CSS Modules
- **Data Fetching**: Fetch API
- **Graph and Pie-Chart**: react-minimal-pie-chart, recharts

---

## Future Enhancements
- Add chart visualizations for aggregated data.
- Implement user authentication.
- Enhance styling and responsiveness for mobile devices.

---



Thank you! 😊

