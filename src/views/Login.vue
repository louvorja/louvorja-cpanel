<template>
  <div
    class="bg-gradient-primary w-100 d-flex align-items-center justify-content-center"
    style="min-height: 100vh"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row">
                <div
                  class="col-lg-6 d-none d-lg-flex bg-login-image align-items-center justify-content-center flex-column"
                >
                  <img src="@/assets/img/logo.svg" style="height: 50%" />
                  <div class="sidebar-brand-text mx-3 text-center">
                    <h1 class="text-center text-primary p-0 m-0">Louvor JA</h1>
                    <h4 class="text-center p-0 m-0" style="font-weight: 100">
                      CPanel
                    </h4>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">
                        Forneça suas credenciais!
                      </h1>
                    </div>
                    <form class="user">
                      <div class="form-group mb-2">
                        <input
                          type="email"
                          class="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <div class="form-group mb-3">
                        <input
                          type="password"
                          class="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                        />
                      </div>
                      <a
                        href="index.html"
                        class="btn btn-primary btn-user btn-block w-100"
                      >
                        Conectar
                      </a>
                    </form>
                    <hr />
                    <div class="text-center">
                      Precisa de ajuda?
                      <a
                        class="small"
                        href="forgot-password.html"
                        target="_blank"
                      >
                        Fale com o Suporte
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
};
</script>

<style scoped>
.form-control-user {
  height: 50px;
}
</style>
