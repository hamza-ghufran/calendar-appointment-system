<template>
  <div id="app">
    <div class="main">
      <div class="calendar-holder">
        <calendar />
      </div>
      <div class="form-holder">
        <h3>Schedule an event</h3>
        <event-form />
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "./components/Calendar.vue";
import EventForm from "./components/EventForm.vue";

export default {
  name: "app",
  components: {
    Calendar,
    EventForm
  },
  data() {
    return {
      events: [
        {
          title: "event1",
          start: "2020-06-09",
          cssClass: "blue",
          YOUR_DATA: {}
        }
      ]
    };
  },
  created() {
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  display: flex;
  align-items: center;
}
.calendar-holder {
  width: 65%;
}
.form-holder {
  width: 35%;
}

.form-holder > h3 {
  color: rgb(18, 96, 241);
  text-transform: none;
  font-size: 16px;
  text-align: left;
  margin-left: 30px;
  margin-bottom: 10px;
}
</style>