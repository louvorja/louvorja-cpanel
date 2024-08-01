<template>
  <div class="avatar">AL</div>
</template>

<script>
export default {
  name: "AvatarComponent",
  props: {
    label: String,
    icon: String,
    href: String,
    active: Boolean,
  },
};
</script>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  text-align: center;
}
</style>
