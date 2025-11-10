# OrdoSaxum Development Best Practices

## 📋 Architecture Principles

### **ALWAYS REMEMBER: Data-Driven Architecture**

**Never hardcode large amounts of content directly in HTML files!**

## ✅ Correct Approach: Separation of Concerns

### 1. **Data Layer (JSON)**
- Store all content in JSON files in `/data/` directory
- Easy to update, translate, or manage by non-developers
- Can be edited without touching code
- Enables future CMS integration
- Example: `data/faq-data.json`, `data/products.json`

### 2. **Logic Layer (JavaScript)**
- Create modular JavaScript files in `/js/` directory
- Handle data loading, rendering, and interactions
- Reusable components and utilities
- Example: `js/faq-loader.js`, `js/product-loader.js`

### 3. **Presentation Layer (HTML)**
- Keep HTML minimal and semantic
- Use data attributes and IDs for JavaScript hooks
- No hardcoded content (except static elements)
- Example: Clean structure with placeholder containers

### 4. **Style Layer (CSS)**
- Dedicated CSS files for each major component
- Use BEM or similar naming conventions
- Responsive and accessible by default
- Example: `css/faq.css`, `css/products.css`

## 🎯 Benefits of This Approach

1. **Maintainability**: Update content without touching code
2. **Scalability**: Easy to add features like search, filtering, sorting
3. **Performance**: Can implement lazy loading, caching
4. **SEO**: Can pre-render or use SSR techniques
5. **Accessibility**: Better control over semantic HTML
6. **Internationalization**: Easy to add multi-language support
7. **Testing**: Can test data separately from presentation
8. **Collaboration**: Designers, developers, and content editors work independently

## 📁 Recommended Project Structure

```
OrdoSaxum/
├── data/
│   ├── faq-data.json          # FAQ content
│   ├── products.json          # Product catalog
│   ├── testimonials.json      # Customer reviews
│   └── site-config.json       # Global site settings
├── js/
│   ├── faq-loader.js          # FAQ page logic
│   ├── product-loader.js      # Product page logic
│   ├── components.js          # Shared components (navbar, footer)
│   └── utils.js               # Utility functions
├── css/
│   ├── styles.css             # Global styles
│   ├── faq.css                # FAQ-specific styles
│   ├── products.css           # Product-specific styles
│   └── components.css         # Component styles
├── components/
│   ├── navbar.html            # Reusable navbar
│   └── footer.html            # Reusable footer
└── *.html                     # Clean, minimal HTML files
```

## 🔄 Future Enhancements to Consider

### Phase 1: Current Implementation
- ✅ JSON data files
- ✅ JavaScript loaders
- ✅ Modular CSS
- ✅ Clean HTML structure

### Phase 2: Advanced Features
- [ ] Search functionality within FAQs
- [ ] Category filtering
- [ ] Bookmark/favorite questions
- [ ] Print-friendly views
- [ ] Analytics tracking (which questions are most viewed)

### Phase 3: Performance & SEO
- [ ] Service Worker for offline access
- [ ] Pre-rendering for SEO
- [ ] Lazy loading for large datasets
- [ ] CDN for data files

### Phase 4: Content Management
- [ ] Admin panel for content editing
- [ ] Multi-language support
- [ ] Version control for content
- [ ] A/B testing different content

## 💡 Key Patterns to Use

### 1. Module Pattern
```javascript
class ContentLoader {
  constructor(dataPath) {
    this.dataPath = dataPath;
    this.data = null;
  }
  
  async init() {
    await this.loadData();
    this.render();
  }
}
```

### 2. Data Structure
```json
{
  "metadata": {
    "version": "1.0",
    "lastUpdated": "2025-11-10"
  },
  "content": [...]
}
```

### 3. Error Handling
Always provide graceful fallbacks:
```javascript
try {
  await loadData();
} catch (error) {
  showErrorMessage();
}
```

## 🚫 Anti-Patterns to Avoid

1. **DON'T**: Hardcode large blocks of text in HTML
2. **DON'T**: Mix content with presentation
3. **DON'T**: Repeat code across multiple pages
4. **DON'T**: Inline styles or scripts
5. **DON'T**: Ignore accessibility features
6. **DON'T**: Skip error handling
7. **DON'T**: Forget mobile responsiveness

## 📝 Code Review Checklist

Before committing code, ask:
- [ ] Is content separated from code?
- [ ] Can non-developers update the content easily?
- [ ] Is the code modular and reusable?
- [ ] Are error states handled gracefully?
- [ ] Is it mobile-responsive?
- [ ] Is it accessible (WCAG AA compliant)?
- [ ] Is it performant (fast loading)?
- [ ] Is it maintainable (well-documented)?

## 🎨 CSS Best Practices

1. Use CSS custom properties (variables) for theming
2. Mobile-first responsive design
3. BEM naming convention
4. Separate layout from skin
5. Use semantic class names
6. Avoid !important
7. Keep specificity low

## 🔐 Security Considerations

1. Sanitize data before rendering (XSS prevention)
2. Use HTTPS for data fetching
3. Validate JSON structure
4. Implement Content Security Policy (CSP)
5. Rate limit API calls if applicable

## 🌐 SEO Considerations

1. Pre-render critical content for crawlers
2. Use semantic HTML
3. Implement structured data (JSON-LD)
4. Ensure fast page load times
5. Mobile-friendly design
6. Proper heading hierarchy

## 📱 Progressive Enhancement

1. Core content accessible without JavaScript
2. Enhanced experience with JavaScript
3. Graceful degradation
4. Feature detection, not browser detection

---

**Remember**: Good architecture is about making future changes easy, not just making current code work!

*Last Updated: November 10, 2025*
