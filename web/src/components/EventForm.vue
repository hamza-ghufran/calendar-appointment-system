<template>
  <form @submit.prevent="handleSubmit">
    <div class="input-holder">
      <input type="text" placeholder="Event title" v-model="event.title" />
    </div>
    <div class="input-holder">
      <date-picker :placeholder="'Date'" v-model="event.date" @input="handleSelectDate" />
    </div>
    <div class="grid">
      <div class="input-select">
        <v-select
          :placeholder="'Duration (min)'"
          :options="duration_list"
          v-model="event.duration"
          @input="handleSelectDuration"
        ></v-select>
      </div>
      <div class="input-select">
        <v-select :placeholder="'Slot'" :options="options" v-model="event.time"></v-select>
      </div>
    </div>
    <div class="input-holder">
      <textarea type="text" placeholder="Subject" rows="4" v-model="event.subject"></textarea>
    </div>
    <div class="input-holder">
      <button :disabled="isDisabled" type="submit">Create Event</button>
    </div>
  </form>
</template>


<script>
import moment from "moment";
import DatePicker from "vuejs-datepicker";
import VueTimepicker from "vue2-timepicker";

export default {
  name: "EventForm",
  props: ["refectEvents"],
  data() {
    return {
      event: {
        title: "",
        start: "",
        time: "",
        duration: "",
        cssClass: "",
        subject: ""
      },
      options: [],
      duration_list: ["10", "20", "30", "40", "50", "60"]
    };
  },
  computed: {
    isDisabled() {
      return !(this.event.time && this.event.duration && this.event.date);
    }
  },
  methods: {
    handleSubmit() {
      const date = moment(this.event.date).format("YYYY-MM-DD");
      const event = {
        ...this.event,
        date
      };
      fetch("http://localhost:3002/event/add", {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "content-type": "application/json"
        }
      }).finally(() => {
        this.$emit("refectEvents");
      });

      this.resetValues();
    },
    handleSelectDuration(arg) {
      const date = moment(this.event.date).format("YYYY-MM-DD");
      const params = {
        date,
        duration: this.event.duration
      };
      fetch("http://localhost:3002/slot/list", {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          let free_slots = res.data.free_slots;
          this.options = free_slots;
        });
    },
    handleSelectDate() {
      this.event.duration = "";
      this.event.time = "";
      this.options = "";
    },
    resetValues() {
      this.event = {
        title: "",
        start: "",
        time: "",
        end: "",
        duration: "",
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

.input-number {
  margin-left: -25px;
  margin-right: 90px;
}

.grid {
  display: inline-flex;
  margin-left: -8px;
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
.input-holder > button:disabled {
  background: rgb(136, 136, 136);
}

.input-select {
  margin: 8px;
  width: 36%;
  color: grey;
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
