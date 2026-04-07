module.exports = {
  siteMetadata: {
    title: `Andrel Karunia Sitanggang - Software Engineer`,
    description: `Personal website and portfolio of Andrel Karunia Sitanggang, an experienced Software Engineer specializing in React, React Native, and modern web technologies.`,
    author: `Andrel Karunia Sitanggang`,
    siteUrl: `https://genuineswe.github.io`,
    social: {
      github: `https://github.com/genuineswe`,
      linkedin: `https://www.linkedin.com/in/sitanggangandrel`,
    },
  },
  // Add pathPrefix for GitHub Pages
  pathPrefix: '',
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("autoprefixer"),
        ],
      },
    },
  ],
}
