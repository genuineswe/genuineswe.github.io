import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  // const author = site.siteMetadata?.author || "Andrel Karunia Sitanggang"

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <div className="bg-dark-bg min-h-screen pt-24 pb-20 px-4">
        <article
          className="max-w-4xl mx-auto bg-dark-bg-secondary rounded-xl border border-dark-bg-tertiary shadow-soft overflow-hidden animate-fade-in"
          itemScope
          itemType="http://schema.org/Article"
        >
          {/* Header Colored Bar - DEV.to style */}
          <div className="h-4 bg-accent-cyan w-full" />

          <div className="p-6 md:p-12 lg:p-16">
            <header className="mb-10">
              <Link
                to="/blog"
                className="flex text-accent-cyan hover:text-accent-blue transition-colors mb-8 inline-flex items-center font-mono text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blogs
              </Link>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-text-primary leading-tight" itemProp="headline">
                {post.frontmatter.title}
              </h1>

              {/* Author Meta Section */}
              <div className="flex items-center space-x-4 mb-8">
                {/* <div className="w-12 h-12 rounded-full bg-accent-cyan/20 border border-accent-cyan flex items-center justify-center text-accent-cyan font-bold text-lg">
                  {author.split(' ').map(n => n[0]).join('')}
                </div> */}
                <div>
                  {/* <p className="text-text-primary font-bold">{author}</p> */}
                  <p className="text-text-muted text-sm font-mono">
                    {post.frontmatter.date} • {post.timeToRead} min read
                  </p>
                </div>
              </div>
            </header>

            <section
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
              className="blog-content"
            />

            {
              (previous || next) &&
              <footer className="mt-16 pt-8 border-t border-dark-bg-tertiary">
                <nav className="flex flex-col sm:flex-row justify-between gap-6">
                  <div>
                    {previous && (
                      <Link
                        to={previous.fields.slug}
                        rel="prev"
                        className="group flex flex-col p-4 rounded-lg bg-dark-bg hover:bg-dark-bg-tertiary/20 transition-all border border-dark-bg-tertiary/50"
                      >
                        <span className="text-text-muted text-xs mb-1 font-mono uppercase tracking-wider">Previous Post</span>
                        <span className="text-accent-cyan group-hover:text-accent-blue transition-colors font-bold">
                          ← {previous.frontmatter.title}
                        </span>
                      </Link>
                    )}
                  </div>
                  <div className="text-right">
                    {next && (
                      <Link
                        to={next.fields.slug}
                        rel="next"
                        className="group flex flex-col p-4 rounded-lg bg-dark-bg hover:bg-dark-bg-tertiary/20 transition-all border border-dark-bg-tertiary/50"
                      >
                        <span className="text-text-muted text-xs mb-1 font-mono uppercase tracking-wider">Next Post</span>
                        <span className="text-accent-cyan group-hover:text-accent-blue transition-colors font-bold">
                          {next.frontmatter.title} →
                        </span>
                      </Link>
                    )}
                  </div>
                </nav>
              </footer>
            }
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
