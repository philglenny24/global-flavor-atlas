# Global Flavor Atlas

A modern recipe discovery web app for exploring authentic meals from around the world.

Users can search for recipes on the homepage, browse featured famous dishes on the Explore page, and open each recipe to see full ingredients and cooking instructions.

---

##  Features

- **Search recipes via TheMealDB API** from the homepage
- **Explore famous meals** with clickable recipe cards
- **Recipe modal display** with ingredients and preparation steps
- **Responsive layout** for desktop and mobile
- **Modern UI styling** using custom CSS and Google fonts

##  Tech Stack

- HTML5
- CSS3
- JavaScript
- TheMealDB API

##  Project Structure

- `index.html` — homepage with search input and call-to-action
- `explore.html` — recipe browsing page with cards and modal recipe display
- `style.css` — application styling and responsive layout
- `index.js` — page logic for search, recipe display, and modal behavior
- `README.md` — project documentation

##  Installation

1. Clone the repository:

```bash
git clone https://github.com/philglenny24/global-flavor-atlas.git
```
2. Navigate to the project folder:

```bash
cd global-flavor-atlas
```

3. Open `index.html` or `explore.html` in your browser.

##  Usage

### Homepage Search

1. Type an ingredient or meal name into the search box.
2. Click **Find Recipes** or press Enter.
3. The app will fetch a recipe from TheMealDB and show it in a modal.

### Explore Page

1. Open `explore.html`.
2. Click any recipe card.
3. The full recipe appears in an overlay with ingredient and instruction details.

##  Notes

- The homepage search uses **TheMealDB** endpoints:
  - `search.php?s=` for name search
  - `filter.php?i=` for ingredient search
  - `lookup.php?i=` for recipe details
- The Explore page cards are currently populated with a sample set of famous meals.

##  Author

**Philip Simiyu**

- GitHub: https://github.com/philglenny24
- Email: philip10simiyu@gmail.com

##  License

This project is available under the [MIT License](LICENSE).

##  Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for recipe data
- Unsplash for sample recipe images