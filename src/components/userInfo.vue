<template>
  <div class="user-info">
    Выбран пользователь
    <b>{{ foundInfo.firstName + " " + foundInfo.lastName }}</b
    ><br /><br />
    Описание:<br /><br />
    <textarea v-model="description"></textarea><br /><br />
    Адрес проживания: <b>{{ foundInfo.address.streetAddress }}</b
    ><br /><br />
    Город: <b>{{ foundInfo.address.city }}</b
    ><br /><br />
    Провинция/штат: <b>{{ foundInfo.address.state }}</b
    ><br /><br />
    Индекс: <b>{{ foundInfo.address.zip }}</b
    ><br /><br />
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["foundInfo"],
  data: () => ({}),
  computed: {
    description() {
      return this.foundInfo.description;
    },
  },
};
</script>

<style scoped>
.user-info {
  width: 30vw;
  margin: auto;
  border: #3c403d 2px solid;
  border-radius: 10px;
  padding: 12px;
}
input[type="text"],
textarea {
  width: 30vw;
  height: 300px;
  padding: 0;
  border: 1px solid #ccc;
}
</style>
