import { AlertIcon, TagIcon, XIcon } from "@primer/octicons-react"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import { graphql, Link } from "gatsby"
import React, { useState } from "react"
import ReactDOMServer from "react-dom/server"
import Footer from "../components/footer"
import Header from "../components/header"
import Seo from "../components/seo"
import Sidebar from "../components/sidebar"
import Utterances from "../components/utterances"
import "../styles/article.less"
import "../styles/code.less"
import "../styles/override.less"

const relativeTime = require("dayjs/plugin/relativeTime")
dayjs.extend(relativeTime)
dayjs.locale("zh-cn")

const OutdatedTips = ({ post, date }) => {
  const [hideTips, setHideTips] = useState(false)

  return (
    <>
      {dayjs().unix() - dayjs(post.frontmatter.date).unix() >
        6 * 30 * 24 * 60 * 60 && (
        <div
          className={`outdated-tips ${hideTips ? "hide" : ""}`}
          id="outdated-tips"
        >
          <section>
            <p>这篇文章修改于 {date.from} ，其中有些信息可能已经过时</p>
            <button
              className="close-tips"
              id="close-tips"
              onClick={() => setHideTips(true)}
              aria-label="关闭通知"
              title="关闭通知"
            >
              <XIcon aria-label="Close Icon" size={24} />
            </button>
          </section>
          <section>
            <p className="title">
              <AlertIcon aria-label="Alert Icon" size={16} />
              Outdated Content
            </p>
          </section>
        </div>
      )}
    </>
  )
}

const BlogPost = ({ data }) => {
  const post = data.markdownRemark

  const date = {
    create: dayjs(post.frontmatter.create_date).format("YYYY 年 M 月 D 日"),
    modify: dayjs(post.frontmatter.date).format("YYYY 年 M 月 D 日"),
    from: dayjs(post.frontmatter.date).fromNow(),
  }

  const html = ReactDOMServer.renderToStaticMarkup(
    <>
      <p className="article-slug">🥚 {post.frontmatter.name}</p>
      <h1>{post.frontmatter.title}</h1>

      <section className="article-meta" id="article-meta">
        <div>
          <span title={`创建日期：${date.create}`}>{date.create}</span>
          <span> / </span>
          <span title={`修改日期：${date.modify}`}>
            {date.create.slice(0, 4) === date.modify.slice(0, 4)
              ? date.modify.slice(7)
              : date.modify}
          </span>
        </div>

        <div>
          {post.frontmatter.license === "CC-BY-SA-4.0" ? (
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/deed.zh"
              target="_blank"
              rel="noopener noreferrer"
              title={`署名-相同方式共享 4.0 国际`}
              className="article-license"
            >
              © {post.frontmatter.license}
            </a>
          ) : (
            <span
              className="article-license"
              title={`共享协议：${post.frontmatter.license}`}
            >
              © {post.frontmatter.license}
            </span>
          )}
        </div>
      </section>
    </>
  )

  const htmlEnd = ReactDOMServer.renderToStaticMarkup(
    <section className="article-info">
      <p className="subtitle">
        <TagIcon aria-label="Tag Icon" size={16} />
        {post.frontmatter.tags.map(tag => (
          <span key={tag} className="tag">
            <Link to={`/tag/${tag.toLowerCase().replace(" ", "-")}`}>
              {tag}
            </Link>
          </span>
        ))}
      </p>
    </section>
  )

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.descriptions.join(" / ")}
      />
      <Header
        back
        aside
        top
        title={post.frontmatter.title}
        data={post.frontmatter}
      />
      <main>
        <Sidebar>
          <nav
            className="toc"
            dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
          ></nav>
        </Sidebar>
        <div className="container">
          <OutdatedTips post={post} date={date} />
          <article
            id="main-content"
            dangerouslySetInnerHTML={{
              __html: html + post.html.split("</h1>")[1] + htmlEnd,
            }}
          ></article>
          <Utterances />
          <Footer />
        </div>
      </main>
    </>
  )
}

export default BlogPost

export const PostQuery = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        name
        descriptions
        tags
        date
        create_date
        license
      }
      wordCount {
        paragraphs
        words
        sentences
      }
      tableOfContents(absolute: false, maxDepth: 3)
    }
  }
`
