<style src="./index.css"></style>

<template>
    <section class="todoapp">
        <!-- header -->

        <!-- main section -->
        <section class="main" v-show="todos.length">
            <!--input header, label for #toggle-all and #toggle-all checkbox;-->
            <header class="header">
                <!--<h1>Note</h1>-->
                <input class="new-todo"
                       ref="writing"
                       autofocus
                       autocomplete="off"
                       placeholder="可以在这里填入文本"
                       @keyup.enter="addTodo(getValue())"
                >
                <label
                        :class="{[awesomeFontPrefix+'toggle-off']:!allChecked, [awesomeFontPrefix+'toggle-on']:allChecked}"
                        id="toggle-all-icon"
                        style="position:relative; top:-48px; left:0;"
                        for="toggle-all"
                >
                </label>
            </header>
            <input class="toggle-all" id="toggle-all"
                   type="checkbox"
                   :checked="allChecked"
                   @change="toggleAll({ allSelected: allChecked })"
            >

            <!--handle-option-bar-->
            <p id="handle-option-bar">

            </p>
            <!--list-area, also called todolist-->
            <ul overflow-y="hidden" class="todo-list">
                <todo
                        v-for="(todo, index) in filteredTodos"
                        :key="index"
                        :todo="todo"
                        :heat="heat"
                ></todo>
            </ul>
        </section>
        <!-- footer -->
        <footer id="notefooter" class="footer" v-show="todos.length">
            <ul class="filters">
                <li v-for="(val, key) in viewFilters">
                    <a :href="'#/' + key"
                       :class="{ selected: visibility === key }"
                       @click="viewFilterVisibility({newVisibility: val.id, viewFilter: key})"
                    >
                        {{ kinds[key].alias }}
                        {{ heats[val.id] }}
                    </a>
                </li>
                <li>
                    <button style="" class="clear-completed"
                            v-show="todos.length > remaining"
                            @click="clearCompleted">
                        清除
                    </button>
                </li>
            </ul>
            <div class="bar">
                <span class="msg">
                    <i :class="'fa fa-' + kinds[msgType].iconStyleSuffix"></i>
                    {{ kinds[msgType].kindness }}
                </span>
            </div>
        </footer>
    </section>
</template>

<script>
    import {mapMutations, mapActions, mapState} from 'vuex'
    import Todo from './Todo.vue'
    import initKinds from '../store/kinds.js'

    let {viewAll, viewHot, viewCold} = initKinds;

    const viewFilters = {
        viewAll,
        viewHot,
        viewCold,
    };

    export default {
        mounted() {
            setInterval(() => {
                console.log(this.visibility, '86, this is the visibiltiy, look if it was wrong.');
            }, 1000)
    } ,
    components: {
        Todo
    }
    ,
    data()
    {
        return {
            message: 'I am good sticky note',
            viewFilters: viewFilters,
            toggleIconDegree: 0,
            toggleIconTop: -58,
            toggleIconDown: {
                allHeat: 'allHot',
                top: -48,
                rotate: 90,
            },
            toggleIconRight: {
                allHeat: 'allCold',
                top: -38,
                rotate: 0,
            },
            toggleIconPos: {
                allHeat: 'allHhot',
                top: -48,
                rotate: 90,
            },
            allLen: 0,
            hotLen: 0,
            coldLen: 0,
        }
    }
    ,
    computed: {
    ...
        mapState([
            'visibility',
            'kinds',
            'heat',
            'allHeat',
            'msgType',
            'awesomeFontPrefix',
        ]),
            todos()
        {
            return this.$store.state.todos
        }
    ,
        allChecked()
        {
            return this.todos.every(todo => todo.heat === 'cold');
        }
    ,
        filteredTodos()
        {
            console.log('this is _vm instance defined in App.vue: ');
            console.dir(this);
            // return 'look _vm instance defined in App.vue, in the console.'
            // return filters[_vm.visibility](this.todos).reverse();
            console.log('this is this.visibility: ');
            console.dir(this.visibility);
            let filteredTodos =  this.todos.filter((i) => {
                if(this.visibility === 'all'){
                    return true;
                }else{
                    return i.heat === this.visibility;
                }
            });
            return filteredTodos.reverse();
        }
    ,
        remaining()
        {
            return this.todos.filter(todo => !todo.done).length
        }
    ,
        heats()
        {
            return {
                all: this.todos.length,
                hot: this.todos.filter(todo => todo.heat === 'hot').length,
                cold: this.todos.filter(todo => todo.heat === 'cold').length,
            }
        }
    }
    ,
    mounted: {
    }
    ,
    methods: {
        toggleIconRotate(ev)
        {
            console.log('toggleIconRotate function executed', '98---');
            var pos = this.toggleIconPos;
            if (pos.top === this.toggleIconRight.top && pos.rotate === this.toggleIconRight.rotate) {
                console.log(109, 'sldfj**************');
                this.toggleIconPos = this.toggleIconDown;
            } else if (pos.top === this.toggleIconDown.top && pos.rotate === this.toggleIconDown.rotate) {
                console.log(112, 'sldfj**************');
                this.toggleIconPos = this.toggleIconRight;
            } else {
                console.error('toggleIconRotate element get wrong values: ' + this.toggleIconPos.top + ', ' + this.toggleIconPos.rotate);
            }
            ev.target.style.transform = 'rotate(' + this.toggleIconPos.rotate + 'deg)';
            ev.target.style.top = this.toggleIconPos.top + 'px';
        }
    ,
        getValue()
        {
            return this.$refs['writing'];
        }
    ,
    ...
        mapActions([
            'viewFilterVisibility',
            'addTodo',
            'toggleAll',
            'clearCompleted'
        ]),
    }
    ,
    watch: {
    }
    ,
    filters: {
        pluralize: (n, w) => n === 1 ? w : (w + 's'),
            capitalize
    :
        s => s.charAt(0).toUpperCase() + s.slice(1),
    }
    }
</script>
