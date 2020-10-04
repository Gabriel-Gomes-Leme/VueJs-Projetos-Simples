<template>
  <div @click="$emit('taskStateChanged', task)" class="task" :class="stateClass">
    <span @click.stop="$emit('taskDeleted', task)" class="close">X</span>
    <!-- stop serve para não interferir com outro click -->
    <h3>{{task.name}}</h3>
  </div>
</template>

<script>
export default {
  props: {
    task: { type: Object, required: true },
  },
  computed: {
    stateClass() {
      return {
        pending: this.task.pending,
        done: !this.task.pending,
      };
    },
  },
};
</script>

<style>
.task {
  width: 200px;
  position: relative;
  height: 100px;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  border-top-left-radius: 25px;
  cursor: pointer;
  transition: all 0.1s ease-out;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pending {
  background-color: rgb(190, 58, 58);
  box-shadow: 5px 4px 4px 3px rgb(41, 2, 2);
}
.done {
  background-color: seagreen;
  box-shadow: 5px 4px 4px 3px rgb(0, 36, 14);
  text-decoration: line-through;
}
.task:hover {
  box-shadow: 2px 2px 2px rgb(41, 2, 2);
}
.task h3 {
  line-height: 100px;
}
.close {
  position: absolute;
  top: 4px;
  right: 4px;
  border: none;
  background-color: white;
  color: darkred;
  border-radius: 100%;
  padding: 3px 6px;
  font-weight: bolder;
}
.close:hover {
  background-color: darkred;
  color: white;
}
</style>