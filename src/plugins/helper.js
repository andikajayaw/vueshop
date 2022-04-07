"use strict"
import Vue from 'vue'
const Helper = {
    install() {
        Vue.prototype.appName = process.env.VUE_APP_NAME
        Vue.prototype.getImage = function (image){
            if(image!=null && image.length>0){
                // return process.env.VUE_APP_BACKEND_URL + "/images"+ image
                return image
            }
            return "https://via.placeholder.com/150"
        }
    }
}

Vue.use(Helper)