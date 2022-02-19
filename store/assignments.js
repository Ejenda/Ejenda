export const state = () => ({
  subjects: [],
});

export const mutations = {
  setSubjects(store, data) {
    store.subjects = data;
  },
  setNewAssignment(store, { subject, assignment }) {
    let index = store.subjects.findIndex((value) => {
      return value.id == subject;
    });
    store.subjects[index].assignments.push(assignment);
  },
  removeAssignment(store, { subject, id }) {
    let subjectIndex = store.subjects.findIndex((value) => {
      return value.id == subject;
    });

    let assignments = store.subjects[subjectIndex].assignments;
    let index = assignments.findIndex((item) => {
      return item.id === id;
    });
    assignments.splice(index, 1);
  },
  setAssignment(store, { subject, assignment }) {

    let subjectIndex = store.subjects.findIndex((value) => {
      return value.id == subject;
    });
    let assignmentIndex = store.subjects[subjectIndex].assignments.findIndex(
      (item) => {
        return item.id == assignment.id;
      }
    );
    store.subjects[subjectIndex].assignments[assignmentIndex].name =
      assignment.name;
    store.subjects[subjectIndex].assignments[assignmentIndex].date =
      assignment.date;
    store.subjects[subjectIndex].assignments[assignmentIndex].tags =
      assignment.tags;
  },
};
export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch("loadData");
  },
  async addAssignment({ commit, dispatch }, { subject, assignment }) {
    await this.$auth.fetch(`${process.env.backendURL}/assignments/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignment),
    });
    commit("setNewAssignment", { subject: subject.id, assignment });
  },

  async editAssignment({ commit, dispatch }, { subject, assignment }) {
    commit("setAssignment", { subject: subject.id, assignment });
    await this.$auth.fetch(`${process.env.backendURL}/assignments/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newAssignment: assignment,
        id: assignment.id,
      }),
    });
  },
  async deleteAssignment({ commit }, { subject, id }) {
    commit("removeAssignment", { subject: subject.id, id });
    await this.$auth.fetch(`${process.env.backendURL}/assignments/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  },
  async loadData({ commit, dispatch }) {
    let generateSubject = (name, color, assignments) => {
      let migratedAssignments = assignments.map((item) => {
        let editing = item;
        editing.tags = item.tags ? item.tags : [];
        return editing;
      });
      return {
        name: name,
        id: name.toLowerCase(),
        color: color,
        assignments: migratedAssignments,
        importing: [],
      };
    };

    return new Promise(async (resolve, reject) => {
      let subjects = await (
        await this.$auth.fetch(`${process.env.backendURL}/subjects`, {
          method: "GET",
          headers: {
            pragma: "no-cache",
            "cache-control": "no-cache",
          },
        })
      ).json();
      let built = [];
      for (let subject of subjects) {
        let assignments = await (
          await this.$auth.fetch(
            `${process.env.backendURL}/assignments/${subject[0].toLowerCase()}`
          )
        ).json();
        built.push(generateSubject(subject[0], subject[1], assignments));
      }
      commit("setSubjects", built);
      resolve(built);
    });
  },
};
