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
    @eventClick="eventClick"
    @dateClick="handleDateClick"
  />
</template>
<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "Calendar",
  props: ["sources"],
  components: {
    FullCalendar
  },
  methods: {
    handleDateClick: function(arg) {
      this.$emit("dateClick", arg);
    },
    eventClick(event) {
      this.$emit('eventClick', event)
    }
  },
  data() {
    return {
      calendarWeekends: true,
      eventSources: this.sources,
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin]
    };
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

