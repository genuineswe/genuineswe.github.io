import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const author = data.site.siteMetadata?.author || "Andrel Karunia Sitanggang"
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Blog" description="Kumpulan tulisan dan artikel dari Andrel Karunia Sitanggang" />
      
      <div className="bg-dark-bg min-h-screen pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <header className="mb-16 text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-text-primary">
              Blog
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Berbagi pengalaman, tutorial, dan pemikiran seputar pengembangan perangkat lunak.
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
                  <div className="p-6 md:p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-accent-cyan/20 border border-accent-cyan flex items-center justify-center text-accent-cyan font-bold text-xs">
                        {author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-text-primary font-bold text-sm leading-none mb-1">{author}</span>
                        <span className="text-text-muted text-xs font-mono">{post.frontmatter.date}</span>
                      </div>
                    </div>

                    <div className="md:pl-11">
                      <h2 className="text-2xl md:text-4xl font-extrabold mb-3 group-hover:text-accent-cyan transition-colors leading-tight">
                        <Link to={post.fields.slug} itemProp="url">
                          <span itemProp="headline">{title}</span>
                        </Link>
                      </h2>

                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        className="text-text-secondary text-lg mb-6 line-clamp-3"
                        itemProp="description"
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-text-muted font-mono">
                          <span>{post.timeToRead} min read</span>
                        </div>
                        
                        <Link 
                          to={post.fields.slug} 
                          className="px-4 py-2 rounded-lg bg-dark-bg-tertiary/30 text-text-secondary font-medium hover:bg-accent-cyan hover:text-dark-bg transition-all"
                        >
                          Read Article
                        </Link>
                      </div>
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
        author
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
          date(formatString: "MMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
