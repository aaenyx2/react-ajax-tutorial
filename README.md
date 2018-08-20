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

### 1. axios 사용법 익히기

* Get 요청

  axios.get('/user?ID=12345')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

* POST 요청

  axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

* 요청에 옵션을 설정 할 때

    // Optionally the request above could also be done as
  axios.get('/user', {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

* 메소드타입을 옵션으로 지정

  // Send a POST request
  axios({
    method: 'post',
    url: '/user/12345',
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  });

* Response 형식

  {
  // `data` 는 서버에서 반환한 데이터입니다. 
  data: {},

  // `status` 는 서버에서 반환한 HTTP 상태입니다
  status: 200,

  // `statusText` 는 HTTP 상태 메시지입니다
  statusText: 'OK',

  // `headers` 는 서버에서 반환한 헤더값입니다
  headers: {},

  // `config` 는 axios 요청시 전달했던 설정값입니다
  config: {}
  }


### 2. API 함수 모듈화 하기

1. axios를 요청하는 함수를 따로 만들어서 src/services 디렉토리에 저장
2. src/services/post.js 파일에 아래 코드를 작성
  import axios from 'axios';

  export function getPost(postId) {
      return axios.get('https://jsonplaceholder.typicode.com/posts/' + postId);
  }

  export function getComments(postId) {
      return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
}

3. 문자열 안에 변수를 넣고 싶을 땐, 문자열을 ``로 감싸고 ${...} 꼴을 통해 변수를   호출한다

4. 똑똑한 컴포넌트인 PostContainer에다가, 해당 포스트들의 덧글을 불러오는 fetchPostInfo 메소드를 생성하자.

다음 코드는 아까 작성한 post.js 에서 export 한 함수를 모두 불러와서 service 안에 담습니다.

  import * as service from '../../services/post';

  fetchPostInfo = async (postId) => {
        const post = await service.getPost(postId);
        console.log(post);
        const comments = await service.getComments(postId);
        console.log(comments);
    }

5. async-await

비동기 작업을 마치 동기 작업을 하듯이 코드를 작성 할 수 있게 해줌. 여기서 await 키워드는 Promise 를 기다려주는 역할. 이 키워드를 사용하는 함수는 다음과 같이 함수를 선언 할 때 async 키워드가 함수 앞에 붙어있어야 함.

* await 키워드로 Promise 를 기다린다
* 함수앞에 async 키워드를 붙여준다
* 에러 처리는 try-catch 로 한다
* async 함수의 반환값은 Promise 형태이다

5. 4에서 만든 fecthPostInfo는 첫 번째 요청을 기다린 다음에 두 번째 요청을 기다린다. 비효율적. 두 요청을 한 꺼번에 진행하고 둘 다 기다리면 안 될까?

여러 개의 Promise를 한꺼번에 처리할 땐 Promise.all([promise 1, promise 2, ...]) 를 이용한다.

  fetchPostInfo = async (postId) => {
      const info = await Promise.all([
          service.getPost(postId),
          service.getComments(postId)
      ]);
      
      console.log(info);
  }

6. 전달받은 데이터를 똑똑한 컴포넌트의 state에 넣어주자.

  constructor(props) {
        super();
        // initializes component state
        this.state = {
            postId: 1,
            fetching: false, // tells whether the request is waiting for response or not
            post: {
                title: null,
                body: null
            },
            comments: []
        };
    }

* postId 값은 현재 포스트의 번호, fetching 은 요청의 완료 여부

7. fetchPostInfo 함수에 setState를 적용시키자.

  this.setState({
              fetching: true // requesting..
          });

          // wait for two promises
          const info = await Promise.all([
              service.getPost(postId),
              service.getComments(postId)
          ]);
          
          // Object destructuring Syntax,
          // takes out required values and create references to them
          const {title, body} = info[0].data; 
                                              
          const comments = info[1].data;

          this.setState({
              postId,
              post: {
                  title, 
                  body
              },
              comments,
              fetching: false // done!
          });

8. 하위 컴포넌트에 prop 전달
  // (...)

  class PostContainer extends Component {

      // (...)

      render() {
          const {postId, fetching, post, comments} = this.state;

          return (
              <PostWrapper>
                  <Navigate 
                      postId={postId}
                      disabled={fetching}
                  />
                  <Post
                      title={post.title}
                      body={post.body}
                      comments={comments}
                  />
              </PostWrapper>
          );
      }
  }

  export default PostContainer;

9. 하위 컴포넌트들이, 전달받은 prop을 출력할 수 있도록 컴포넌트 수정

* post 컴포넌트

  import React from 'react';
  import './Post.css';
  import { CommentList } from '../';

  const Post = ({title, body, comments}) => (
      <div className="Post">
          <h1>{title}</h1>
          <p>
              {body}
          </p>
          <CommentList comments={comments}/>
      </div>
  );

  export default Post;

* CommentList 컴포넌트

  import React from 'react';
  import {Comment} from '../';

  import './CommentList.css';

  const CommentList = ({comments}) => {

      // map data to components
      const commentList = comments.map(
          (comment, index)=>(
              <Comment 
                  name={comment.name}
                  body={comment.body} 
                  key={index}
              />
          ) // 주의. map에서 component를 함수로 반환할 땐 {} 말고 ()로 감싸야 한다.
      );

      return (
          <ul className="CommentList">
              {commentList}
          </ul>
      );
  };

  export default CommentList;

* Comment 컴포넌트

  import React from 'react';
  import './Comment.css';

  const Comment = ({name, body}) => {
      return (
          <li className="Comment">
              <p>
                  <b>{name}</b> {body}
              </p>
          </li>
      );
  };

  export default Comment;

## 6. Navigate 기능 구현

### 1. handelNavigateClick 함수 만들기

  // (...)

  class PostContainer extends Component {

      // (...)

      handleNavigateClick = (type) => {
          const postId = this.state.postId;

          if(type === 'NEXT') {
              this.fetchPostInfo(postId+1);
          } else {
              this.fetchPostInfo(postId-1);
          }
      }

      // (...)
  }

  export default PostContainer;

### 2. Navigate 컴포넌트 onClick 설정

// (...)

class PostContainer extends Component {

  // (...)

      render() {
          const {postId, fetching, post, comments} = this.state;

          return (
              <PostWrapper>
                  <Navigate 
                      postId={postId}
                      disabled={fetching}
                      onClick={this.handleNavigateClick}
                  />
                  <Post
                      title={post.title}
                      body={post.body}
                      comments={comments}
                  />
              </PostWrapper>
          );
      }
  }

  export default PostContainer;

### 3. postId = 0 일 때 error 나는 것을 처리
fecthPostInfo를 try-catch 문으로 감싸준다.

    fetchPostInfo = async (postId) => {
          this.setState({
              fetching: true // requesting..
          });

          try {// wait for two promises
              const info = await Promise.all([
                  service.getPost(postId),
                  service.getComments(postId)
              ]);
              
              // Object destructuring Syntax,
              // takes out required values and create references to them
              const {title, body} = info[0].data; 
                                                  
              const comments = info[1].data;

              this.setState({
                  postId,
                  post: {
                      title, 
                      body
                  },
                  comments,
                  fetching: false // done!
              });
          } catch (e) {
              this.setState({
                  fetching: false
              });
              console.log('error occurred', e);
          }
      }

## 7. Warning 컴포넌트 만들기

Notify.js를 사용해 경고 메시지를 띄워도 되지만 이번엔 직접 만들어보자.

*  http://anicollection.github.io/#/

이 사이트에서 이미 만들어진 애니메이션 css들을 사용할 수 있다.

### 1. src/Animation.css에 다운받은 css를 붙여넣은 뒤 src/index.js에다 불러오자.

### 2. Warning 컴포넌트 생성

기본틀 만들기

  import React, {Component} from 'react';
  import "./Warning.css";

  class Warning extends Component {
      render() {
          const { message, visible } = this.props;

          return (
              <div className="Warning-wrapper">
                  <div className="Warning animated bounceIn">
                      {message}
                  </div>
              </div>
          );
      }
  }

  export default Warning;

컴포넌트 스타일링

  .Warning-wrapper {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
  }
  .Warning {
      white-space: nowrap;
      font-size: 1.5rem;
      padding-top: 2rem;
      padding-bottom: 2rem;
      padding-left: 2rem;
      padding-right: 2rem;
      background-color: rgba(0,0,0,0.8);
      border-radius: 5px;
      color: white;
      font-weight: 600;
  }

Warning-wrapper 를 따로 만든 이유: 애니메이션 CSS 코드에서 transform 을 사용하는데, 만약에 Warning 클래스와 함께 fadeIn 을 넣어주면, 기존의 가운데 정렬을 도와주는 transform 이 풀리기 때문에, 가운데 정렬은 Warning-wrapper 에서 하고 애니메이션은 Warning 클래스에서 하게 한 것.

### 3. Warning의 가시성 설정

1. PostContainer 기본 state 수정

  // (...)

  class PostContainer extends Component {

      constructor(props) {
          super();
          // initializes component state
          this.state = {
              postId: 1,
              fetching: false, // tells whether the request is waiting for response or not
              post: {
                  title: null,
                  body: null
              },
              comments: [],
              warningVisibility: false
          };
      }

      // (...)
  }

  export default PostContainer;

2. showWarning 메소드 작성, 에러발생시 호출

  // (...)
  class PostContainer extends Component {

      // (...)
      
      showWarning = () => {
          this.setState({
              warningVisibility: true
          });

          // after 1.5 sec

          setTimeout(
              () => {
                  this.setState({
                      warningVisibility: false
                  });
              }, 1500 
          );
      } // warning Visibility를 true로 만들었다가 1.5초 뒤 다시 false로 바꿔주는 함수
      
      fetchPostInfo = async (postId) => {
          this.setState({
              fetching: true // requesting..
          });

          try {
              // (...)

          } catch(e) {
              this.setState({
                  fetching: false
              });
              this.showWarning();
          }
      }

      // (...)
  }

  export default PostContainer;

3. Warning 컴포넌트에 상태 전달

  // (...)

  class PostContainer extends Component {

      // (...)

      render() {
          const {postId, fetching, post, comments, warningVisibility} = this.state;

          return (
              <PostWrapper>
                  { /* (...) */ }
                  <Warning visible={warningVisibility} message="That post does not exist"/>
              </PostWrapper>
          );
      }
  }

  export default PostContainer;

4. Warning 컴포넌트 수정

  import React, {Component} from 'react';
  import "./Warning.css";

  class Warning extends Component {
      constructor(props) {
          super(props);
          this.state = {
              closing: false // 생산자에 props 전달하고 state도 false로 만들어줌
          };
      }

      componentWillReceiveProps (nextProps) {
          if(this.props.visible && !nextProps.visible) {
          // visible props is changing from true -> false
            
            this.setState({
                closing: true
            });

            // 1 sec after
            setTimeout(
                () => {
                    this.setState({
                        closing: false
                    });
                }, 1000
            );
          }
      }
      

      render() {
          const { visible, message } = this.props;
          const { closing } = this.state;

          if(!visible && !closing) return null;
          return (
              <div className="Warning-wrapper">
                  <div className={`Warning ${closing?'bounceOut':'bounceIn'} animated`}>
                      {message}
                  </div>
              </div>
          );
      }
  }

  export default Warning;

만약에 visible 값이 false 일 때 바로 아무것도 렌더링을 하지 않게만 해놓으면 bounceOut 애니메이션을 적용할 수가 없다. 따라서, closing 이라는 state 를 이 component의 생성자에서 만들고, componentWillReceiveProps 단계에서 visible 값이 true 에서 false 로 변환될 때, closing 값을 true 로 설정 하고 1초 후에 (애니메이션이 1초입니다) 다시 false 로 되돌리도록 코드를 작성.

  if(!visible && !closing) return null;
    return (
        <div className="Warning-wrapper">
            <div className={`Warning ${closing?'bounceOut':'bounceIn'} animated`}>
                {message}
            </div>
        </div>
    );
visible도 false고 closing도 flase면 아무런 이벤트도 Warnin은 아무것도 return하지 않지만, 그렇지 않으면 'Warning bounceOut animated' 혹은 'Warning bounceIn animated'가 return된다.

## 8. 포스트 전환 애니메이션도 넣어주기

### 1. AniCollection에서 애니메이션 css 코드 가져오기
AniCollection 에서 bounceInLeft, bounceInRight, bounceOutLeft, bounceOutRight 코드를 가져와서 Animation.css 코드에 붙여넣는다.

### 2. Post Component에 postId 전달 

애니메이션 처리를 Post 컴포넌트 내부에서 할 것이다. 컴포넌트의 바깥에서 애니메이션 효과를 어떤걸 줄지 props 로 전달하는게 아니라, 내용이 바뀜에 따라 컴포넌트의 내부 state 를 사용하여 관리하겠다는 의미. 

애니메이션 방향을 알아내기 위해서 postId 값을 Post 컴포넌트에 전달을 해주어야 한다.

  // (...)

  class PostContainer extends Component {

      // (...)
      render() {
          const {postId, fetching, post, comments, warningVisibility} = this.state;

          return (
              <PostWrapper>
                  <Navigate 
                      postId={postId}
                      disabled={fetching}
                      onClick={this.handleNavigateClick}
                  />
                  <Post
                      postId={postId}
                      title={post.title}
                      body={post.body}
                      comments={comments}
                  />
                  <Warning visible={warningVisibility} message="That post does not exist"/>
              </PostWrapper>
          );
      }
  }

  export default PostContainer;

### 3. Post 컴포넌트 수정

기존의 Post 컴포넌트는 함수형 컴포넌트였지만, 애니메이션을 처리하려면 내부 state 를 사용해야하기에, 클래스형 컴포넌트로 다시 코드를 작성.


  import React, {Component} from 'react';
  import './Post.css';
  import { CommentList } from '../';

  class Post extends Component {
      constructor(props) {
          super(props);
          this.state = {
              postInfo: {
                  title: null,
                  body: null,
                  comments: []
              },
              animate: false,
              direction: 'left'
          }
      }
      

      componentWillReceiveProps (nextProps) {
          
          const { title, body, comments } = nextProps;
          
          if(this.props.postId !== nextProps.postId) {
              // identify the animation direction
              const direction = this.props.postId < nextProps.postId ? 'left' : 'right';
              
              this.setState({
                  direction,
                  animate: true
              });

              // sync the props to state 0.5 sec later
              setTimeout(
                  () => {
                      this.setState({
                          postInfo: {
                              title, body, comments 
                          },
                          animate: false
                      })
                  }, 500
              );
              return;
          }

          // sync the props to state directly (this is the first post)
          this.setState({
              postInfo: {
                  title, body, comments 
              }
          })
      }
      
      render() {
          const { title, body, comments } = this.state.postInfo;

          const { animate, direction } = this.state;
          
          const animation = animate 
                            ? (direction==='left' ? 'bounceOutLeft' : 'bounceOutRight')
                            : (direction==='left' ? 'bounceInRight' : 'bounceInLeft');

          // show nothing when data is not loaded
          if(title===null) return null;

          return (
              <div className={`Post animated ${animation}`}>
                  <h1>{title}</h1>
                  <p>
                      {body}
                  </p>
                  <CommentList comments={comments}/>
              </div>
          );
      }
  }

  export default Post;


## 9. 구형 브라우저 지원하기 

### 1. promise-polyfill 설치
  npm install --save promise-polyfill

### 2. src/index.js 코드에 다음 코드를 삽입

이렇게 코드를 삽입해주면 IE8 에서도 axios 가 문제없이 작동

  // (...)
  import Promise from 'promise-polyfill'; 

  // To add to window
  if (!window.Promise) {
    window.Promise = Promise;
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

## 10. 빌드하고 surge.sh 에 deploy 하기

### 1. npm run build

코드의 파일 사이즈를 축소하기 위해서 코드를 빌드

### 2. surge 글로벌 설치
  npm install -g surge

### 3. build 경로로 이동 후 surge 명령어 입력