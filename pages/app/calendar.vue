<script setup>
import { ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const { data: assignmentData, isPending } = queryAssignments()
let events = computed(() => {
    console.log(assignmentData.value)
  if (!assignmentData.value) return []
  let event=  assignmentData.value.flatMap(course => 
    course.assignments.map(assignment => ({
      id: assignment.id,
      title: assignment.title,
      start: new Date(assignment.due),
      allDay: true
    }))
  )
  console.log(event)
    return event;
})
const calendarOptions = ref({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  initialView: 'dayGridMonth',
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  initialEvents: events.value,

})
watch(assignmentData, (value) => {
  if (value) {
    calendarOptions.value.events = events.value;
    
  }
})



function handleWeekendsToggle() {
  calendarOptions.value.weekends = !calendarOptions.value.weekends
}



function handleEvents(events) {
  events.value = events
}
</script>

<template>
    <AppTabs/>
  <div class='demo-app'>

    <div class='demo-app-main'>
      <FullCalendar
        v-if="!isPending"
        class='demo-app-calendar'
        :options='calendarOptions'
      >
        <template #eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
/* The CSS remains the same as in the original component */
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  max-width: 1100px;
  margin: 0 auto;
}
</style>
