<template>
  <div id="app">
    <div class="main">
      <div class="calendar-holder">
        <calendar
          v-bind:sources="sources"
          @dateClick="handleDateClick"
          @eventClick="handleEventClick"
        />
      </div>
      <div class="form-holder">
        <h3>Set Duration</h3>
        <duration-form @input="handleDuration" />
        <h3>Schedule an event</h3>
        <event-form v-bind:selected_event="selected_event" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Calendar from "./components/Calendar.vue";
import EventForm from "./components/EventForm.vue";
import DurationForm from "./components/DurationForm.vue";

export default {
  name: "app",
  components: {
    Calendar,
    EventForm,
    DurationForm
  },
  methods: {
    handleDuration(value) {
      this.duration = value;
    },
    handleDateClick(arg) {
      function isSlot(event) {
        return event.name === "slots";
      }

      if (this.sources.find(isSlot)) {
        this.sources.pop();
      }
      let new_slot = api.slots;
      new_slot.extraParams.date = arg.dateStr;
      new_slot.extraParams.duration = this.duration;
      this.sources.push(new_slot);
    },
    handleEventClick(event) {
      this.selected_event = event.event;
    }
  },
  data() {
    return {
      sources: [api.events],
      duration: 0,
      selected_event: {}
    };
  }
};

var api = {
  events: {
    id: 1,
    url: "http://localhost:3002/event/list",
    method: "POST",
    extraParams: {
      start_date: "2020-01-09T00:00:00Z",
      end_date: "2020-12-09T00:00:00Z"
    },
    success: function(res) {
      let events = res.data;

      return events.map(event => {
        return {
          title: event.title,
          start: moment(
            event.date + " " + event.time,
            "YYYY-MM-DD HH:mm"
          ).format("YYYY-MM-DD HH:mm"),
          description: event.subject
        };
      });
    }
  },
  slots: {
    name: "slots",
    url: "http://localhost:3002/slot/list",
    method: "POST",
    extraParams: {},
    color: "green",
    success: function(res) {
      let free_slots = res.data.free_slots;
      let date = res.data.date;

      return free_slots.map(slot => {
        return {
          title: "Free",
          start: moment(date + " " + slot, "YYYY-MM-DD HH:mm").format(
            "YYYY-MM-DD HH:mm"
          )
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