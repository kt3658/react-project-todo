
import React, {useEffect, useState} from 'react';

import './App.css';

function App() {
  
  const idData = [1,2,3,4,5,6,7,8,9,10
  ];

  
  // Todoリストのstateを定義
  const [todos, setTodos] = useState([]);
  
  // 新規Todoのstateを定義
  const [todoTitle, setTodoTitle] = useState('');
  
  // 新しく作成するtodoに持たせるidをstateで管理
  const [todoIds, setTodoIds] = useState(idData);
  
  // 編集画面に切り替えるためのstateを定義
  const [isEditable, setIsEditable] = useState(false);
  
  // 編集したいtodoのidの状態を定義
  const [editId, setEditId] = useState('');
  
  // 新しいタイトルのstateを定義
  const[newTitle, setNewTitle] = useState('');

  const[newDate, setNewDate] = useState('');

  // フィルターのstateを定義
  const[filter, setFilter] = useState('notStarted');

  const[filterId, setFilterId] = useState("すべて");

  const[filterDate, setFilterDate] = useState("すべて");

  // 絞り込まれたtodoリストのstateを定義
  const[filteredTodos, setFilteredTodos] = useState([]);
  
  // input入力時にstateが更新される処理
  const handleAddFormChanges = (e) => {setTodoTitle(e.target.value)};
  
  // 期限の更新
  const handleDateChanges = (e) => {setNewDate(e.target.value)};

  // ボタンを押すと新しいtodoがtodoリストに追加される
  const handleAddTodo = () => {
    setTodos([...todos, {id: todoIds,title: todoTitle,date: newDate, status: 'notStarted'}]);
    setTodoIds(todoIds + 1);
    setTodoTitle('');
    setNewDate('');
  };
  
  // 対象のtodoをリストから削除
  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo  !== targetTodo))
  };
  
  // 編集画面に切り替わる
  const handleOpenEditForm = (todo) => {
    setIsEditable(true);
    // idのstateを更新
    setEditId(todo.id);
    // 編集対象のtodoタイトルをinputに表示
    setNewTitle(todo.title);
  };
  
  // 通常画面に切り替わる
  const handleCloseEditForm = () => {
    setIsEditable(false);
    setEditId('');
  };
  
  // 編集用inputの入力値に応じてstateを更新
  const handleEditFormChange = (e) => {setNewTitle(e.target.value)};
  
  // 編集内容をtodoリストの配列に加える
  const handleEditTodo = () => {
    const newArray = todos.map((todo) => todo.id === editId  ? { ...todo,
    title: newTitle} : todo
    )
    setTodos(newArray);
    setNewTitle('');
    setEditId();
    handleCloseEditForm();
  };
    // 対象のtodoのステータスを更新した、新しいTodoリストの配列を作成
    const handleStatusChange = (targetTodo, e) => {
      const newArray = todos.map((todo) => todo.id === targetTodo.id  ? { ...todo,
        status: e.target.value} : todo
        )
        setTodos(newArray);
    };

    useEffect(() => {
      const filteringTodos = () => {
        switch (filter) {
          case 'notStarted':
            setFilteredTodos(todos.filter((todo) => todo.status === 'notStarted'));
            break;
          
          case 'inProgress':
            setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'));
            break;
          case 'done':
            setFilteredTodos(todos.filter((todo) => todo.status === 'done'));
            break;
          
          default:
            setFilteredTodos(todos);
        };
      };
      filteringTodos();
    },[filter, todos]);

    useEffect(() => {
      const newIds = todoIds.filter((todoId) => {
        return (
          todoIds.indexOf(todos) !== -1 
        );
      });
      setFilterId(newIds); //変更
    }, [todos]);
  
    
    

  return (
    <>
     {/* タイトル */}
    <div>
      <p>Todo-List</p>
    </div>
    
    {isEditable ? (
  
      <>
      <div>
        <input type="text" label="新しいタイトル" placeholder="Todoを編集" value={newTitle} onChange={handleEditFormChange}/>
        <button onClick={handleEditTodo}>編集を保存</button>
        <button onClick={handleCloseEditForm}>キャンセル</button>
      </div>
      </>
      
      ) : (

      <>
      <div>
        {/* 新規todoのstateとinputの表示を紐付け,inputへの入力時にtodoのstateを更新 */}
        <input type="text" label="タイトル" placeholder="Todoを入力" value={todoTitle} onChange={handleAddFormChanges}/>
        {/* 追加ボタンを押すと、関数が実行される */}
        <button onClick={handleAddTodo}>追加</button>
        <label>期限: <input type="date" onChange={handleDateChanges}/></label>
        <select onChange={(e) =>setFilterId(e.target.value)}>
          <option value="idAll">ID:すべて</option>
          
          
        </select>
        <select>
          <option value="dateAll">期限:すべて</option>
        </select>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">すべて</option>
          <option value="notStarted">未着手</option>
          <option value="inProgress">作業中</option>
          <option value="done">完了</option>
        </select>
      </div>
      </>
      )}
      {/* 状態 */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span>ID:{todo.id + 1} </span>
            <span>期限:{todo.date}</span>
            <span>{todo.title}</span>
            <select value={todo.status} onChange={(e) =>handleStatusChange(todo, e)}>
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <button onClick={() =>handleOpenEditForm(todo)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>

          
        ))}
      </ul>
    </>
  )
  
}

export default App;
