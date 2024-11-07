import AddTodo from './components/add-todo.js'; 
import Modal from './components/modal.js';
import Filters from './components/filters.js';

export default class View {
  constructor() {
    this.model = null;
    this.table = document.getElementById('table');
    this.addTodoForm = new AddTodo();
    this.modal = new Modal();
    this.filters = new Filters();
    

    this.addTodoForm.onClick((title, description, priority) => this.addTodo(title, description, priority));
    this.modal.onClick((id, values) => this.editTodo(id, values));
    this.filters.onClick((filters) => this.filter(filters));
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const todos = this.model.getTodos();
    todos.forEach((todo) => this.createRow(todo));
  }

  filter(filters) {
    const { type, words, priority } = filters;
    const [, ...rows] = this.table.getElementsByTagName('tr');
    for (const row of rows) {
      const [title, description, prio, completed] = row.children;
      let shouldHide = false;

      if (words) {
        shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
      }

      if (priority && prio.innerText.toLowerCase() !== priority.toLowerCase() && priority !== '') {
        shouldHide = true;
      }

      const shouldBeCompleted = type === 'completed';
      const isCompleted = completed.children[0].checked;

      if (type !== 'all' && shouldBeCompleted !== isCompleted) {
        shouldHide = true;
      }

      if (shouldHide) {
        row.classList.add('d-none');
      } else {
        row.classList.remove('d-none');
      }
    }
  }

  addTodo(title, description, priority) {
    const todo = this.model.addTodo(title, description, priority);
    this.createRow(todo);
  }

  toggleCompleted(id) {
    this.model.toggleCompleted(id);
  }

  editTodo(id, values) {
    this.model.editTodo(id, values);
    const row = document.getElementById(id);
    row.children[0].innerText = values.title;
    row.children[1].innerText = values.description;
    row.children[2].innerText = values.priority;
    row.children[3].children[0].checked = values.completed;
  }

  removeTodo(id) {
    this.model.removeTodo(id);
    document.getElementById(id).remove();
  }

  createRow(todo) {
    const row = table.insertRow();
    row.setAttribute('id', todo.id);
    row.innerHTML = `
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td>${todo.priority}</td>  <!-- Mostrar prioridad -->
      <td class="text-center">
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      </td>
      <td class="text-right">
        <button class="btn btn-primary mb-1"><i class="fa fa-pencil"></i></button>
        <button class="btn btn-danger mb-1 ml-1"><i class="fa fa-trash"></i></button>
      </td>
    `;

    // Botón de editar
    const editBtn = row.children[4].children[0];
    editBtn.onclick = () => this.modal.setValues({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      completed: todo.completed,
    });

    // Botón de eliminar
    const removeBtn = row.children[4].children[1];
    removeBtn.onclick = () => this.removeTodo(todo.id);

    // Checkbox para marcar como completado
    const checkbox = row.children[3].children[0];
    checkbox.onclick = () => this.toggleCompleted(todo.id);
  }
}