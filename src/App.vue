<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item v-if="!guest">
          <v-list-item-avatar>
            <v-img :src="getImage(user.avatar)"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Andika Jaya</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div class="pa-2" v-if="guest">
          <v-btn block color="primary" class="mb-1" @click="setDialogComponent('login')">
            <v-icon left>mdi-lock</v-icon>
              Login
          </v-btn>
          <v-btn block color="success">
            <v-icon left>mdi-account</v-icon>
              Register
          </v-btn>
        </div>

        <v-divider></v-divider>
        <v-list-item
          v-for="(item, index) in menus"
          :key="`menu-`+index"
          :to="item.route">
          <v-list-item-icon>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append v-if="!guest">
        <div class="pa-2">
          <v-btn block color="red" dark>
            <v-icon left>mdi-lock</v-icon>
              Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <alert />
    <keep-alive>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <component :is="currentComponent" @closed="setDialogStatus"></component>
        </v-dialog>  
    </keep-alive>
    <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="scale-transition">
      <Search @closed="closeDialog" />
    </v-dialog> -->

    <v-app-bar app color="primary" dark v-if="isHome">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vueshop</v-toolbar-title>
      <!-- Pemisah Kontent -->
      <v-spacer></v-spacer>
      <v-btn icon to="/about">
        <v-badge :color="countCart>0 ? 'orange' : ''" overlap>
          <template v-slot:badge v-if="countCart>0">
            <span>{{ countCart }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-text-field slot="extension" hide-details append-icon="mdi-microphone" flat label="Search" prepend-inner-icon="mdi-magnify" solo-inverted
       @click="setDialogComponent('search')"></v-text-field>
    </v-app-bar>
    <v-app-bar app color="primary" dark v-else>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon to="/about">
        <v-badge :color="countCart>0 ? 'orange' : ''" overlap>
          <template v-slot:badge v-if="countCart>0">
            <span>{{ countCart  }}</span>
          </template>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-slide-y-transition>
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-main>
    <v-card>
      <v-footer absolute app>
        <v-card-text class="text-center">
          &copy; {{ new Date().getFullYear() }} - <strong>Vueshop</strong>
        </v-card-text>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Alert: () => import('@/components/Alert.vue'),
    Search: () => import('@/components/Search.vue'),
    Login: () => import( /* webpackChunkName: "login" */ '@/views/Login.vue'),

  },
  data: () => ({
    drawer: false,
    menus:[{ title: 'Home', icon: 'mdi-home', route: '/' },
    { title: 'About', icon: 'mdi-account', route: '/about' },],
    // guest: false,
  }),
  methods: {
    // closeDialog(val) {
    //   this.dialog = val
    // }
    ...mapActions({
      setDialogStatus: 'dialog/setStatus',
      setDialogComponent: 'dialog/setComponent',
    })
  },
  computed: {
    isHome() {
      return (this.$route.path === '/')
    },
    ...mapGetters({
      countCart: 'cart/count',
      guest: 'auth/guest',
      user: 'auth/user',
      dialogStatus: 'dialog/status',
      currentComponent: 'dialog/component',
    }),
    dialog: {
      get() {
        return this.dialogStatus
      },
      set(value) {
        this.setDialogStatus(value)
      }
    }
  }
};
</script>
