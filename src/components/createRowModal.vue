<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <form ref="form">
          <div class="field">
            <label class="label">ID</label>
            <div class="control">
              <input class="input" type="text" v-model="user.id" />
            </div>
            <label class="failure" v-if="idVal"
              >Поле должно содержать только цифры</label
            >
          </div>
          <div class="field">
            <label class="label">firstName</label>
            <div class="control">
              <input class="input" type="text" v-model="user.firstName" />
            </div>
            <label class="failure" v-if="firstnameVal"
              >Поле должно содержать только буквы</label
            >
          </div>
          <div class="field">
            <label class="label">lastName</label>
            <div class="control">
              <input class="input" type="text" v-model="user.lastName" />
            </div>
            <label class="failure" v-if="lastnameVal"
              >Поле должно содержать только буквы</label
            >
          </div>
          <div class="field">
            <label class="label">email</label>
            <div class="control">
              <input class="input" type="text" v-model="user.email" />
            </div>
            <label class="failure" v-if="emailVal">Почта некорректна</label>
          </div>
          <div class="field">
            <label class="label">phone</label>
            <div class="control">
              <input class="input" type="text" v-model="user.phone" />
            </div>
            <label class="failure" v-if="phoneVal">Телефон некорректен</label>
          </div>
          <footer class="modal-footer">
            <slot name="footer">
              <button
                type="button"
                class="btn-green"
                @click="validate"
                :disabled="filled"
              >
                Добавить в таблицу
              </button>
              <button type="button" class="btn-green" @click="closeModal">
                Отмена
              </button>
            </slot>
          </footer>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "createRow",
  data: () => ({
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    idVal: false,
    firstnameVal: false,
    lastnameVal: false,
    emailVal: false,
    phoneVal: false,
    isBtnActive: true,
  }),
  computed: {
    filled: function () {
      if (
        !(
          this.user.id &&
          this.user.firstName &&
          this.user.lastName &&
          this.user.email &&
          this.user.phone
        )
      ) {
        return true;
      }
      return false;
    },
  },
  methods: {
    closeModal() {
      this.$emit("showCreationModal");
    },
    validate() {
      const validate1 = /^\d+$/.test(String(this.user.id));
      const validate2 = /^[ЁёА-я]|[A-z]+$/.test(String(this.user.firstName));
      const validate3 = /^[ЁёА-я]|[A-z]+$/.test(String(this.user.lastName));
      const validate4 =
        /^[A-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/.test(
          String(this.user.email)
        );
      const validate5 =
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
          String(this.user.phone)
        );
      // if success
      if (validate1 && validate2 && validate3 && validate4 && validate5) {
        this.$emit("addUser", this.user);
        this.user.id = "";
        this.user.firstName = "";
        this.user.lastName = "";
        this.user.email = "";
        this.user.phone = "";
      } else {
        if (!validate1) this.idVal = true;
        else this.idVal = false;
        if (!validate2) this.firstnameVal = true;
        else this.firstnameVal = false;
        if (!validate3) this.lastnameVal = true;
        else this.lastnameVal = false;
        if (!validate4) this.emailVal = true;
        else this.emailVal = false;
        if (!validate5) this.phoneVal = true;
        else this.phoneVal = false;
      }
    },
  },
};
</script>

<style>
.failure {
  color: #ff0000;
}
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

  color: #000000;
  border: dashed 2px #000000;
  transition: 200ms;
}
.btn-green:hover:enabled {
  background-color: #92a8d1;
  cursor: pointer;
}

.btn-green:nth-child(1) {
  margin-right: 10px;
}
.input {
  margin: 10px 0px;
  height: 20px;
}
.added-text {
  margin-block-end: -10px;
  margin-block-start: 0.5rem;
}

button:disabled,
button[disabled] {
  opacity: 0.5;
}
</style>
