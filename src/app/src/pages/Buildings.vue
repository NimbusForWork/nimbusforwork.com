<template>
<main id="main">

  <Wizard
    :steps="steps"
    @onChange="(step) => changeCurrentStep(step)"
    @onFinish="() => submit()"
  >

    <div v-show="currentKey === 'intro'">
      <h4 class="title is-4">Custom cleaning with Nimbus</h4>
      <div class="box">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>

    <div v-show="currentKey === 'location'">
      <h4 class="title is-4">Which building is your office in?</h4>
      <div class="box">
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="Filter ..." v-model="buildingFilter">
          </div>
        </div>
      </div>
      <a class="box" v-for="building in filteredBuildings" :key="building.key">
        <h6 class="title is-5">{{building.name}}</h6>
        <h6 class="subtitle">{{building.address}}</h6>
      </a>
    </div>

    <div v-show="currentKey === 'estimate'">
      <h4 class="title is-4">Let's find out how much time you need</h4>
      <div class="box">
        <div class="field">
          <label class="label">How large is your office?</label>
          <div class="control">
            <input class="slider is-fullwidth" step="1" min="0" max="10" v-bind:value="officeSize" type="range">
          </div>
          <div class="has-text-right has-text-grey">
            <span class="title is-2 has-text-grey">{{squareFeet}}</span> square feet
          </div>
        </div>
        <hr />
        <h6 class="title is-6">What do you want done?</h6>
        <div class="field">
          <input class="is-checkradio is-circle" id="exampleCheckbox" type="checkbox" name="exampleCheckbox" checked="checked">
          <label for="exampleCheckbox">Vacumming</label>
        </div>
        <div class="field">
          <input class="is-checkradio is-circle" id="exampleCheckbox" type="checkbox" name="exampleCheckbox" checked="checked">
          <label for="exampleCheckbox">Dusting</label>
        </div>
        <div class="field">
          <input class="is-checkradio is-circle" id="exampleCheckbox" type="checkbox" name="exampleCheckbox" checked="checked">
          <label for="exampleCheckbox">Cleaning tables</label>
        </div>
        <div class="field">
          <input class="is-checkradio is-circle" id="exampleCheckbox" type="checkbox" name="exampleCheckbox" checked="checked">
          <label for="exampleCheckbox">Cleaning meeting rooms</label>
        </div>
        <div class="field">
          <input class="is-checkradio is-circle" id="exampleCheckbox" type="checkbox" name="exampleCheckbox" checked="checked">
          <label for="exampleCheckbox">Trash hauling</label>
        </div>

        <hr />
        <h6 class="title is-6">You probably need...</h6>
        <div class="has-text-right has-text-grey">
          <p><span class="title is-2 has-text-grey">3</span> hours</p>
          <p>Need a custom quote? [Click here]</p>
        </div>

      </div>
    </div>

    <div v-show="currentKey === 'hours'">
      <h4 class="title is-4">What are your preferred hours?</h4>
      <h5 class="title is-6">Morning</h5>
      <div class="columns">
        <div class="column" v-for="hour in morning" :key="hour.start">
          <div class="box p-md">
            <div class="has-text-centered">
              <p class="title is-5">{{hour.start}}</p>
              <div class="is-divider" data-content="TO"></div>
              <p class="title is-5">{{hour.end}}</p>
              <div class="has-text-grey">
                ${{hour.rate}} <small>/ hour</small>
              </div>
            </div>
            <div class="m-t-sm">
              <a class="button is-fullwidth" v-bind:class="{'is-primary': isHourSelected(hour.start)}" @click="toggleHour(hour.start)">Select</a>
            </div >
          </div>
        </div>
      </div>

      <h5 class="title is-6">Afternoon</h5>
      <div class="columns">
        <div class="column" v-for="hour in afternoon" :key="hour.start">
          <div class="box p-md">
            <div class="has-text-centered">
              <p class="title is-5">{{hour.start}}</p>
              <div class="is-divider" data-content="TO"></div>
              <p class="title is-5">{{hour.end}}</p>
              <div class="has-text-grey">
                ${{hour.rate}} <small>/ hour</small>
              </div>
            </div>
            <div class="m-t-sm">
              <a class="button is-fullwidth" v-bind:class="{'is-primary': isHourSelected(hour.start)}" @click="toggleHour(hour.start)">Select</a>
            </div >
          </div>
        </div>
      </div>
    </div>

    <div v-show="currentKey === 'days'">
      <h4 class="title is-4">What days would you like the cleaner to come in?</h4>

      <div class="box">
        <div class="p-sm" v-for="day in days" :key="day">
          <a class="button is-large is-fullwidth is-rounded is-primary is-outlined">{{day}}</a>
        </div>
      </div>
    </div>

  </Wizard>

</main>
</template>

<script>
import Wizard from '../components/Wizard'
export default {
  components: { Wizard },
  data () {
    return {
      currentKey: 'intro',
      steps: [
        {
          key: 'intro',
          label: 'Intro',
          hideNextButton: false,
          userCanSkip: false
        },
        {
          key: 'location',
          label: 'Location',
          hideNextButton: false,
          userCanSkip: false
        },
        {
          key: 'estimate',
          label: 'Estimate',
          hideNextButton: false,
          userCanSkip: false
        },
        {
          key: 'hours',
          label: 'Hours',
          hideNextButton: false,
          userCanSkip: false
        },
        {
          key: 'days',
          label: 'Days',
          hideNextButton: false,
          userCanSkip: false
        },
        {
          key: 'review',
          label: 'Review',
          hideNextButton: false,
          userCanSkip: false
        }
      ],
      buildingFilter: '',
      buildings: [
        { name: 'ARC 380', address: '380 Jln Besar, Singapore 209000' },
        { name: 'Suntec Tower 1', address: 'Temasek Boulevard, #01' },
        { name: 'Suntec Tower 2', address: 'Temasek Boulevard, #02' },
        { name: 'Suntec Tower 3', address: 'Temasek Boulevard, #03' },
        { name: 'Suntec Tower 4', address: 'Temasek Boulevard, #04' },
        { name: 'Suntec Tower 5', address: 'Temasek Boulevard, #05' }
      ],
      officeSize: 2,
      hours: [
        { start: '0700', end: 750, rate: 25 },
        { start: 800, end: 850, rate: 25 },
        { start: 900, end: 950, rate: 25 },
        { start: 1000, end: 1050, rate: 22 },
        { start: 1100, end: 1150, rate: 22 },
        { start: 1200, end: 1250, rate: 22 },
        { start: 1300, end: 1350, rate: 22 },
        { start: 1400, end: 1450, rate: 25 },
        { start: 1500, end: 1550, rate: 25 },
        { start: 1600, end: 1650, rate: 25 }
      ],
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      selectedHours: []
    }
  },
  computed: {
    filteredBuildings () {
      if (this.buildingFilter.length === 0) return this.buildings
      let filterString = new RegExp(this.buildingFilter, 'i')
      return this.buildings.filter(x => (`${x.name}`.search(filterString) >= 0))
    },
    squareFeet () {
      return this.officeSize * 1000
    },
    morning: function () {
      return this.hours.filter(x => (x.start < 1200))
    },
    afternoon: function () {
      return this.hours.filter(x => (x.start >= 1200))
    }
  },
  methods: {
    changeCurrentStep (newStep) {
      this.currentKey = newStep.key
    },
    submit () {
      console.log('this.data', this.data)
    },
    isHourSelected: function (hour) {
      return this.selectedHours.indexOf(hour) >= 0
    },
    toggleHour: function (hour) {
      var index = this.selectedHours.indexOf(hour)
      if (index === -1) this.selectedHours.push(hour)
      else this.selectedHours.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main {
  background: #f9f9f9;
  min-height: 100vh;
}
.tabs {
  background: #fff;
}
.tabs a {
  padding: 20px;
  text-transform: uppercase;
  font-weight: bold;
}
.tabs a:hover {
  cursor: default;
}
</style>
