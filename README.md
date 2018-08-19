## 1. 프로젝트 준비

### 1. create-react-app '프로젝트 명'
### 2. npm start
### 3. HTTP Client – axios 설치
AJAX 작업을 하기 위해 HTTP Client를 설치해주어야 한다. Jquery를 사용하는 서비스에서는 이게 그 역할을 하므로 별도로 HTTP Client를 설치할 필요는 없지만 오직 AJAX 기능만 필요한 경우에는 이에 특화된 자바스크립트 라이브러리를 설치하면 된다.
* axios, fetch, superagent, request 등. (fetch는 웹브라우저에 탑재되어 있는 기능으로, 하위 브라우저에 적용하려면 github에서 'polyfill'을 적용해야 한다)
### 4. Semantic-UI 설치
  npm install --save semantic-ui-react semantic-ui-css
Semantic-UI 의 엘리먼트들이 모두 React 컴포넌트들로 구성되고, jQuery를 사용하지 않는다.

## 2. Component 구성

### 1. src/components, containers, App.js, index.js(+index.css)로 구성
### 2. semantic-ui를 src/index.js에 import
  import 'semantic-ui-css/semantic.min.css';
* 주의, index.css가 이 코드보다 아래에 있어야(나중에 호출되어야) 함
### 3. 첫 컴포넌트 'Header' 선언하고 styled-component 형식으로 꾸미기. 
  src/components 폴더에 Header 폴더를 만들고 여기에 Header.js 파일을 생성한 뒤
  함수형으로 컴포넌트 생성. styled-component도 설치해주자.
  yarn add styled-componets

  이후, 

    import React from 'react';
  // import './Header.css';
  import styled from 'styled-components';
  const _Header = styled.div`
      background-color: #00B5AD;
      color: white;
      font-size: 2rem;
      padding: 1.2rem;
      text-align: center;
      font-weight: 600;
      margin-bottom: 2rem;
      `

      const Header = () => (
          <_Header>
              POSTS
          </_Header>
      )
      
      export default Header;

### 4. component 폴더에다 index.js 파일 생성
이 폴더 내부 모든 컴포넌트들을 한 번에 export 할 수 있도록 하기 위함이다.
이 폴더 내부의 모든 component들을 import한 뒤 export해준다.
  import Header from './Header/Header';

  export {
      Header
  };

### 5. PostWrapper 컴포넌트 생성
1. 컴포넌트 안에 PostWrapper 폴더 만들기
2. PostWrapper 폴더 안에 PostWrapper.js 파일 만들기
3. PostWrapper 컴포넌트 생성.

  import React from 'react';
  import styled from 'styled-components';
  const _PostWrapper = styled.div`
      width: 50rem;
      margin: 0 auto;

      @media (max-width: 768px){
          width: 90%;  
      }
      `;

      const PostWrapper = ({children}) => (
          <_PostWrapper>
              {children}
          </_PostWrapper>
      )
      
      export default PostWrapper;

### 6. 똑똑한 컴포넌트, PostContainer 만들기
1. Container 폴더 안에 PostContainer 폴더 만들기
2. PostContainer 폴더 안에 PostContainer 파일 만들기
3. Container/PostContainer/PostContainer.js
  import React, {Component} from 'react';
  import { PostWrapper } from '../../components';

  class PostContainer extends Component {
      render() {
          return (
              <PostWrapper>
                  Hello, Post
              </PostWrapper>
          );
      }
  }

  export default PostContainer;

### 7. 이후. 같은 방법으로 Navigator, Post, CommentList, Comment Component 생성

## 3. AJAX 구현
