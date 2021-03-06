import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    position: absolute;
    width: 160px;
    background: #ff9000;
    color: #312e38;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;

    left: 50%;
    transform: translateX(-50%);
    bottom: calc(100% + 12px);

    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    &::before {
      content: '';
      position: absolute;
      border-color: #ff9000 transparent;
      border-style: solid;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
