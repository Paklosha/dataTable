<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <h1>Выберите набор данных</h1>
        <footer class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn-green"
              @click="
                loadSmallData(
                  'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
                )
              "
            >
              Маленький
            </button>
            <button
              type="button"
              class="btn-green"
              @click="
                loadBigData(
                  'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
                )
              "
            >
              Большой
            </button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data: () => ({}),
  methods: {
    loadSmallData(url) {
      this.$emit("loadSmallData", url);
    },
    loadBigData(url) {
      this.$emit("loadBigData", url);
    },
  },
};
</script>

<style scoped>
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ddaf94;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  padding: 20px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
.modal-header,
.modal-footer {
  padding: 10px;
  text-align: center;
}
.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}
.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #000;
  background: transparent;
  text-align: right;
}
.btn-green {
  text-align: center;
  width: 160px;
  background-color: #ffffff;
  border: none;
  outline: none;
  padding: 10px 30px;
  border-radius: 25px;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  color: #000000;
  border: dashed 2px #000000;
  transition: 200ms;
}
.btn-green:hover {
  background-color: #92a8d1;
}
.btn-green:nth-child(1) {
  margin-right: 10px;
}
.input {
  margin-top: 5px;
}
.added-text {
  margin-block-end: -10px;
  margin-block-start: 0.5rem;
}
</style>
