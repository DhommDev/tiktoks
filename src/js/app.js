import $ from 'dom7';
import Framework7, { getDevice } from 'framework7/bundle';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

// Import F7 Styles
import 'framework7/css/bundle';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import Capacitor APIs
import capacitorApp from './capacitor-app.js';
// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7'

var device = getDevice();
var app = new Framework7({
  name: 'TikDown', // App name
  theme: 'auto', // Automatic theme detection

  darkMode: true,
  el: '#app', // App root element
  // component: App, // App main component
  // App store
  store: store,
  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: device.capacitor,
    scrollIntoViewCentered: device.capacitor,
  },
  // Capacitor Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.capacitor) {
        // Init capacitor APIs (see capacitor-app.js)
        capacitorApp.init(f7);
      }
    },
  },
});

const text = document.getElementById('uri')
const btn = document.getElementById('envoyer')

btn.addEventListener('click', () => {
  var télécharger = document.getElementById('téléchargeur')
  const url = text.value;

  
  var regex = /tiktok/; // Expression régulière recherchant la lettre 'x'

if (regex.test(url)) {
  const load =document.getElementById('lod');
  load.innerHTML = "<div class='progressbar-infinite color-white'></div>"
  const urls = `https://tiktokdlapi.vercel.app/download?url=${url}&token=CTAPI-772AXEtFQqAkNyTwBWoTcfhHJK`;
  fetch(urls)
      .then(response => response.json())
      .then(data => {
          télécharger.innerHTML=
          `<a href="" id = 'url1' class='external link'><button class='button button-large button-raised button-fill' id='video1'>Video 1</button></a>\
          <a href="" id = 'url2' class='external link'><button class='button button-large button-raised button-fill' id='video2'>Regarder</button></a>\
          <a href="" id = 'url3' class='external link'><button class='button button-large button-raised button-fill' id='videohd'>Video HD1</button></a>\
          <a href="" id = 'url4' class='external link'><button class='button button-large button-raised button-fill' id='videof'>Avec filigrane</button></a>`
          var url1 =document.getElementById('url1');
          var url2 =document.getElementById('url2');
          var url3 =document.getElementById('url3');
          var url4 =document.getElementById('url4');
          url1.href=`${data.result.video1}`
          url2.href=`${data.result.video2}`
          url3.href=`${data.result.video_hd}`
          url4.href=`${data.result.video_watermark}`
           
          
          console.log(data.result.video_watermark)
          
          load.innerHTML = "";
          text.value="";
      })
} else {
  alert('Veuillez entrer le lien d\'une vidéo TikTok');
  return;
        
  }

  

})