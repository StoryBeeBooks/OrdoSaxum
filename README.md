# OrdoSaxum - Premium Natural Stone & Sintered Stone

A luxury e-commerce website specializing in premium natural stone and sintered stone materials for high-end residential and commercial projects.

## 🎨 Design Philosophy

OrdoSaxum embodies sophisticated luxury through minimalist design, inspired by prestigious brands like Anatolia and Hermès. The website prioritizes elegance, clarity, and premium user experience.

## ✨ Typography & Aesthetic Details

### Font Families

**Primary Fonts:**
- **Headings & Display Text**: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (300, 400, 500, 600)
  - Elegant serif font for hero titles, section headings, and display text
  - Conveys luxury, sophistication, and timeless elegance
  
- **Body & UI Text**: [Inter](https://fonts.google.com/specimen/Inter) (300, 400, 500, 600)
  - Modern sans-serif for body text, navigation, and interface elements
  - Ensures excellent readability and clean, contemporary feel

**Fallback Stack:**
```css
--font-serif: 'Cormorant Garamond', Georgia, serif;
--font-sans: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

### Typography Scale

**Hero Titles:**
- Font Size: `3.5rem` (56px)
- Font Weight: 400
- Letter Spacing: `2px`
- Line Height: `1.2`
- Text Transform: Uppercase
- Font Family: Cormorant Garamond

**Section Headings:**
- Font Size: `11px`
- Font Weight: 600
- Letter Spacing: `3px`
- Text Transform: Uppercase
- Color: `#666666`
- Font Family: Inter

**Body Text:**
- Font Size: `16px`
- Font Weight: 300-400
- Letter Spacing: `0.3px`
- Line Height: `1.9`
- Color: `#1a1a1a`
- Font Family: Inter

**Navigation Links:**
- Font Size: `11px`
- Font Weight: 600
- Letter Spacing: `3px`
- Text Transform: Uppercase
- Font Family: Inter

**Buttons & CTAs:**
- Font Size: `10-11px`
- Font Weight: 600
- Letter Spacing: `2px`
- Text Transform: Uppercase
- Font Family: Inter

### Color Palette

**Primary Colors:**
```css
--primary-bg: #ffffff      /* Pure white background */
--primary-text: #1a1a1a    /* Near-black text */
--secondary-text: #666666  /* Medium gray for labels */
--accent-gray: #d9d9d9     /* Light gray accents */
--dark-bg: #2a2a2a         /* Dark sections background */
--border-color: #e0e0e0    /* Subtle borders */
```

**Usage:**
- White (`#ffffff`) - Primary background, clean canvas
- Near-Black (`#1a1a1a`) - Primary text, strong contrast
- Medium Gray (`#666666`) - Section headings, subtle labels
- Light Gray (`#e0e0e0`) - Borders, dividers
- Dark Background (`#2a2a2a`) - Footer, dark sections

### Spacing & Layout

**Consistent Rhythm:**
- Section Padding: `80px 40px` (desktop), `60px 20px` (mobile)
- Element Gaps: Multiples of 20px (20, 40, 60, 80)
- Card/Component Spacing: `60px` gap
- Text Margins: `20px` between paragraphs

**Max-Width Containers:**
- Content Width: `1400px`
- Centered with auto margins
- Consistent padding: `0 80px` (desktop), `0 20px` (mobile)

### Visual Hierarchy

**Intentional Contrast:**
1. **Dominant**: Hero titles (56px Cormorant Garamond)
2. **Primary**: Section titles (varies by context)
3. **Secondary**: Body text (16px Inter)
4. **Tertiary**: Labels & metadata (11px Inter, uppercase)

**Line Height Guidelines:**
- Headings: `1.2-1.5` (tighter for impact)
- Body Text: `1.9` (generous for readability)
- UI Elements: `1.6-1.7` (balanced)

### Design Principles

**Minimalism:**
- Generous white space
- Clean layouts without clutter
- Focus on content and imagery

**Sophistication:**
- Elegant serif headings
- Refined sans-serif body
- Subtle animations and transitions

**Clarity:**
- High contrast (near-black on white)
- Generous line-height (1.9)
- Clear visual hierarchy

**Premium Feel:**
- Uppercase labels with wide letter-spacing
- Thin font weights for elegance
- Quality imagery and video

## 📱 Mobile Optimization

### Contact Interactions
All phone numbers and email addresses are clickable with proper mobile protocols:

**Phone Numbers:**
```html
<a href="tel:+14163358881">(416) 335-8881</a>
```
- Users can tap to dial directly on mobile devices
- Proper international format (+1 for Canada/US)

**Email Addresses:**
```html
<a href="mailto:info@ordosaxum.ca">info@ordosaxum.ca</a>
```
- Users can tap to open their default email app
- Pre-fills recipient address

### Responsive Typography
- Desktop: Full scale as defined above
- Tablet: 90% scale with adjusted spacing
- Mobile: 80% scale with optimized line-height

## 🏗️ Project Structure

```
OrdoSaxum/
├── css/
│   ├── styles.css           # Main stylesheet with global styles
│   ├── contact.css          # Contact page styles
│   ├── expertise.css        # Expertise page styles
│   ├── fabrication.css      # Fabrication page styles
│   ├── natural-stone.css    # Natural stone page styles
│   ├── sintered-stone.css   # Sintered stone page styles
│   ├── policies.css         # Policy pages styles
│   └── faq.css             # FAQ page styles
├── components/
│   ├── navbar.html         # Global navigation
│   └── footer.html         # Global footer
├── js/
│   ├── scripts.js          # Global JavaScript
│   ├── components.js       # Component loader
│   └── [page-specific].js  # Page-specific scripts
├── Image Assets/           # Image resources
├── Video Assets/           # Video resources
├── policies/               # Policy pages
├── data/                   # JSON data files
└── [pages].html           # HTML pages
```

## 🚀 Features

- **Dynamic FAQ System**: JSON-powered FAQ with categorization
- **Interactive Product Galleries**: Filterable stone collections
- **3D Visualization**: Three.js integration for product viewing
- **Responsive Design**: Mobile-first approach
- **Component-Based**: Reusable navbar and footer
- **SEO Optimized**: Semantic HTML and meta tags

## 🛠️ Technologies

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **Vanilla JavaScript**: No framework dependencies
- **Google Fonts**: Cormorant Garamond & Inter
- **Three.js**: 3D product visualization
- **Git/GitHub**: Version control

## 📝 Maintenance Notes

### Typography Updates
When updating typography, ensure consistency across:
1. All CSS files (styles.css and page-specific)
2. Google Fonts import in styles.css
3. CSS custom properties in :root
4. Responsive media queries

### Adding New Pages
1. Use existing page structure as template
2. Apply consistent typography scale
3. Maintain spacing rhythm (multiples of 20px)
4. Include mobile-friendly contact links
5. Test responsive behavior

### Color Changes
All colors are defined in CSS custom properties in `css/styles.css`:
```css
:root {
  --primary-bg: #ffffff;
  --primary-text: #1a1a1a;
  --secondary-text: #666666;
  /* etc. */
}
```

## 📄 License & Contact

**OrdoSaxum**
- 📍 3024 Kennedy Rd, Scarborough, ON M1V 4Y2
- 📞 [(416) 335-8881](tel:+14163358881)
- 📧 [info@ordosaxum.ca](mailto:info@ordosaxum.ca)
- 🌐 [www.ordosaxum.ca](https://ordosaxum.ca)

---

**Last Updated**: November 11, 2025  
**Design Inspiration**: Anatolia, Hermès  
**Typography**: Luxury minimalism with elegant serif and modern sans-serif pairing
