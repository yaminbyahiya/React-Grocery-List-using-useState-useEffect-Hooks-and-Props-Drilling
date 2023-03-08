/* import logo from './logo.svg'; */
// import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import SearchItem from './SearchItem';
import { useState } from 'react';
import AddItem from './AddItem';
function App() {
  const [items,setItems] = useState(JSON.parse(localStorage.getItem("shoppinglist")));
  const [newItems,setNewItems]=useState('');
  const [search, setSearch] = useState('');
  const setAndSaveItems = (list) => {
    setItems(list);
    localStorage.setItem('shoppinglist', JSON.stringify(list));
  }
  const addItem = (item) => {
    const id = items.length?item[item.length-1].id+1:1;
    const newItem = {id, checked: false, item};
    const list = [...items, newItem];
    setAndSaveItems(list);
  }
  const handleCheck = (id) => {
    const list = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
    setAndSaveItems(list);
  }
  const handleDelete = (id) => {
    const list = items.filter((item)=>item.id!==id);
    setAndSaveItems(list);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!newItems) return;
    addItem(newItems);
    setNewItems('');
  }
  const name = "yamin";
  return (
    <div className="App">
     {/*  <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello {name}!
        </p>
      </header> */}
      <Header title='Grocery List'></Header>
      <AddItem
      newItems={newItems}
      setNewItems={setNewItems}
      handleSubmit={handleSubmit}
      ></AddItem>
      <SearchItem 
      search={search}
      setSearch={setSearch}
      >
      </SearchItem>
    <Content
    items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
    handleCheck={handleCheck}
    handleDelete={handleDelete}
    ></Content>
    <Footer
    length={items.length}
    ></Footer>
    </div>
  );
}

export default App;
