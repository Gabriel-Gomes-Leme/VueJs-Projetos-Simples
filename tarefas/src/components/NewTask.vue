<template>
  <div class="new-task">
    <input v-model="name" type="text" class="form-element" @keydown.enter="adicionarTask" />
    <button class="form-element" @click="adicionarTask">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    adicionarTask() {
      this.$emit("taskAdd", { name: this.name });
      this.name = "";
    },
  },
};
</script>

<style>
.new-task {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 5px 0 20px;
}
.form-element {
  box-sizing: border-box;
  padding: 10px 8px;
  border: none;
  font-size: 1rem;
  border-bottom: 1px solid black;
  color: white;
}
input.form-element {
  width: 400px;
  text-indent: 10px;
  background-color: rgba(0, 0, 0, 0.3);
}
button.form-element {
  width: 40px;
  cursor: pointer;
  background-color: seagreen;
  font-weight: bolder;
  transform: scale(1, 1);
  transition: all 0.2s ease-in;
}
button.form-element:hover {
  transform: scale(0.9);
}
</style>