<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-holder">
      <input type="text" placeholder="Event title" v-model="event.title" />
    </div>
    <div class="input-holder">
      <date-picker :placeholder="'Date'" v-model="event.date" />
    </div>
    <div class="input-holder">
      <vue-timepicker :placeholder="'Time'" v-model="event.time" format="HH:mm"></vue-timepicker>
    </div>
    <div class="input-holder">
      <textarea type="text" placeholder="Subject" rows="4" v-model="event.subject"></textarea>
    </div>
    <div class="input-holder">
      <button type="submit">Create Event</button>
    </div>
  </form>
</template>


<script>
import moment from "moment";
import DatePicker from "vuejs-datepicker";
import VueTimepicker from "vue2-timepicker";

export default {
  name: "EventForm",
  props: ["selected_event"],
  data() {
    return {
      event: {
        title: "",
        start: "",
        time: "",
        duration: "",
        cssClass: "",
        subject: ""
      }
    };
  },
  methods: {
    async handleSubmit() {
      const date = moment(this.event.date).format("YYYY-MM-DD");
      const event = {
        ...this.event,
        date
      };
      const req = await fetch("http://localhost:3002/event/add", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "content-type": "application/json"
        }
      });
      await req.json();
      this.resetValues();
    },
    resetValues() {
      this.event = {
        title: "",
        start: "",
        time: "00:30",
        end: "",
        duration: "30",
        cssClass: "",
        subject: ""
      };
    }
  },
  components: {
    DatePicker,
    VueTimepicker
  }
};
</script>


<style>
form {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
.input-holder {
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;
}
.vdp-datepicker {
  width: 100%;
}

.vdp-datepicker > div > input {
  width: 77%;
}

.vdp-time-picket {
  width: 100%;
}

.input-holder > button {
  justify-self: center;
  padding: 12px 25px;
  border-radius: 0;
  text-transform: uppercase;
  font-weight: 600;
  background: rgb(18, 96, 241);
  color: white;
  border: none;
  font-size: 14px;
  letter-spacing: -0.1px;
  cursor: pointer;
}

input,
textarea {
  padding: 12px 15px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 0;
  width: 70%;
  opacity: 0.8;
  font-size: 15px;
  font-weight: normal;
}

input:focus,
textarea:focus,
button:focus {
  border: 2px solid rgb(18, 96, 241);
  outline: none;
  box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.2);
}
</style>
