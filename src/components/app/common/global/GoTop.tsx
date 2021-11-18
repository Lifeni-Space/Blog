import styled from "@emotion/styled"
import { RiDownloadLine } from "react-icons/ri"
import { useWindowScroll } from "react-use"
import Button from "../base/Button"

interface ContainerProps {
  isHidden: boolean
}

const Container = styled("div")<ContainerProps>`
  position: fixed;
  right: 2rem;
  bottom: 3.5rem;
  z-index: 100;
  border-radius: 100%;
  display: flex;
  visibility: ${props => (props.isHidden ? "hidden" : "visible")};
  opacity: ${props => (props.isHidden ? 0 : 1)};
  transition: all 0.2s;

  svg {
    transform: rotate(180deg);
  }

  @media (max-width: 64rem) {
    right: 1.5rem;
  }

  @media (max-width: 48rem) {
    display: none;
  }
`

const GoTop = () => {
  const { y } = useWindowScroll()

  return (
    <Container isHidden={y === 0}>
      <Button
        hasBackground
        data-name="回到顶部"
        onClick={() => window.scrollTo(0, 0)}
      >
        <RiDownloadLine aria-label="回到顶部图标" />
      </Button>
    </Container>
  )
}

export default GoTop