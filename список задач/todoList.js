async function TodoL() {
  let xhrTodos = new XMLHttpRequest();
  xhrTodos.open('GET', 'https://jsonplaceholder.typicode.com/todos');
  xhrTodos.send();

  xhrTodos.onload = function () {
    let todos = JSON.parse(xhrTodos.response);

    if (Array.isArray(todos) && todos.length > 0) {
      
      let xhrUsers = new XMLHttpRequest();
      xhrUsers.open('GET', 'https://jsonplaceholder.typicode.com/users');
      xhrUsers.send();

      xhrUsers.onload = function () {
        let users = JSON.parse(xhrUsers.response);

        if (Array.isArray(users) && users.length > 0) {
          
          // Заполняет таблицу данными с списка todo
          todos.forEach((todo, index) => {
            // Сравнение user с usedid todo
            let user = users.find(user => user.id === todo.userId);

            // Проверка user
            let userName = user ? user.name : 'Unknown User';

            let row = '<tr>';
            row += '<td>' + (index + 1) + '</td>';
            row += '<td>' + userName + '</td>';
            row += '<td>' + todo.title + '</td>';
            row += '<td><input type="checkbox" ' + (todo.completed ? 'checked' : '') + ' disabled/></td>';
            row += '</tr>';

            $('table tbody').append(row);
          });
        }
      };
    }
  };
}
function clearTodoList() {
  $('table tbody').empty(); 
}