<template>
  <div id="app">
    <h1>Tarefas</h1>
    <new-task @taskAdd="addTask" />
    <progress-task :progress="progress" />
    <task-grid :tasks="tasks" @taskDeleted="deleteTask" @taskStateChanged="toggleStateChange" />
  </div>
</template>

<script>
import TaskGrid from "./components/TaskGrid.vue";
import NewTask from "./components/NewTask.vue";
import ProgressTask from "./components/ProgressTask.vue";
export default {
  components: {
    ProgressTask,
    TaskGrid,
    NewTask,
  },
  data() {
    return {
      tasks: [
        { name: "Estudar VueJs", pending: true },
        { name: "Lavar Louça", pending: false },
      ],
    };
  },
  computed: {
    progress() {
      const total = this.tasks.length;
      const done = this.tasks.filter((t) => !t.pending).length; // pega o tamanho do array, ou seja, as tarefas que não estão pendentes
      return Math.round((done / total) * 100) || 0; // se der valor inválido, retorna 0
    },
  },
  watch: {
    tasks: {
      deep: true, // o watch faz uma verificação profunda, verificando se houve mudança no estado de cada tarefa
      handler() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks)); //pega a lista de tasks, converte para string Json e seta no local storage
      },
    },
  },
  methods: {
    addTask(task) {
      const sameName = (t) => t.name === task.name;
      const reallyNew = this.tasks.filter(sameName).length == 0; // verifica se possui tasks com o mesmo nome, caso verdade, não irá incluir um elemento novo
      if (reallyNew) {
        this.tasks.push({
          name: task.name,
          pending: task.pending || true,
        });
      }
    },
    deleteTask(i) {
      // no splice recebe o índice que quer excluir e quantos elementos quer excluir apartir do índice.
      this.tasks.splice(i, 1);
    },
    toggleStateChange(i) {
      this.tasks[i].pending = !this.tasks[i].pending;
    },
  },
  created() {
    //utiliza o método de ciclo de vida para quando criar o componente, carregar a lista de itens do local storage
    const json = localStorage.getItem("tasks");
    const array = JSON.parse(json);
    if (Array.isArray(array)) {
      this.tasks = array;
    } else {
      this.tasks = [];
    }
  },
};
</script>

<style>
body {
  font-family: "Lato", sans-serif;
  background: linear-gradient(to right, rgb(98, 0, 128), rgb(97, 11, 155));
  color: #fff;
}

#app {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#app h1 {
  margin-bottom: 5px;
  font-weight: 300;
  font-size: 3rem;
}
</style>
