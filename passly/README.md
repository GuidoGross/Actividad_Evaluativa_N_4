# **Passly - Ticket Purchasing System**

Web-based ticket purchasing system featuring a modern and fluid interface. Developed as an assessment activity for the Paradigms and Programming Languages III course.

---

## **Purpose**

**This web application is designed to provide a comprehensive platform for event management and ticket purchasing, focusing on:**

- Browsing and discovering upcoming concerts, theater plays, sports, and festivals.
- Viewing detailed information for individual events, including real-time availability and pricing.
- Providing a streamlined and secure user flow for selecting and purchasing tickets.

---

## **Features**

### **Pages & Routing**

- **Home ("/"):** Impactful landing page featuring a promotional banner, curated sections for "Best Sellers" and "Recently Added" events, and smooth scroll navigation.
- **Catalog ("/catalogo/[[filter]]"):** A fully functional catalog with an advanced filtering sidebar. Users can filter by search query, category, location, status, price range, date range, and time range. It supports URL parameters for direct linking to specific filters.
- **Sign In ("/iniciar_sesion"):** A sleek login interface using glassmorphism aesthetics.
- **Sign Up ("/registrarse"):** A comprehensive registration form with interactive date selection and robust input validation.

### **User Interface Components (UI)**

**Modular and responsive Svelte components:**

- **navigation_bar:** Fixed, translucent top bar (glassmorphism) featuring a search input and authentication actions.
- **main_banner:** Impactful hero section with background image blending (fade effect), gradient overlays, and call-to-action buttons.
- **event_grid:** Dynamic CSS grid layout for displaying collections of events, adapting from 1 to multiple columns based on viewport.
- **event_card:** Detailed interactive cards displaying event image, category badges, dynamic status (Available/Sold out), date, title, description, and pricing with hover animations.
- **footer:** Comprehensive site footer including quick navigation, legal links, and social media SVG icons.
- **scroll_to_top_button:** A reusable, animated floating action button that allows users to smoothly scroll back to the top of the page.

### **Advanced Functionality & Utilities**

- **Input Masking ("date_mask.ts"):** Custom TypeScript utility to enforce strict date formats ("DD/MM/Y.YYY") on text inputs. It intelligently handles leap years, month boundaries, and year constraints in real-time.
- **Flatpickr Integration:** Elegant and localized (Spanish) calendar popups synchronized perfectly with the manual input masks for seamless date selection.
- **Dynamic Filtering:** Svelte 5 "$derived" state is used to apply complex, multi-layered filters and sorting mechanisms instantaneously on the client side.

### **Styling System (CSS)**

**Global and scoped styling built completely on Vanilla CSS:**

- **CSS Variables:** Centralized design system in "app.css" defining the color palette, typography (Inter & Outfit), spacing, and transitions.
- **Responsive Design:** Fluid typography using "clamp()" and media queries ensuring perfect rendering on mobile devices and large desktop displays.
- **Modern Aesthetics:** Extensive use of "backdrop-filter" for glassmorphism, subtle gradients, and refined hover/focus animations to deliver a premium user experience.