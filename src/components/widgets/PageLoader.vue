<template>
  <div>
      <transition name="fade">
          <div v-if="isLoading" class="loadingOverlay">
              <div class="bSpiner" >
                <v-progress-circular
                  :width="3"
                  :size="100"
                  color="black"
                  indeterminate
                ></v-progress-circular>
              </div>
          </div>
      </transition>
  </div>
</template>

<script>

export default {
  computed: {
    isLoading () {
      return this.$store.getters.getPageLoading
    }
  }
}
</script>
<style scoped>
  .loadingOverlay{
    background: rgba(255, 255, 255, 0.7);
    position: fixed;
    z-index: 1000;
    height: 100%;
    width: 100%;
  }
  .loadingOverlay .bSpiner{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1001;
    width: 7rem;
    height: 7rem;
    transform: translateX(-50%) translateY(-50%);
  }

  .fade-enter-active, .fade-leave-active {
      transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to {
      opacity: 0;
  }

  .v-progress-circular {
    margin: 1rem;
  }

</style>
