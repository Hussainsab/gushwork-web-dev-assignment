## How to Download & Run

This project consists of pure HTML, CSS, and vanilla JavaScript and does not require any complex build steps or installations.

1. **Clone the repository** (or download and extract the ZIP file):
   ```bash
   git clone <repository-url>
   ```
2. **Navigate to the project folder**:
   ```bash
   cd <project-folder-name>
   ```
3. **Run the project**:
   - Simply open the `index.html` file in any modern web browser (Google Chrome, Firefox, Safari, Edge, etc.) by double-clicking it.
   - Alternatively, you can use an extension like **Live Server** in VS Code for a better development experience with hot-reloading.

## Key Functionality & Features

The project incorporates several interactive and dynamic features across the user interface:

### 1. Interactive Product Gallery & Zoom
- **Thumbnail Navigation**: Users can click on small thumbnails to view the main product image.
- **Image Zoom**: Hovering over the main product image activates a lens overlay, displaying a highly magnified (3x) view in an adjacent panel to examine product details closely.
- **Responsive Gallery**: On extremely small screens (<= 360px), the gallery layout intelligently reorders itself to sit beneath the product features for better usability.

### 2. Sticky Product Action Bar
- A secondary navigation & action bar remains fixed at the bottom of the screen once the user scrolls past the main product hero section.
- This ensures that vital product details (thumbnail, title, price range) and the "Get Custom Quote" call-to-action are always accessible.

### 3. Step-by-Step Manufacturing Process
- Desktop users can explore the manufacturing process using image arrow buttons or by clicking on interactive step pills to update the content below.
- On mobile devices (<= 800px), a custom mobile UI is injected containing precise step counters and Previous/Next buttons for an optimal touch experience.

### 4. Interactive FAQ Accordion
- Frequently asked questions are contained within an accordion layout. Clicking on a question smoothly expands the relevant answer while automatically closing any other previously opened answers.

### 5. Modals for Quotes & Downloads
- Action buttons trigger dedicated modal popups for "Requesting a Quote" and "Downloading the Brochure".
- When active, the background page scroll is locked, and modals can be closed via the close button, clicking outside the modal area, or pressing the `Escape` key.

### 6. Performance Optimized
- Strategic application of `loading="lazy"` on all off-screen images guarantees that the initial page load remains fast and bandwidth-efficient.
