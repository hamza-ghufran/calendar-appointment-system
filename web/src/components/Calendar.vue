<template>
  <FullCalendar
    class="demo-app-calendar"
    ref="fullCalendar"
    :event-sources="eventSources"
    defaultView="dayGridMonth"
    :header="{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    }"
    :selectable="true"
    :editable="true"
    :plugins="calendarPlugins"
    :weekends="calendarWeekends"
    @dateClick="handleDateClick"
  />
</template>
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";

export default {
  name: "Calendar",
  props: ["events"],
  components: {
    FullCalendar
  },
  methods: {
    handleDateClick: function(arg) {
      function isSlot(event) {
        return event.name === "slots";
      }

      if (this.$refs.fullCalendar.eventSources.find(isSlot)) {
        this.$refs.fullCalendar.eventSources.pop();
      }
      let new_slot = sources.slots;
      new_slot.extraParams.date = arg.dateStr;
      this.$refs.fullCalendar.eventSources.push(new_slot);
    },
    refreshEvents() {}
  },
  data() {
    return {
      calendarWeekends: true,
      eventSources: [sources.events],
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin]
    };
  }
};

var sources = {
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
    extraParams: {
      date: "2020-06-11"
    },
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



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.red {
  background: rgb(235, 77, 77) !important;
  color: whitesmoke !important;
}
.blue {
  background: rgb(59, 59, 163) !important;
  color: whitesmoke !important;
}
.orange {
  background: orange !important;
  color: white !important;
}
.green {
  background: rgb(49, 155, 49) !important;
  color: white !important;
}
.blue,
.orange,
.red,
.green {
  font-size: 13px;
  font-weight: 500;
  text-transform: capitalize;
}
.event-item {
  padding: 2px 0 2px 4px !important;
}
.demo-app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-top {
  margin: 0 0 3em;
}

.demo-app-calendar {
  margin: 0 auto;
  max-width: 900px;
}
</style>

