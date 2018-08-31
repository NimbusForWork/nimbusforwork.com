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

          <slot></slot>

          <div class="buttons is-right">
            <a class="button is-rounded is-small is-outlined" @click="goToNext()" v-show="skipButtonVisible">Skip</a>
            <a class="button is-rounded is-small is-outlined" @click="goToPrevious()" v-show="previousButtonVisible">Previous</a>
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
  props: [
    'steps'
  ],
  components: { },
  data () {
    return {
      activeStepIndex: 0
    }
  },
  computed: {
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
      this.activeStepIndex -= 1
      this.$emit('onChange', this.steps[this.activeStepIndex])
    },
    goToNext () {
      this.activeStepIndex += 1
      this.$emit('onChange', this.steps[this.activeStepIndex])
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
.buttons {
  margin-top: 30px;
}
</style>
