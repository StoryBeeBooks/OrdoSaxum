# OrdoSaxum Website - Component System Documentation

## Overview
This website uses a centralized component system to manage shared elements like navigation bars and footers. This ensures consistency across all pages and makes updates easy.

## Structure

### Component Files
- **`components/navbar.html`** - Contains the navigation bar HTML
- **`components/footer.html`** - Contains the footer HTML
- **`js/components.js`** - JavaScript that loads components dynamically into pages

### How It Works

1. **Component Files**: Shared HTML elements (navbar, footer) are stored in separate files in the `/components` folder
2. **Placeholders**: Each page has placeholder divs where components will be injected:
   ```html
   <div id="navbar-placeholder"></div>
   <div id="footer-placeholder"></div>
   ```
3. **Auto-Loading**: The `components.js` script automatically loads and injects components when the page loads

## Adding Components to New Pages

### For Root-Level Pages (index.html, contact.html, policies.html)

1. Add the components script in the `<head>` section:
   ```html
   <script src="js/components.js"></script>
   ```

2. Replace hardcoded navbar with:
   ```html
   <div id="navbar-placeholder"></div>
   ```

3. Replace hardcoded footer with:
   ```html
   <div id="footer-placeholder"></div>
   ```

### For Subdirectory Pages (policies/*.html)

1. Add the components script with relative path:
   ```html
   <script src="../js/components.js"></script>
   ```

2. Use the same placeholders as above
   
The component loader automatically detects the directory level and loads components with the correct path.

## Updating Shared Components

### To Update Navigation Bar
1. Edit `/components/navbar.html`
2. Changes will automatically appear on all pages

### To Update Footer
1. Edit `/components/footer.html`
2. Changes will automatically appear on all pages

## Benefits

1. **Single Source of Truth**: Update navbar/footer once, changes reflect everywhere
2. **Consistency**: All pages use identical navigation and footer
3. **Scalability**: Easy to add hundreds of pages without code duplication
4. **Maintainability**: Fix bugs or update content in one place
5. **Performance**: Components are cached by the browser after first load

## Current Implementation

### Updated Pages
- ✅ index.html
- ✅ contact.html
- ✅ policies.html
- ✅ policies/cookie-policy.html
- ✅ policies/terms-of-use.html
- ✅ policies/accessibility.html
- ✅ policies/private-policy.html

### Template for New Pages

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - OrdoSaxum</title>
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/components.js"></script>
</head>
<body>
  
  <!-- Navigation -->
  <div id="navbar-placeholder"></div>
  
  <!-- Your page content here -->
  <main>
    <!-- Page-specific content -->
  </main>
  
  <!-- Footer -->
  <div id="footer-placeholder"></div>
  
  <script src="js/scripts.js"></script>
</body>
</html>
```

## Troubleshooting

### Components Not Loading?
1. Check browser console for errors
2. Verify the `components.js` script is included in `<head>`
3. Ensure placeholder divs have correct IDs: `navbar-placeholder` and `footer-placeholder`
4. Check file paths are correct relative to page location

### Paths Not Working?
The component loader automatically adjusts paths based on directory depth. If you're in a deeper subdirectory, you may need to modify the `getBasePath()` function in `components.js`.

## Future Enhancements

Potential improvements to consider:
- Add caching mechanism for better performance
- Create additional reusable components (e.g., breadcrumbs, call-to-action sections)
- Implement component versioning for cache busting
- Add loading indicators while components load

## Migration Notes

All existing pages have been migrated from hardcoded HTML to the component system. The old navbar and footer code has been removed from individual pages and centralized in the `/components` folder.

---

Last Updated: November 2, 2025
