<template>
  <div class="section min-h-screen text-center">
    <tabs />
    <h2 class="my-2 text-3xl font-black">Calendar</h2>
    <client-only>
      <v-calendar
        class="custom-calendar max-w-full"
        :masks="masks"
        :attributes="attributes"
        disable-page-swipe
        is-expanded
      >
        <template v-slot:day-content="{ day, attributes }">
          <div class="z-10 flex h-full flex-col overflow-hidden">
            <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
            <div class="flex-grow overflow-x-auto overflow-y-auto">
              <p
                v-for="attr in attributes"
                :key="attr.key"
                class="mt-0 mb-1 rounded-sm p-1 text-xs leading-tight"
                :class="attr.customData.class"
              >
                {{ attr.customData.title }}
              </p>
            </div>
          </div>
        </template>
      </v-calendar>
    </client-only>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  activated() {
    // Call fetch again if last fetch more than 5 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 5000) {
      this.$fetch();
    }
  },

  data() {
    return {
      key: 1,
      masks: {
        weekdays: "WWW",
      },
      subjects: [],
      attributes: [],
    };
  },
  async fetch() {
    var opts = {
      method: "GET",
      headers: {
        pragma: "no-cache",
        "cache-control": "no-cache",
      },
    };

    let subjects = await (
      await this.$auth.fetch(`${process.env.backendURL}/subjects`, opts)
    ).json();
    let built = [];
    this.attributes = [];
    for (let subject of subjects) {
      let assignments = await (
        await this.$auth.fetch(
          `${process.env.backendURL}/assignments/${subject[0].toLowerCase()}`
        )
      ).json();
      let builtSubject = this.generateSubject(
        subject[0],
        subject[1],
        assignments
      );
      built.push(builtSubject);
      let filtered = assignments.filter((item) => {
        return !!item.date;
      });
      let buildingAttributes = filtered.map((item) => {
        let key = this.key;
        this.key++;
        return {
          key: key,
          customData: {
            title: item.name,
            class: this.$color.parseColorBackground(builtSubject.color),
          },
          dates: new Date(item.date),
        };
      });
      console.log(buildingAttributes);
      this.attributes.push(...buildingAttributes);
    }
    this.subjects = [...built];
  },
  methods: {
    generateSubject(name, color, assignments) {
      return {
        name: name,
        id: name.toLowerCase(),
        color: color,
        assignments,
        importing: "",
      };
    },
  },
};
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
.is-today {
  @apply !bg-red-100;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &.is-today {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>

<style></style>
