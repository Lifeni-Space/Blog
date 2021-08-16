import styled from "@emotion/styled"
import { Link } from "gatsby"
import React from "react"
import { RiHome2Line } from "react-icons/ri"
import ArticleTableOfContents from "./TableOfContents"

const ArticleBarWrapper = styled("div")`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  svg {
    min-width: 1.125rem;
  }

  .text {
    max-width: max-content;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

interface TableOfContentsProps {
  toc: string
}

const ArticleBar = ({ toc }: TableOfContentsProps) => {
  return (
    <ArticleBarWrapper>
      <Link to="/" className="round-left">
        <RiHome2Line aria-label="主页图标" size="1.125em" />
        <span className="text">回到「记录干杯」</span>
      </Link>
      <ArticleTableOfContents toc={toc} />
    </ArticleBarWrapper>
  )
}

export default ArticleBar
