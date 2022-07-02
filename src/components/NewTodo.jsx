import React from 'react';

export const NewTodo = (props) => {
  const { filteredTodos,handleStatusChange,handleOpenEditForm,handleDeleteTodo} = props;
  return(
  <div className="todo-area">
      <ul>
        {filteredTodos.map((todo) => (
          <li className="list-row" key={todo.id}>
            <span className="id-text">ID:{todo.id} </span>
            <span className="title-text">{todo.title}</span>
            <span className="date-text">期限:{todo.date}</span>
            <select
              className="status-box"
              value={todo.status}
              onChange={(e) => handleStatusChange(todo, e)}
            >
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <button className="edit-button" onClick={() => handleOpenEditForm(todo)}>編集</button>
            <button className="delete-button" onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}