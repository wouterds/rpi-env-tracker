import styled from 'styled-components';
import { breakpoints } from 'styles';

export const Chart = styled.div`
  border: 0.05rem solid #eceff1;
  border-radius: 0.25rem;
  box-shadow: rgba(17, 51, 83, 0.02) 0 0.25rem 1rem 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  user-select: none;

  @media (max-width: ${breakpoints.lg}px) {
    flex: auto;
    min-height: 300px;
  }

  @media (max-width: ${breakpoints.sm}px) {
    min-height: 400px;
  }
`;

export const ChartContent = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.div`
  z-index: 1;
  position: absolute;
  background: #fcfcfc;
  border-right: 0.05rem solid #eceff1;
  border-bottom: 0.05rem solid #eceff1;
  top: 0;
  left: 0;
  border-bottom-right-radius: 0.25rem;
  padding: 0.35rem 0.5rem;
  line-height: 1;
  color: #6f8597;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.6rem;
  letter-spacing: 0.1rem;
  word-spacing: 0.1rem;
`;

export const CurrentValue = styled.div`
  z-index: 1;
  position: absolute;
  top: 2rem;
  left: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.25rem;
  padding: 0.25rem;
  display: inline-block;
  pointer-events: none;
  color: #050f18;
  font-size: 2rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.05em;

  span {
    display: inline-block;
    font-size: 0.7em;
    margin-top: -1em;
    margin-left: 0.2em;
    vertical-align: middle;
    letter-spacing: 0;
  }
`;

export const ChartFooter = styled.ul`
  border-top: 0.05rem solid #eceff1;
  margin: 0;
  background: #fcfcfc;

  @media (max-width: ${breakpoints.sm}px) {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    padding: 1rem 1.5rem;
    list-style: inside;
    list-style-type: none;
    display: inline-block;
    min-width: 8rem;

    @media (max-width: ${breakpoints.sm}px) {
      min-width: 0;
      width: 50%;
      padding: 1rem 1.5rem;

      + li {
        margin-left: 0;
      }
    }

    label,
    span {
      display: block;
    }

    label {
      font-weight: 400;
      color: #6f8597;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    span {
      color: #050f18;
      font-size: 1rem;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.05em;

      span {
        display: inline-block;
        font-size: 0.7em;
        margin-top: -1em;
        margin-left: 0.2em;
        vertical-align: middle;
        letter-spacing: 0;
      }
    }
  }
`;
