<template>
  <div class="loading">
    <i class="el-icon-loading"></i>
  </div>
</template>

<script>
  export default {
    name: "Loading"
  }
</script>

<style scoped lang="scss">
  .loading {
    text-align: center;
    i {
      font-size: 35px !important;
      line-height: 40px;
      color: $blue-500;
    }
  }
</style>
