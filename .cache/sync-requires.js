
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-jsx": preferDefault(require("/Users/andrel/genuineswe-website/src/pages/404.jsx")),
  "component---src-pages-blog-jsx": preferDefault(require("/Users/andrel/genuineswe-website/src/pages/blog.jsx")),
  "component---src-pages-index-jsx": preferDefault(require("/Users/andrel/genuineswe-website/src/pages/index.jsx")),
  "component---src-pages-profile-jsx": preferDefault(require("/Users/andrel/genuineswe-website/src/pages/profile.jsx")),
  "component---src-pages-projects-jsx": preferDefault(require("/Users/andrel/genuineswe-website/src/pages/projects.jsx")),
  "component---src-templates-blog-post-jsx": preferDefault(require("/Users/andrel/genuineswe-website/src/templates/blog-post.jsx"))
}

