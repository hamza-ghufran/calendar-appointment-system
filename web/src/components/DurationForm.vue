<template>
  <form>
    <div class="input-holder">
      <input type="number" @input="handleChange" placeholder="Duration" v-model="event.duration" />
    </div>
  </form>
</template>


<script>
import moment from "moment";

export default {
  name: "EventForm",
  data() {
    return {
      event: {
        duration: ""
      }
    };
  },
  methods: {
    handleChange() {
      this.$emit('input', event.target.value)
    }
  },
  components: {}
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
