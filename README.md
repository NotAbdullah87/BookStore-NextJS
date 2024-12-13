# BookStore Application

Welcome to the BookStore application! This project is part of the Advanced Programming course at the National University of Computer and Emerging Sciences, Lahore Campus. The application allows users to manage books, genres, authors, and user interactions dynamically. It features a modern UI, user authentication, and backend APIs built with Next.js.


<div align="center">
  <img src="https://github.com/user-attachments/assets/9dba34b0-ae01-4eff-b16b-1b4bb5f27f59" alt="Demo of the Authors Page" />
</div>

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [User Authentication](#user-authentication)
- [Personalized Content](#personalized-content)
- [Data Handling](#data-handling)
- [Routing Strategies](#routing-strategies)
- [Static Generation](#static-generation)
- [Server-Side Rendering](#server-side-rendering)
- [Client-Side Rendering](#client-side-rendering)
- [Additional Features](#additional-features)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure login and logout functionality.
- **Dynamic Data Handling:** Fetch and display books, genres, authors, and user history.
- **Personalized Content:** Display user-specific information and search history.
- **Responsive UI:** Modern and visually appealing design using Tailwind CSS.
- **Backend APIs:** Manage data dynamically with Next.js API routes.
- **Comprehensive Book Management:** Browse, search, and view detailed information about books, categories, and authors.
- **Dark Mode Toggle:** Switch between light and dark themes.
- **Search History:** Store and display recent searches using local storage and API.

## Technologies Used

- **Frontend:** Next.js | Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** MySQL
- **Authentication:** useContext hook for session management

## Setup

### Prerequisites

- Node.js and npm/yarn installed
- MySQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bookstore-app.git
   cd bookstore-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your database connection details and other environment variables.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## API Endpoints

### Authentication APIs

- **Login API:**
  - **Endpoint:** `POST /api/auth/login`
  - **Description:** Authenticates the user and returns a token.

- **Logout API:**
  - **Endpoint:** `POST /api/auth/logout`
  - **Description:** Ends the user's session.

### Books API

- **Get All Books:**
  - **Endpoint:** `GET /api/books`
  - **Description:** Fetches a list of all books.

- **Get Book Details:**
  - **Endpoint:** `GET /api/books/[id]`
  - **Description:** Fetches detailed information for a specific book.

### Genres API

- **Get All Genres:**
  - **Endpoint:** `GET /api/genres`
  - **Description:** Fetches a list of all genres.

- **Get Books by Genre:**
  - **Endpoint:** `GET /api/genres/[id]/books`
  - **Description:** Fetches books belonging to a specific genre.

### Authors API

- **Get All Authors:**
  - **Endpoint:** `GET /api/authors`
  - **Description:** Fetches a list of all authors.

- **Get Author Details:**
  - **Endpoint:** `GET /api/authors/[id]`
  - **Description:** Fetches details of a specific author, including their books.

### User History API

- **Get Search History:**
  - **Endpoint:** `GET /api/user/history`
  - **Description:** Retrieves the user's search history.

- **Add Search Query:**
  - **Endpoint:** `POST /api/user/history`
  - **Description:** Adds a new query to the user's search history.

## User Authentication

User authentication is managed using the `useContext` hook. The `AuthContext` provides login, logout, and user values. The application is wrapped with the `AuthContext.Provider` in `_app.js` to make the authentication state accessible throughout the app.

## Personalized Content

- **Restricted Access:** Author details and book details pages are accessible only to logged-in users.
- **Search History:** Logged-in users can view and manage their search history.
- **Personalized Homepage:** Displays the user's email and a logout button when logged in.

## Data Handling

- Use a JSON file `books.json` to store information about books, genres, and authors.
- Each book should include properties like `id`, `title`, `author`, `description`, `price`, `genre`, and `rating`.
- Each genre should have an `id` and `name`.
- Each author should include `id`, `name`, and `biography`.

## Routing Strategies

### Home Page (index.js)

- Create a homepage that displays a list of featured books with a "View Genres" button.
- Use programmatic navigation (e.g., `router.push()`) to navigate to the genres page when the button is clicked.

### Dynamic Routes

- Implement dynamic routes for individual book details (`/books/[id]`), showing the book's details based on the `id` parameter from the JSON file.
- Use `getStaticPaths()` to generate paths for these dynamic routes and `getStaticProps()` to prerender book pages.

### Nested Routes

- Include nested routes within the book details page for author information (e.g., `/books/[id]/author`).

### Catch-All Routes

- Create a catch-all route for information pages (e.g., `/info/[...slug]`) to handle multiple levels of routing for sections like FAQs or support. Examples:
  - `/info`
  - `/info/faqs`
  - `/info/support`

### Custom 404 Page

- Implement a custom `404.js` page to display a user-friendly error message when a page is not found.

## Static Generation (SSG)

- Use `getStaticProps()` to generate the book list page statically.
- Include the `revalidate` key in `getStaticProps()` to implement Incremental Static Regeneration (ISR) for periodic updates of static pages.
- Use the `notFound` key to handle cases where book data is unavailable.

### Static Generation with Dynamic Routes

- Use `getStaticPaths()` and `getStaticProps()` to statically generate pages for individual books.
- Implement the `fallback` key to handle dynamic book pages that are not pre-generated.

## Server-Side Rendering (SSR)

- Create a page for book genres using `getServerSideProps()` to fetch data at request time.

## Client-Side Rendering (CSR)

- Use the `useSWR()` hook to fetch data dynamically on the client side, particularly for the list of authors.

## Books Page

- Display a list of all books, with filtering options by genre.
- Each book card should have a "View Details" button that links to the dynamic book page.

## Book Details Page

- Show full book details, including the title, description, author, price, and rating.
- Provide a nested route to display detailed information about the book's author.

## Genres Page

- Show a list of book genres, each linking to a filtered list of books in that genre.

## Authors Page

- Display a list of authors using CSR with the `useSWR()` hook for dynamic data fetching.

## Additional Features

- Implement a dark mode toggle for the application, allowing users to switch between light and dark themes.
- Store user search history using local storage and display recent searches on the search page.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Made with ❤️ by [Abdullah Shakir]([https://github.com/yourusername](https://github.com/NotAbdullah87))
```
