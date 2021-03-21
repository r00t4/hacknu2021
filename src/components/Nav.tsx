import { FaSearch } from 'react-icons/fa';
import { CgCrown } from 'react-icons/cg';
import { BsPerson } from 'react-icons/bs';

import Button from './Button';
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

import styled from 'styled-components';

var Cont = styled.div`
  background-color: var(--light-background);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 0;
  height: 52px;
  padding: 5px;
  font-size: 14px;
`;

var Menu1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;

  ul {
    padding: 0 12px;
    li {
      list-style-type: none;
      display: inline-block;
      padding: 0 12px;
      cursor: pointer;

      a {
        :hover {
          color: #a970ff;
        }
      }
    }
  }
`;
var MENU3 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex: 1;

  div {
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: #29292b;
    width: 90%;

    label[for='search'] {
      position: absolute;
      top: -2000px;
    }

    input {
      height: 34px;
      width: 90%;
      background-color: #191944;
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
      padding: 1rem;
      color: var(--text);

      ::placeholder {
        color: #bababb;
      }
    }

    svg {
      margin: 0 8px;
      fill: #5a5a5c;
    }
  }
`;
var MENU2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;

  svg {
    fill: #fff;
  }
`;



////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
const Header: React.FC = () => {
return (
  <Cont>
  <Menu1>
  <ul>
  <li>
  <a href="#">Browse</a>
  </li>
  <li>...</li>
  </ul>
  </Menu1>
  <MENU3>
  <div>
  <input id="search" type="text" placeholder="Search" />



  <label aria-label="search" htmlFor="search">
                Search
  </label>
  <FaSearch size={16} />
  </div>
  </MENU3>

  <MENU2>
  <CgCrown size={24} />


                     <Button buttonType="secondary">Log In</Button>
                     <Button buttonType="primary">Sign Up</Button>
  <BsPerson size={24} color="#fafafa" />
  </MENU2>
  </Cont>
);
};

export default Header;
