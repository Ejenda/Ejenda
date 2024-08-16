<script setup>
import { ref, computed } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const { data: assignmentData, isPending } = queryAssignments();
let events = computed(() => {
  if (!assignmentData.value) return [];
  let event = assignmentData.value.flatMap((course) =>
    course.assignments.map((assignment) => ({
      id: assignment.id,
      title: assignment.title,
      start: new Date(assignment.due),
      allDay: true,
    }))
  );
  console.log(event);
  return event;
});
const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  initialEvents: events.value,
  headerToolbar: false,
});
watch(assignmentData, (value) => {
  if (value) {
    calendarOptions.value.events = events.value;
  }
});

function handleWeekendsToggle() {
  calendarOptions.value.weekends = !calendarOptions.value.weekends;
}

function handleEvents(events) {
  events.value = events;
}
const fullCalendar = ref(null);

const next = () => {
  const calendarApi = fullCalendar.value.getApi();
  calendarApi.next();
};
const prev = () => {
  const calendarApi = fullCalendar.value.getApi();
  calendarApi.prev();
};
</script>

<template>
  <UContainer class="flex flex-col">
    <AppTabs />

    <div class="flex gap-2 justify-between my-2">
      <UButton @click="prev">Prev</UButton>
      <UButton @click="next">Next</UButton>
    </div>

    <div class="demo-app-main">
      <FullCalendar
        ref="fullCalendar"
        v-if="!isPending"
        class="demo-app-calendar"
        :options="calendarOptions"
      >
        <template #eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
      <p v-else>Loading...</p>
    </div>
  </UContainer>
</template>
