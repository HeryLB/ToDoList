import Alert from './alert.js';

export default class Modal {
  constructor() {
    this.title = document.getElementById('modal-title');
    this.description = document.getElementById('modal-description');
    this.btn = document.getElementById('modal-btn');
    this.completed = document.getElementById('modal-completed');
    this.priority = document.getElementById('modal-priority');
    this.alert = new Alert('modal-alert');

    this.todo = null;
  }

  setValues(todo) {
    this.todo = todo;
    this.title.value = todo.title;
    this.description.value = todo.description;
    this.completed.checked = todo.completed;
    this.priority.value = todo.priority;
  }

  onClick(callback) {
    this.btn.onclick = () => {
      if (!this.title.value || !this.description.value) {
        this.alert.show('Se necesita un Titulo y una Descripcion');
        return;
      }
  
      $('#modal').modal('toggle');
  
      callback(this.todo.id, {
        title: this.title.value,
        description: this.description.value,
        completed: this.completed.checked,
        priority: this.priority.value // Nuevo: Incluir prioridad
      });
    }
  }
  
}