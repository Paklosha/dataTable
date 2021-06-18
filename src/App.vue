<template>
  <div id="sixthTable">
    <div v-if="isLoader" class="semipolar-spinner">
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
    </div>
    <createRow
      v-show="isCreateRow"
      @addUser="addUser"
      @showCreationModal="showCreationModal"
    />
    <Modal
      v-show="isModalVisible"
      @loadSmallData="loadSmallData"
      @loadBigData="loadBigData"
    />
    <div class="top-toolbar">
      <button
        type="button"
        class="btn-green"
        @click="showCreationModal"
        v-if="!isLoader"
      >
        Добавить
      </button>

      <div class="control">
        <input
          id="search-input"
          v-if="!isLoader"
          class="input"
          type="text"
          v-model="search"
        />
      </div>
      <button
        type="button"
        class="btn-green"
        @click="sortRows"
        v-if="!isLoader"
      >
        Найти
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col" v-on:click="sortTable(col)">
            {{ col }}
            <div
              class="arrow"
              v-if="col == sortColumn"
              v-bind:class="[ascending ? 'arrow_up' : 'arrow_down']"
            ></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in get_rows()" :key="row" @click="getInfo(row)">
          <td v-for="col in columns" :key="col">{{ row[col] }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <div
        class="number"
        v-for="i in num_pages()"
        :key="i"
        v-bind:class="[i == currentPage ? 'active' : '']"
        v-on:click="change_page(i)"
      >
        {{ i }}
      </div>
    </div>
    <Info v-if="isInfo" :foundInfo="foundInfo" />
  </div>
</template>

<script>
import Modal from "./components/selectDataModal.vue";
import createRow from "./components/createRowModal.vue";
import Info from "./components/userInfo.vue";
export default {
  name: "App",
  components: {
    Modal,
    Info,
    createRow,
  },
  data() {
    return {
      isInfo: false,
      isLoader: false,
      isModalVisible: true,
      isCreateRow: false,
      currentPage: 1,
      elementsPerPage: 50,
      ascending: false,
      sortColumn: "",
      rows: [],
      tempRows: [],
      foundInfo: {},
      search: "",
    };
  },
  methods: {
    getInfo(info) {
      let temp = this.tempRows.find((element) => {
        return (
          element.firstName == info.firstName &&
          element.lastName == info.lastName
        );
      });
      this.foundInfo = temp;

      this.isInfo = true;
    },
    loadSmallData(url) {
      this.fetchData(url);
      this.isModalVisible = false;
    },
    loadBigData(url) {
      this.fetchData(url);
      this.isModalVisible = false;
      this.isLoader = true;
    },
    showCreationModal() {
      this.isCreateRow = !this.isCreateRow;
    },
    addUser(user) {
      this.tempRows.unshift({
        ...user,
        address: {
          streetAddress: "not specified",
          city: "not specified",
          state: "not specified",
          zip: "not specified",
        },
        description: "not specified",
      });
      this.isCreateRow = !this.isCreateRow;
    },
    sortTable: function sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }
      var ascending = this.ascending;
      this.tempRows.sort(function (a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1;
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1;
        }
        return 0;
      });
    },
    sortRows: function sortRows() {
      this.tempRows = this.rows.filter((i) => {
        return [i.id, i.firstName, i.lastName, i.email, i.phone]
          .join(" ")
          .includes(this.search);
      });
    },
    num_pages: function num_pages() {
      return Math.ceil(this.tempRows.length / this.elementsPerPage);
    },
    get_rows: function get_rows() {
      var start = (this.currentPage - 1) * this.elementsPerPage;
      var end = start + this.elementsPerPage;
      return this.tempRows.slice(start, end);
    },
    change_page: function change_page(page) {
      this.currentPage = page;
    },
    async fetchData(url) {
      // GET request using fetch with error handling
      await fetch(url)
        .then(async (response) => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          this.rows = data;
          this.tempRows = data;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
      this.isLoader = false;
    }
  },
  computed: {
    columns: function columns() {
      if (this.tempRows.length == 0) {
        return [];
      }
      return ["id", "firstName", "lastName", "email", "phone"];
    }
  }
};
</script>

<style>
table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  min-width: 30px;
}
table th:hover {
  background: #717699;
}
table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}

table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  min-width: 30px;
}
table th:hover {
  background: #717699;
}
table td:hover {
  cursor: pointer;
}
table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}

.pagination {
  font-family: "Open Sans", sans-serif;
  text-align: right;
  width: 750px;
  padding: 8px;
  margin-bottom: 50px;
}

.arrow_down {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAvlJREFUSA29Vk1PGlEUHQaiiewslpUJiyYs2yb9AyRuJGm7c0VJoFXSX9A0sSZN04ULF12YEBQDhMCuSZOm1FhTiLY2Rky0QPlQBLRUsICoIN/0PCsGyox26NC3eTNn3r3n3TvnvvsE1PkwGo3yUqkkEQqFgw2Mz7lWqwng7ztN06mxsTEv8U0Aam5u7r5EInkplUol/f391wAJCc7nEAgE9Uwmkzo4OPiJMa1Wq6cFs7Ozt0H6RqlUDmJXfPIx+qrX69Ti4mIyHA5r6Wq1egND+j+IyW6QAUoul18XiUTDNHaSyGazKcZtdgk8wqhUKh9o/OMvsVgsfHJy0iWqVrcQNRUMBnd6enqc9MjISAmRP3e73T9al3XnbWNjIw2+KY1Gc3imsNHR0YV4PP5+d3e32h3K316TySQFoX2WyWR2glzIO5fLTSD6IElLNwbqnFpbWyO/96lCoai0cZjN5kfYQAYi5H34fL6cxWIZbya9iJyAhULBHAqFVlMpfsV/fHxMeb3er+Vy+VUzeduzwWC45XA4dlD/vEXvdDrj8DvURsYEWK3WF4FA4JQP9mg0WrHZbEYmnpa0NxYgPVObm5teiLABdTQT8a6vrwdRWhOcHMzMzCiXlpb2/yV6qDttMpkeshEzRk4Wo/bfoe4X9vb2amzGl+HoXNT29vZqsVi0sK1jJScG+Xx+HGkL4Tew2TPi5zUdQQt9otPpuBk3e0TaHmMDh1zS7/f780S0zX6Yni+NnBj09fUZUfvudDrNZN+GkQbl8Xi8RLRtHzsB9Hr9nfn5+SjSeWUCXC7XPq5kw53wsNogjZNohYXL2EljstvtrAL70/mVaW8Y4OidRO1/gwgbUMvcqGmcDc9aPvD1gnTeQ+0nmaInokRj0nHh+uvIiVOtVvt2a2vLv7Ky0tL3cRTXIcpPAwMDpq6R4/JXE4vFQ5FI5CN+QTaRSFCYc8vLy1l0rge4ARe5kJ/d27kYkLXoy2Jo4C7K8CZOsEBvb+9rlUp1xNXPL7v3IDwxvPD6AAAAAElFTkSuQmCC");
}
.arrow_up {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAwpJREFUSA21Vt1PUmEYP4dvkQ8JFMwtBRocWAkDbiqXrUWXzU1rrTt0bdVqXbb1tbW16C9IBUSmm27cODdneoXjputa6069qwuW6IIBIdLvdaF4OAcOiGeDc87zPs/vd57P96WpFq7p6enbGo1mjKZpeTabjU1MTCRagGnOZHFxcXxtbe1XKpUq7+zslJeXl//Mz8+Hy+Uy3RxSE9qTk5M3otFooVQqgef4Wl9f343FYoEmoISrxuNxFX5f9vb2jhn/PxUKhfLS0tIPfFifUESRUMV8Pv/M6XReRm5rTGQyGeXxeGxYe1ezeBpBOBx2rKysbO7v79d4Wy3Y2Nj4GQqFbgnhaugxwiuGJx99Pp9FLBbXxYTXvTqd7v3MzIy6riIWGxJnMpl7AwMD14xGYyMsSq1WUyQdUqn0eSPlusQIsbGrq+vl4OCgvhFQZd1utyv1en0gEolcqsi47nWJlUrlG5fLZVcoFFy2nDKSDpIWlUoVTCQSEk4lCHmJMZ2GTCbTiMVikfIZ88l7enoos9l8dXt7+z6fDicxSJUokqDX6xXcl2wCROoc0vQCWL3sNfLOSdzR0fHY4XC4tVotl40gmVwup9xuN4OQv+UyqCFGH9rg7SOGYVRcBs3IEG4J0nVnamrqOtvuBDGGgQg9+wHFcVEi4a0LNkbdd6TrPKo8ODc311mteIIYjT/a398/jK+s1jnVM0kXoufCFvq0GuiIGEVgQIhfoygM1QrteEa9dAL7ITiYCt4RMabOK5AyKKzKWtvupLcRciu8D5J0EuDDPyT/Snd39yh6VtY2NhYQSR9G79Ds7OxdskRjEyAufvb7/cPoO5Z6e1+xtVKrq6vfcFzyi/A3ZrPZ3GdNSlwgo5ekE4X2RIQGf2C1WlufFE0GBeGWYQ8YERWLxQtnUVB830MKLZfL9RHir8lkssCn2G751tZWEWe03zTKm15YWPiEiXXTYDB0Ig/t7yd8PRws4EicwWHxO4jHD8/C5HiTTqd1BwcHFozKU89origB+y/kmzgYpgOBQP4fGmUiZmJ+WNgAAAAASUVORK5CYII=");
}
.arrow {
  float: right;
  width: 12px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
}

.number {
  display: inline-block;
  padding: 4px 10px;
  color: #fff;
  border-radius: 4px;
  background: #44475c;
  margin: 0px 5px;
  cursor: pointer;
}
.number:hover,
.number.active {
  background: #717699;
}

.semipolar-spinner,
.semipolar-spinner * {
  box-sizing: border-box;
  margin: auto;
  margin-top: 10vw;
}

.semipolar-spinner {
  height: 65px;
  width: 65px;
  position: relative;
}

.semipolar-spinner .ring {
  border-radius: 50%;
  position: absolute;
  border: calc(65px * 0.05) solid transparent;
  border-top-color: #ff1d5e;
  border-left-color: #ff1d5e;
  animation: semipolar-spinner-animation 2s infinite;
}

.semipolar-spinner .ring:nth-child(1) {
  height: calc(65px - 65px * 0.2 * 0);
  width: calc(65px - 65px * 0.2 * 0);
  top: calc(65px * 0.1 * 0);
  left: calc(65px * 0.1 * 0);
  animation-delay: calc(2000ms * 0.1 * 4);
  z-index: 5;
}

.semipolar-spinner .ring:nth-child(2) {
  height: calc(65px - 65px * 0.2 * 1);
  width: calc(65px - 65px * 0.2 * 1);
  top: calc(65px * 0.1 * 1);
  left: calc(65px * 0.1 * 1);
  animation-delay: calc(2000ms * 0.1 * 3);
  z-index: 4;
}

.semipolar-spinner .ring:nth-child(3) {
  height: calc(65px - 65px * 0.2 * 2);
  width: calc(65px - 65px * 0.2 * 2);
  top: calc(65px * 0.1 * 2);
  left: calc(65px * 0.1 * 2);
  animation-delay: calc(2000ms * 0.1 * 2);
  z-index: 3;
}

.semipolar-spinner .ring:nth-child(4) {
  height: calc(65px - 65px * 0.2 * 3);
  width: calc(65px - 65px * 0.2 * 3);
  top: calc(65px * 0.1 * 3);
  left: calc(65px * 0.1 * 3);
  animation-delay: calc(2000ms * 0.1 * 1);
  z-index: 2;
}

.semipolar-spinner .ring:nth-child(5) {
  height: calc(65px - 65px * 0.2 * 4);
  width: calc(65px - 65px * 0.2 * 4);
  top: calc(65px * 0.1 * 4);
  left: calc(65px * 0.1 * 4);
  animation-delay: calc(2000ms * 0.1 * 0);
  z-index: 1;
}

@keyframes semipolar-spinner-animation {
  50% {
    transform: rotate(360deg) scale(0.7);
  }
}

.top-toolbar {
  display: flex;
  flex-direction: row;
}

.top-toolbar .btn-green:nth-child(1) {
  margin-right: 265px;
}

#search-input {
  margin-right: 20px;
}
</style>
