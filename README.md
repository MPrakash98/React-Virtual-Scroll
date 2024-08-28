
# Introduction

This is a React application that displays a virtualized table with a search bar. The table efficiently handles large datasets using React Window for virtualization. The app fetches paginated data from an API and allows users to search through the data. The layout is fully responsive, and the styling is implemented with plain CSS.


## Features

- **Virtualized Table**: Efficiently renders large datasets by only rendering visible rows.
- **Search Functionality**: Allows users to search through the data using a search bar.
- **Responsive Design**: The table and search bar are fully responsive and adapt to different screen sizes.
- **CSS-Only Styling**: No UI libraries are used; all styling is done with plain CSS.


## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MPrakash98/React-Virtual-Scroll.git
   cd React-Virtual-Scroll
   ```
    
2. **Install Dependencies**:
Make sure you have Node.js installed. Then, run:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm run start
   ```
    

## File Structure

- **src/components/MyVirtualizedTable.js**: The main React component that renders the virtualized table and search bar.

## Customization

- Change the `REACT_APP_PAGE_LIMIT` in .env file for rendering limit.
- Change `REACT_APP_API_URL` in .env file to fetch data from server of your choice.
