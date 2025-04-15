import styled from 'styled-components'

export const ImageContainer = styled.div`
  width: 320px;
  height: 320px;
  margin: 0 auto;
  border: 1px solid #93c5fd; /* blue-300 */
  background-color: #bfdbfe; /* blue-200 */
  margin-top: 2rem; /* 8 * 0.25rem = 2rem */
`;

export const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
`;
