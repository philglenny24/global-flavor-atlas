# Global Flavor Atlas

A modern recipe discovery web app for exploring authentic meals from around the world.

Users can search for recipes on the homepage, browse featured famous dishes on the Explore page, and open each recipe to see full ingredients and cooking instructions.

## Live Demo

You can deploy the website using GitHub Pages or any hosting platform.

*https://philglenny24.github.io/global-flavor-atlas/*

## Features

- **Search recipes via TheMealDB API** from the homepage
- **Explore famous meals** with clickable recipe cards
- **Recipe modal display** with ingredients and preparation steps
- **Responsive layout** for desktop and mobile
- **Modern UI styling** using custom CSS and Google fonts

## Tech Stack

- HTML5
- CSS3
- JavaScript
- TheMealDB API

## Project Structure

- `index.html` — homepage with search input and call-to-action
- `explore.html` — recipe browsing page with cards and modal recipe display
- `privacy.html` — site privacy policy page
- `terms.html` — site terms of service page
- `style.css` — application styling and responsive layout
- `index.js` — page logic for search, recipe display, and modal behavior
- `test/index.test.js` — Jest validation tests for site configuration
- `package.json` — project scripts and dependencies
- `README.md` — project documentation

## Deployment

This project is configured for GitHub Pages deployment using GitHub Actions.
The workflow file is located at `.github/workflows/main.yml` and runs on pushes to `main`.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/philglenny24/global-flavor-atlas.git
```

2. Navigate to the project folder:

```bash
cd global-flavor-atlas
```

3. Install dependencies:

```bash
npm install
```

4. Open `index.html` or `explore.html` in your browser.

## Testing

Run the Jest tests to verify the website configuration and required files.

```bash
npm test
```

The test suite checks that:

- `style.css` is present and used by HTML pages
- `.github/workflows/main.yml` exists and contains deployment steps
- `index.js` uses `fetch(...)` to call a public API
- `privacy.html` and `terms.html` are available

## Usage

### Homepage Search

1. Type an ingredient or meal name into the search box.
2. Click **Find Recipes** or press Enter.
3. The app will fetch a recipe from TheMealDB and show it in a modal.

### Explore Page

1. Open `explore.html`.
2. Click any recipe card.
3. The full recipe appears in an overlay with ingredient and instruction details.

## Notes

- The homepage search uses **TheMealDB** endpoints:
  - `search.php?s=` for name search
  - `filter.php?i=` for ingredient search
  - `lookup.php?i=` for recipe details
- The Explore page cards are currently populated with a sample set of famous meals.

## Author

**Philip Simiyu**

- GitHub: https://github.com/philglenny24
- Email: philip10simiyu@gmail.com

## License

This project is available under the [MIT License](LICENSE).

## Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for recipe data
- Unsplash for sample recipe images
