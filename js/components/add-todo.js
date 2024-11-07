import Alert from './alert.js';
// add-todo.js
export default class AddTodo {
    constructor() {
      this.btn = document.getElementById('add');
      this.title = document.getElementById('title');
      this.description = document.getElementById('description');
      this.priority = document.getElementById('priority');  // Selección de prioridad
      this.alert = new Alert('alert');
    }
  
    onClick(callback) {
      this.btn.onclick = () => {
        if (this.title.value === '' || this.description.value === '') {
          this.alert.show('Title and description are required');
        } else {
          this.alert.hide();
          callback(this.title.value, this.description.value, this.priority.value);  // Pasar la prioridad
        }
      }
    }
  }
  
  
