import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div>
        <svg className="svg">
          <path className="path" />
        </svg>
        <svg>
          <path />
        </svg>
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  .body {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .svg {
    position: absolute;
    width: 400px;
    fill: none;
  }

  .svg:nth-child(2) {
    filter: blur(200px);
  }

  .svg path {
    d: path("M0,25 C150,110 150, -60 300,25");
    stroke: #ff0092;
    stroke-width: 50;
    stroke-linecap: round;
    transform: translate(50px,50%);
    animation: animate 2s ease-in-out infinite;
  }

  @keyframes animate {
    0% {
      stroke: greenyellow;
      stroke: #ff0092;
      d: path("M0,25 C150,110 150, -60 300,25");
    }

    50% {
      stroke: dodgerblue;
      stroke: #00ff00;
      d: path("M0,25 C160,-50 140, 110 300,25");
    }
  }`;

export default Loader;