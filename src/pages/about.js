import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <article>
      <p className="subtitle">About</p>
      <h1>关于我和这个网站</h1>
      <p>东北某大学学生，大二，未来也许是前端程序员。</p>
      <p>网站使用 GatsbyJS 构建，大概每过一段时间就会改动。</p>
      <br />
      <blockquote>
        <address> 联系我：liangfengning@foxmail.com</address>
      </blockquote>
    </article>
    <nav>
      <Link to="/" className="fab back-home" aria-label="Home" title="回到主页">
        回到主页
      </Link>
    </nav>
  </Layout>
)

export default AboutPage
