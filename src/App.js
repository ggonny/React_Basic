import './App.css';
import { useState } from 'react';

function Header(props) {
  // console.log('props', props, props.title);
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const lis = [];
  // 파라미터가 하나일 경우엔 (event) => {}에서 ()생략가능
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={'/read/' + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props){
  return ( 
    <article>
      <h2>Create</h2>
      <form onSubmit={event =>{
        event.preventDefault();
        // name이 title인 태그의 값 가져오기
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <p><input type='text' name='title' placeholder='title' /></p>
        <p><textarea name='body' placeholder='body'></textarea></p>
        <p><input type='submit' value='Create' /></p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'htmi is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ]);
  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB" />;
  } else if (mode === 'READ') {
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      // console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body} />;
  }else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = { id: nextId, title: _title, body: _body }
      const newTopics = [...topics];
      newTopics.push(newTopic);
      if (_title !== ''){
        setTopics(newTopics);
        setMode('READ');
        setId(nextId);
        setNextId(nextId+1);
      }
    }} />
  }
  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode('WELCOME');
        }}
      />
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode('READ');
          setId(_id);
        }}
      />
      {content}
      <a href='/' onClick={event =>{
        event.preventDefault();
        setMode('CREATE')
      }}>Create</a>
    </div>
  );
}

export default App;
