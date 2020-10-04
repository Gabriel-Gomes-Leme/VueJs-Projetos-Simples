<template>
  <div class="tasks-grid">
    <template v-if="tasks.length">
      <Task
        class="task"
        v-for="(task, i) in tasks"
        :key="task.name"
        :task="task"
        @taskStateChanged="$emit('taskStateChanged', i)"
        @taskDeleted="$emit('taskDeleted', i)"
      ></Task>
    </template>
    <h2 class="no-task" v-else>Sua vida está em dia :)</h2>
  </div>
</template>

<script>
import Task from "./Task.vue";
export default {
  components: {
    Task,
  },
  props: {
    tasks: { type: Array, required: true },
  },
};
</script>

<style>
.tasks-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.tasks-grid .task {
  margin: 10px;
}
.no-task {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: aliceblue;
  font-weight: 700;
}
</style>