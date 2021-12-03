import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export class Job {
  name = '';
  priority = 0
}

export interface IOption {
  value: number | string,
  text: string
}

export default new Vuex.Store({
  state: {
    jobs: new Array<Job>(),
    priorityOptions: new Array<IOption>()
  },
  mutations: {
    setJobs(state, payload: []) {
      state.jobs = payload;
    },
    setPriorityOptions(state) {
      state.priorityOptions = [
        { value: 0, text: 'Regular'},
        { value: 1, text: 'Trivial'},
        { value: 2, text: 'Urgent' }
      ]
    }
  },
  actions: {
    async init({ commit }) {
      commit('setPriorityOptions');
      axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://rise-technology-server.herokuapp.com' : 'http://localhost:5000' 
    },
    async getJobs({ commit }) {
      const localItems = window.localStorage.getItem('jobList');
      let items: Job[] = [];
      if(localItems !== null) {
        items = JSON.parse(localItems);
      } else {
        const { data } = await axios.get('/jobs');
        if(data) {
          items = data;
        }
      }

      commit('setJobs', items);
    },
    async create({ state, commit, dispatch }, payload: Job) {
      const items = state.jobs;

      items.push(payload);

      commit('setJobs', items);
      dispatch('saveChanges');
    },
    async delete({ state, commit, dispatch }, payload: Job) {
      const items = state.jobs.filter((j: Job) => {
        return j.name !== payload.name
      });

      commit('setJobs', items);
      dispatch('saveChanges');
    },
    async update({ state, commit, dispatch }, payload: Job) {
      const items = state.jobs;

      const findedItem = items.find((i) => i.name === payload.name);
      if(findedItem) {
        findedItem.priority = payload.priority;
      }

      commit('setJobs', items);
      dispatch('saveChanges');
    },
    async saveChanges({ state }) {
      const items = state.jobs;

      if(window.localStorage) {
        window.localStorage.setItem('jobList', JSON.stringify(items));
      }
    }
  },
  modules: {
  }
})
