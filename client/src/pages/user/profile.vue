<template lang="html">
<div class="container">
  <h1>Personal info</h1>
    <form id="persInfo">
      <div class="row">
        <label for="email">Email:</label>
        <input type="email" id="email">
      </div>
      <div class="row">
        <label for="username">Username:</label>
        <input type="text" id="username">
      </div>
      <div class="row">
        <label for="password">Password:</label>
        <input type="password" id="password">
      </div>
      <div class="row">
        <label for="serverurl">Server URL:</label>
        <input type="text" id="serverurl">
      </div>
      <!-- <div class="row">
        <label for="fName">First Name:</label>
        <input type="text" id="fName">
      </div>
      <div class="row">
        <label for="lName">Last Name:</label>
        <input type="text" id="lName">
      </div>
      <div class="row">
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" value="2018-11-01">
      </div>
      <div class="row">
        <label for="weight">Weight(KG):</label>
        <input type="text" id="weight" min="1" max="">
      </div>
      <div class="row">
        <label for="height">Height(CM):</label>
        <input type="text" id="height">
      </div>
      GP surgery

      Link your google account-->
      <div class="row">
        <input id="submit" type="submit">
      </div>
    </form>
</div>
</template>

<script>
export default {
  name: 'Profile',
  metaInfo: {
    title: 'Profile'
  }
}
</script>

<style lang="css">
.externalWrapper{
  margin:auto;
  width: 960px;
}

#persInfo{
  float: right;
  width: 300px;
}

.row{
  float:left;
  width: 100%;
}

.row label{
  float:left;
}

.row input{
  float:right;
}

input{
  width: 50%;
}


</style>
