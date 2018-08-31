<template>
<main id="main">

  <div class="tabs is-fullwidth">
    <ul>
      <li v-for="(step, index) in steps" :key="index" :class="{'is-active': (index <= activeStepIndex)}">
        <a v-show="index >= activeStepIndex">
          <span class="icon"><i class="far fa-check-circle"></i></span>{{step.label}}
        </a>
        <a v-show="index < activeStepIndex">
          <span class="icon"><i class="fas fa-check-circle"></i></span>{{step.label}}
        </a>
      </li>
    </ul>
  </div>

  <div class="section is-light">
    <div class="container">
      <div class="columns is-centered">

        <div class="column is-8">

          <div class="buttons is-right">
            <a class="button is-rounded is-dark is-small is-outlined" @click="goToNext()" v-show="skipButtonVisible">Skip</a>
            <a class="button is-rounded is-dark is-small is-outlined" @click="goToPrevious()" v-show="previousButtonVisible">Previous</a>
            <a class="button is-rounded is-primary" @click="goToNext()" v-show="nextButtonVisible">Next</a>
            <a class="button is-rounded is-primary" @click="submit()" v-show="submitButtonVisible">Submit</a>
          </div>

        </div>

      </div>
    </div>

  </div>

</main>
</template>

<script>
export default {
  components: { },
  data () {
    return {
      steps: [
        {
          label: 'Intro',
          isCompleted: false,
          isActive: true,
          hideNextButton: false,
          userCanSkip: false
        },
        {
          label: 'Location',
          isCompleted: false,
          isActive: false,
          hideNextButton: false,
          userCanSkip: false
        },
        {
          label: 'Estimate',
          isCompleted: false,
          isActive: false,
          hideNextButton: false,
          userCanSkip: false
        },
        {
          label: 'Hours',
          isCompleted: false,
          isActive: false,
          hideNextButton: false,
          userCanSkip: false
        },
        {
          label: 'Days',
          isCompleted: false,
          isActive: false,
          hideNextButton: false,
          userCanSkip: false
        },
        {
          label: 'Review',
          isCompleted: false,
          isActive: false,
          hideNextButton: false,
          userCanSkip: false
        }
      ]
    }
  },
  computed: {
    activeStepIndex () {
      return this.steps.findIndex(x => (x.isActive))
    },
    nextButtonVisible () {
      if (this.activeStepIndex === (this.steps.length - 1)) return false // reached the end
      if (this.steps[this.activeStepIndex].hideNextButton) return false
      return true
    },
    skipButtonVisible () {
      return (this.steps[this.activeStepIndex].userCanSkip)
    },
    submitButtonVisible () {
      return (this.activeStepIndex === (this.steps.length - 1)) // reached the end
    },
    previousButtonVisible () {
      return this.activeStepIndex
    }
  },
  methods: {
    goToPrevious () {
      let active = this.activeStepIndex
      this.steps[active].isActive = false
      this.steps[(active - 1)].isActive = true
    },
    goToNext () {
      let active = this.activeStepIndex
      this.steps[active].isActive = false
      this.steps[(active + 1)].isActive = true
    },
    submit () {
      console.log('this.data', this.data)
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
