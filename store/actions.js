export const actions = {

    viewFilterVisibility(context, {newVisibility, viewFilter}) {
        console.dir(newVisibility);
        context.commit('viewFilterVisibility', {newVisibility});
        console.log('7, action.js, this is viewFilter was passed in from App.vue render: ');
        console.dir(viewFilter);
        context.commit('tip', viewFilter);
    },

    addTodo(context, writing) {
        let text = writing.value;
        if (text.trim) {
            text = text.trim();
        }
        context.commit('addTodo', {text});
        writing.value = '';
        context.commit('tip', 'addTodo');
    },

    deleteTodo(context, {text}) {
        context.commit('deleteTodo', {text});
        context.commit('tip', 'deleteTodo');
    },

    toggleTodo(context, {todo}) {
        console.error(`toggleTodo action was executed, but it must be deprecated;`);
        if (todo.heat === 'hot') {
            context.commit('hotTodo', {todo});
        } else if (todo.heat === 'cold') {
            context.commit('coldTodo', {todo});
        } else {
            console.error(`toggleTodo action was executed, but it must be deprecated;`);
        }
        context.commit('tip', 'toggleTodo');
    },

    toggleHeat(context, { todo, heat}) {
        console.log(context.state, '36------');
        console.log(context.state['itemName'], '37------');
        if (todo.heat === 'hot') {
            console.log('39, actions.js, toggleHeat step "hot";');
            context.commit('coldTodo', {todo});
        } else if (todo.heat === 'cold') {
            console.log('42, actions.js, toggleHeat step "cold";');
            context.commit('hotTodo', {todo});
        } else {
            console.error(`todo.heat must be "hot" or "cold" got wrong value: ${todo.heat.toString()}`);
        }
        context.commit('tip', todo.heat + 'Item');
    },

    editTodo(context, {todo, value}) {
        console.log(todo, '19, actions.js');
        context.commit('editTodo', {todo, value});
        context.commit('tip', 'editTodo');
    },

    toggleAll(context, {allSelected}) {
        context.commit('toggleAll', {allSelected});
        context.commit('tip', 'toggleAll');
    },

    clearCompleted(context) {
        context.commit('clearCompleted');
        context.commit('tip', 'clearCompleted');
    },

};