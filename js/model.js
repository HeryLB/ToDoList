export default class Model{
    constructor(){
        this.view = null;
        this.todos= [];
    }

    setView(view){
        this.view = view;
    }

    getTodos(){
        return this.todos;
    }

    addTodo(title, description){
        const todo = {
            id: 0,
            title: title,
            description: description,
            completed: false,
        }
        this.todos.push(todo);
        console.log(this.todos);

        return todo;
    }
}