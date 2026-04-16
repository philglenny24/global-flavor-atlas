const fs = require("fs");
const path = require("path");

// Resolve the repository root relative to this test file.
const root = path.resolve(__dirname, "..");

// Helper to read a file from the repository root.
const readFile = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

// Group all website configuration checks into one test suite.
describe("Website configuration checks", () => {
  test("style.css exists", () => {
    // Ensure the main stylesheet file is present.
    const filePath = path.join(root, "style.css");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test("HTML pages link to style.css", () => {
    // Verify the core HTML pages include the main stylesheet link.
    const pages = ["index.html", "explore.html", "privacy.html", "terms.html"];
    pages.forEach((page) => {
      const content = readFile(page);
      expect(content).toMatch(/href=["']style\.css["']/i);
    });
  });

  test("GitHub Actions workflow exists at .github/workflows/main.yml", () => {
    // Confirm the required workflow file is configured for deployment.
    const workflowPath = path.join(root, ".github", "workflows", "main.yml");
    expect(fs.existsSync(workflowPath)).toBe(true);
  });

  test("GitHub Actions workflow includes deployment steps", () => {
    // Check that the workflow contains Pages deployment steps.
    const workflow = readFile(path.join(".github", "workflows", "main.yml"));
    expect(workflow).toMatch(/actions\/configure-pages@v4/);
    expect(workflow).toMatch(/actions\/deploy-pages@v4/);
  });

  test("index.js uses fetch to call a public API", () => {
    // Validate index.js makes network requests to a public API.
    const script = readFile("index.js");
    expect(script).toMatch(/fetch\(/);
    expect(script.toLowerCase()).toMatch(
      /themealdb|public api|lookup\.php|search\.php|filter\.php/,
    );
  });

  test("privacy.html and terms.html exist", () => {
    // Ensure both required policy pages are present.
    expect(fs.existsSync(path.join(root, "privacy.html"))).toBe(true);
    expect(fs.existsSync(path.join(root, "terms.html"))).toBe(true);
  });
});
