<template>
  <title-page>Dados Pessoais</title-page>

  <div class="row">
    <card label="Nome" icon="user">{{ user.name }}</card>
    <card
      label="Usuário"
      icon="address-card"
      color="warning"
      link-label="alterar senha"
      :click="change_password"
    >
      {{ user.username }}
    </card>
    <card label="E-mail" icon="envelope" color="info">
      {{ user.email }}
    </card>
    <card label="Telefone" icon="phone" color="success">{{ user.phone }}</card>
  </div>

  <modal
    v-model="show_change_password"
    title="Alterar Senha"
    :buttons="{
      save: { label: 'Salvar', color: 'danger' },
      nosave: { label: 'Nada Salvar', color: 'primary' },
      other: 'Rotyo',
    }"
    @button="button_change_password"
  >
    <form-group>
      <input-field
        label="Senha atual"
        v-model="password.current_password"
        col="12"
        col-lg="4"
      />
      <input-field
        label="Nova senha"
        v-model="password.new_password"
        col="12"
        col-sm="6"
        col-lg="4"
      />
      <input-field
        label="Confirme a nova senha"
        v-model="password.new_password_confirmation"
        col="12"
        col-sm="6"
        col-lg="4"
      />
    </form-group>
  </modal>
</template>

<script>
import { mapGetters } from "vuex";

import TitlePage from "@/components/Title.vue";
import Card from "@/components/Card.vue";
import FormGroup from "@/components/FormGroup.vue";
import InputField from "@/components/Input.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "ProfilePage",
  components: {
    TitlePage,
    Card,
    FormGroup,
    InputField,
    Modal,
  },
  data() {
    return {
      show_change_password: false,
      password: {
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    change_password() {
      this.show_change_password = true;
    },
    button_change_password(val) {
      console.log(val);
    },
  },
};
</script>
