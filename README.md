# Post Pulse

A responsive blog listing and detail viewer with create, edit, and delete functionality, built with HTML, CSS, and JavaScript. This project demonstrates dynamic DOM manipulation, RESTful API interactions, and responsive design using CSS flexbox and media queries.

---

## Features

- **Blog Listing:** Displays a list of blog previews with images, titles, and excerpts.
- **Blog Detail View:** Shows the full content of a selected blog.
- **Create New Blog:** Add new blog posts via a modal form.
- **Edit Blog:** Edit existing blog posts with an intuitive modal form.
- **Delete Blog:** Delete blog posts with confirmation prompts.
- **Responsive Design:** Layout adapts for desktop and smaller screens using CSS media queries.
- **Visual Effects:** Uses backdrop blur and hover effects for enhanced UI.

---

## Technologies Used

- HTML
- CSS
- JavaScript (DOM manipulation, Fetch API, Event Listeners)
- RESTful API (assumed backend at `localhost:3000`)

---



## Usage

1. **Viewing Blogs:** Click on blog previews in the list to view details.
2. **Adding a Blog:** Click the "New blog" button to open the modal form, fill in details, and submit.
3. **Editing a Blog:** Click the edit button (E) on a blog preview to open the modal pre-filled with blog data for editing.
4. **Deleting a Blog:** Click the delete button (X) on a blog preview and confirm to remove the blog.
5. **Responsive Behavior:** Resize your browser window or open on different devices to see the layout adapt.

---

## Important Implementation Details

- **Form Submission:** A single form handles both adding and editing blogs, distinguished by an internal edit mode flag.
- **API Requests:** Uses `fetch` with appropriate HTTP methods (`POST` for create, `PUT` for update, `DELETE` for delete).
- **Validation:** Form inputs are validated for completeness and correct URL format before submission.
- **Modal Behavior:** The modal form overlays the page, blurs the background, and disables interaction with the main content while open.
- **Event Handling:** Event listeners manage dynamic content updates and UI state toggling.

---

## Author

**Munene Morris**

---

## License

This project is open source and free to use.

