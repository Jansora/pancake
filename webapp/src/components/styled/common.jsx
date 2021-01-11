import styled from 'styled-components';

/**
 * <Description> <br>
 *
 * @author zhang.yangyuan (jansora)
 2020/12/06 10:54:33
 */
export const StyledDescription = styled.span`
  color: rgba(1,1,1, 0.33);
  font-size: .85rem;
  height: 20px;
  line-height: 20px;
  //opacity: .9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  display: inline;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

      margin: 0;
`
