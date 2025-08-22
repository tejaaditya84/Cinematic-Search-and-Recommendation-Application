#🎬 Cinematic Search and Recommendation Application
📝 Project Overview
This is a dynamic, front-end web application that allows users to search for movies and TV shows using multiple external APIs. The application provides a clean and intuitive user interface for real-time search results, with a fallback mechanism to ensure a smooth user experience even if one API fails.

✨ Features
Real-time Search: 🔍 Instantly search for cinematic content by title.

API Fallback: 🔄 The application intelligently falls back to alternative APIs (TMDb, TVMaze) if the primary OMDb API request fails, ensuring reliable results.

Search Filtering: 📅 Users can filter search results by a specific year to refine their search.

Responsive Design: 📱💻 The interface is built to be fully responsive, providing a seamless experience on both desktop and mobile devices.

Clean UI: 🎨 A modern and visually appealing design with a dark theme and subtle animations.

🛠️ Technologies Used
HTML5: Provides the semantic structure of the application.

CSS3: Used for styling, including modern features like Flexbox, Grid, and animations for a polished look.

JavaScript (Vanilla JS): Powers the core functionality, including DOM manipulation, event handling, and asynchronous API calls.

OMDB API: Primary API for fetching movie and series data.

TMDb API: Used as a fallback for movie search results.

TVMaze API: Used as a fallback for TV series search results.

🚀 Getting Started
To run this project locally, follow these simple steps:

Clone the repository:

git clone https://github.com/your-username/cinematic-search-app.git

Navigate to the project directory:

cd cinematic-search-app

Open the index.html file:
Simply open the index.html file in your preferred web browser (e.g., Chrome, Firefox, Safari). There's no need for a local server.

🔑 API Configuration
The application is configured to use public test API keys for demonstration purposes.

In script.js, the API_CONFIG object holds the URL and key for each service.

OMDb key: 5f98b89d

The Movie Database (TMDb) key: 8a9121949f5a9ddaf7e272d9a4e5b6b0

For your own use or a production-level application, you should get your own API keys from these services and replace the placeholder keys in the script.js file.

📂 Project Structure
.
├── index.html            # Main HTML file for the application
├── script.js             # Core JavaScript logic and API integration
└── styles.css            # Stylesheet for the user interface

📈 Challenges and Learnings
API Fallback Logic: 🚧 One of the main challenges was implementing a robust fallback system to handle potential API failures gracefully. This was achieved by creating a chain of API calls, ensuring the user always gets a result if available.

Data Consistency: 🧹 Each API returns data in a different format. I learned to "transform" the data from each source into a consistent object format, which simplified the display logic and made the application more scalable.

Responsive UI: 📐 Designing a fluid grid layout that looks good on both large monitors and small mobile screens required careful use of CSS Grid and media queries.

➡️ Future Enhancements
User Favorites: ❤️ Add functionality for users to save their favorite movies or shows.

Detailed View: ℹ️ Implement a new page or modal to show a detailed view of a selected movie, including plot, cast, and ratings.

Improved Recommendations: 🤖 Develop a more advanced recommendation engine based on user search history or similar genres.

Deployment Automation: ⚙️ Automate the deployment process using a continuous integration/continuous deployment (CI/CD) pipeline.

