<template>
  <div id="app">
    <div class="main">
      <div class="calendar-holder">
        <calendar v-bind:sources="sources" />
      </div>
      <div class="form-holder">
        <h3>Schedule an event</h3>
        <event-form @refectEvents="refectEvents" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Calendar from "./components/Calendar.vue";
import EventForm from "./components/EventForm.vue";

function addInterval(data) {
  let time_string = moment(data.start).add(data.duration, "minutes");

  return moment(time_string).format("YYYY-MM-DD HH:mm");
}

export default {
  name: "app",
  components: {
    Calendar,
    EventForm
  },
  methods: {
    refectEvents() {
      this.sources.pop();

      let events = api.events;
      events.id = this.id++;
      this.sources.push(events);
    }
  },
  data() {
    return {
      sources: [api.events],
      duration: 0,
      selected_event: {},
      id: 1
    };
  }
};

var api = {
  events: {
    url: "http://localhost:3002/event/list",
    method: "POST",
    extraParams: {
      start_date: "2020-01-09T00:00:00Z",
      end_date: "2020-12-09T00:00:00Z"
    },
    success: function(res) {
      let events = res.data;

      return events.map(event => {
        let start = moment(
          event.date + " " + event.time,
          "YYYY-MM-DD HH:mm"
        ).format("YYYY-MM-DD HH:mm");
        let end = addInterval({ start: start, duration: event.duration });

        return {
          title: event.title,
          start: start,
          end: end,
          description: event.subject
        };
      });
    }
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