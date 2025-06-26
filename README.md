# Frontend Scroll Task

## Overview

This project implements the frontend developer task requiring a dynamically generated list of elements that appear as the user scrolls. Each element is rendered with a 500ms delay between each, following this scroll flow:

- Elements 1 to 20 are displayed vertically.
- Elements 21 to 30 are displayed horizontally.
- Elements 31 to 50 are displayed vertically again.

Elements are generated dynamically only when the user scrolls, ensuring efficient rendering and smooth user experience.

## How to Run

1. Clone the repository (optional, if using terminal):

   ```bash
   git clone https://github.com/Lil-Jaguar/frontend-scroll-task.git
   cd frontend-scroll-task
2.Install dependencies:

npm install

3.Start the development server:

npm run dev

4.Open your browser and navigate to:

http://localhost:5173

5.Scroll the container vertically and horizontally as needed to dynamically render elements.


Assumptions and Limitations
The scroll container includes extra height to ensure scroll events trigger even on minimal scrolling.

The project uses React with Vite as the development environment.

Styling is minimal and inline for demonstration purposes.

Elements are rendered one-by-one with a 500ms delay to meet the assignment requirements.

The project focuses on dynamic rendering and scroll behavior; production optimizations and tests are not included.
