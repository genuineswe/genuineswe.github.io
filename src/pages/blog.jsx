import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO 
        title="Blog" 
        description="A collection of technical articles, tutorials, and thoughts on software engineering by Andrel Karunia Sitanggang." 
      />
      
      <div className="bg-dark-bg min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <header className="mb-16 text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-text-primary">
              Blog
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Sharing experiences, tutorials, and insights on modern software development.
            </p>
          </header>

          <div className="flex flex-col gap-6">
            {posts.map((post, index) => {
              const title = post.frontmatter.title || post.fields.slug

              return (
                <article
                  key={post.fields.slug}
                  className="bg-dark-bg-secondary rounded-xl border border-dark-bg-tertiary 
                             hover:border-accent-cyan shadow-soft transition-all stagger-item group overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <div className="p-6 md:p-10">
                    <div className="mb-4">
                      <span className="text-text-muted text-sm font-mono tracking-wider uppercase">
                        {post.frontmatter.date}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-extrabold mb-4 group-hover:text-accent-cyan transition-colors leading-tight">
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      className="text-text-secondary text-lg mb-8 line-clamp-3 leading-relaxed"
                      itemProp="description"
                    />

                    <div className="flex items-center justify-between pt-4 border-t border-dark-bg-tertiary/50">
                      <div className="flex items-center space-x-4 text-sm text-text-muted font-mono">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {post.timeToRead} min read
                        </span>
                      </div>
                      
                      <Link 
                        to={post.fields.slug} 
                        className="inline-flex items-center text-accent-cyan font-bold hover:text-accent-blue transition-colors group-hover:translate-x-1 transition-transform"
                      >
                        Read Post
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt(pruneLength: 200)
        timeToRead
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
