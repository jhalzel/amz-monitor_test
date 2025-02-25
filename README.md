<!-- eComAlarm-Amazon Dashboard-->

# Amazon SP-API Dashboard

## Overview

This project comprises a dashboard connected to Amazon's SP-API for seller accounts, providing real-time insights into sales data. The goal is to offer a convenient way for users, particularly sellers, to monitor their sales status and track sales patterns over time through visually informative graphs.

### Link to Site: https://ecom-alarm.netlify.app

## Features

- **Real-time Sales Data:** The dashboard is linked to your Amazon seller account, allowing you to view the current status of your sales at any given moment.

- **Data Visualization:** Visual representation of sales data over time through graphs and charts to facilitate a better understanding of sales patterns.

- **Threshold Notifications (Under Construction):** Work in progress feature that enables users to set sales thresholds and receive notifications when a predefined dollar amount is reached from a specific subset of sales.

## Project Structure

### Python Scripts

- **`script.py`:** Retrieves data from the Amazon SP-API. This script serves as the main data-fetching component.

- **`trial.py`:** A Flask application responsible for forwarding data between the frontend and backend. It calls the main function in `script.py`.

### React Frontend

- **`client/`:** Folder containing the React frontend files.
  
  - **`src/`:** React source files including components, styles, and utilities.

    - **`Chart.jsx`:** React component for the visual display of graph data.

    - **Other React files:** Add descriptions for other React files as necessary.

  - **`npm dependencies`:** Dependencies for the React project managed by npm. Install dependencies using `npm install`.

  - **`styles.css`:** CSS file for styling the React components.

### Cron Schedule

- **`actions.yaml`:** Defines a cron schedule to periodically execute the `script.py` function. This ensures that the data is regularly updated from Amazon, and Flask routing calls to the frontend are made to reflect the changes.

### Hosting

The application is hosted on Render to prevent it from spinning down every 15 minutes. The cron schedule serves a dual purpose: keeping the app running and updating the frontend data.

## Getting Started

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/amazon-sp-api-dashboard.git
    cd amazon-sp-api-dashboard
    ```

2. **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    cd client
    npm install
    ```

3. **Configure Secrets:**
    - Ensure that the necessary credentials and secrets are correctly set as environment variables or in a configuration file.

4. **Run the Application:**
    ```bash
    python trial.py
    ```

5. **Access the Dashboard:**
    Open your web browser and navigate to [http://localhost:5000](http://localhost:5000).

## Contributing

Contributions are not advised at this time. 

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to further customize this template according to your specific project structure and details.
