import './App.css';
function Header (props){
  console.log('props', props, props.title);
  return (
    <header>
      <h1>
        <a href="/" onClick={(event) => {
          event.preventDefault();
          props.onChangeMode();
          }}>{props.title}</a>
      </h1>
    </header>
  );
}
function Nav (props){
  const lis = []
  // 파라미터가 하나일 경우엔 (event) => {}에서 ()생략가능
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a id={t.id} href={'/read/'+t.id} onClick={event => {
          event.preventDefault();
          props.onChangeMode(event.target.id);
        }}>{t.title} : {t.body}</a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}
function Article (props){
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const topics = [
    { id: 1, title: 'html', body: 'htmi is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' },
  ];
  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        alert('Header');
      }} />
      <Nav topics={topics} onChangeMode={(id) => {
        alert(id);
      }} />
      <Article title="Welcome" body="Hello, WEB" />
    </div>
  );
}

export default App;
