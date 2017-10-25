export const STORAGE_KEY = 'todos-vuejs';

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
    window.localStorage.clear()
}

import kinds from './kinds.js';
console.log(kinds, '9========');

export const state = {
    itemName: 'Item',
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
    visibility: 'hot',
    allHeat: null,
    kinds: kinds,
    msgType: 'init',
    awesomeFontPrefix: 'fa fa-',
    heats: ['hot', 'cold'],
};

/*
per kind look like this:
{
    flag: 0,
    type: 'strExample',
    iconStyleSuffix: '',
    iconStyleSuffix1: 'strIconStyle',
    iconStyleSuffix2: 'strIconStyle2',
    text: 'strKindnessWord',
}
 */

const heats = ['hot', 'cold'];

export const mutations = {

    tip(state, viewFilter) {
        console.log(state.visibility, '38, mutations.js, this is state.visibility .');
        console.log(viewFilter, '25=====****');
        var checkedTypeType = Object.prototype.toString.call(viewFilter);
        if (checkedTypeType !== "[object String]") {
            console.dir(checkedTypeType);
            console.error('above line is checkedTypeType. message arguments wa passed in must be a String, but others got: ' + checkedTypeType);
        }
        console.log(state.kinds, '38---');
        state.msgType = viewFilter;
        var kind = state.kinds[viewFilter];
        console.log(kind, '41===');
        if(typeof kind.flag == null){
            kind.flag = 0;
        }
        if(viewFilter === 'toggleHeat' || viewFilter === 'toggleTodo' || viewFilter === 'toggleAll') {
            kind.flag = !kind.flag;
        }
        kind.iconStyleSuffix = kind['iconStyleSuffix' + Number(kind.flag)];
        console.log(kind.iconStyleSuffix, '33---');
        console.log(state.visibility, '56, mutations.js, this is state.visibility .');
    },


    viewFilterVisibility(state, {newVisibility}){
        console.log(newVisibility, '59, mutations.js, this is newVisibilityVisibility function got argument newVisibility value: ');
        console.dir(newVisibility);
        state.visibility = newVisibility;
        console.log('62, mutations.js, this is newVisibilityVisibility output state.visibility: ');
        console.dir(state.visibility);
    },

    addTodo(state, {text}) {
        console.log(text, '62, addTodo function executed, passed in text argument is: ' + text);
        console.log(state.todos, '63, mutations.js, state.todos is: ');
        console.dir(state.todos);
        state.todos.push({
            text,
            heat: heats[0],
            done: false,
        });
    },

    allView(state, {todos}) {

    },

    hotView(state, {todos}) {

    },

    coldView(state, {todos}) {

    },

    deleteTodo(state, {todo}) {
        state.todos.splice(state.todos.indexOf(todo), 1);
    },


    hotTodo(state, {todo}) {
        console.log(todo, '70, mutations.js, this is todo, which wass passed in.');
        todo.heat = 'hot';
    },

    coldTodo(state, {todo}) {
        todo.heat = 'cold';
    },
    toggleHeat(state, {heat}) {
        console.error(`toggleHeat mutation was executed, but it must be deprecated; You must call the hotHeat mutation;`);
    },
    //
    // toggleTodo(state, {todo}) {
    //     todo.done = !todo.done;
    // },

    editTodo(state, {todo, value}) {
        console.log(todo, value, '55====');
        todo.text = value;
    },

    editTodo(state, {todo, value}) {
        console.log(todo, value, '55====');
        todo.text = value;
    },

    toggleAll(state, {allSelected}) {
        state.todos.forEach((todo) => {
            todo.heat = allSelected ? 'hot' : 'cold';
        });
    },

    clearCompleted(state) {
        state.todos = state.todos.filter(todo => !todo.done)
    }
};
