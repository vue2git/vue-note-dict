<template>
    <li class="todo" :class="{ completed: todo.done, editing: editing }">
        <div class="view">
            <input class="toggle"
                   type="checkbox"
                   :checked="todo.done"
                   @change="toggleHeat({ todo, heat })">
            <label
                    :class="{['toggle-view-wrap']:true, [awesomeFontPrefix+'heart']:true, hot:!todo.done, cold:todo.done}"

                    v-text="todo.text"
                    @dblclick="editing = true"
            ></label>
            <button class="destroy" @click="deleteTodo({ todo: todo })"></button>
        </div>
        <input class="edit"
               v-show="editing"
               v-focus="editing"
               :value="todo.text"
               @keyup.enter="doneEdit"
               @keyup.esc="cancelEdit"
               @blur="doneEdit">
    </li>
</template>

<script>
    import {mapMutations, mapActions, mapState} from 'vuex'

    export default {
        name: 'Todo',
        props: ['todo'],
        data() {
            return {
                editing: false,
            }
        },
        computed: {
            ...mapState([
                'kinds',
                'heat',
                'msgType',
                'awesomeFontPrefix',
            ])
        },
        directives: {
            focus(el, {value}, {context}) {
                if (value) {
                    context.$nextTick(() => {
                        el.focus()
                    })
                }
            }
        },
        methods: {
            ...mapActions([
                'editTodo',
                'toggleTodo',
                'toggleHeat',
                'deleteTodo'
            ]),
            doneEdit(e) {
                console.log(this, '60===', 'Todo.vue');
                const value = e.target.value.trim()
                const {todo} = this;
                if (!value) {
                    this.deleteTodo({
                        todo
                    })
                } else if (this.editing) {
                    console.log(todo, '68, Todo.vue');
                    this.editTodo({
                        todo,
                        value
                    })
                    this.editing = false
                }
            },
            cancelEdit(e) {
                e.target.value = this.todo.text
                this.editing = false
            }
        }
    }
</script>
