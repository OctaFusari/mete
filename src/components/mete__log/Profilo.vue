<template>
    <div class="container__generale__router profilo__container">
        <div>
            <div class="profilo__upper">
                <div class="profilo__upper__sez__uno"> 
                
                </div>
                <div class="profilo__upper__sez__due">
                    <div>
                        <h1>Octavian Fusari</h1><span style="margin-left: 3vw;color: #FF5400">Modifica profilo</span>
                    </div>
                    <div style="display: flex;">
                        <div class="ods__mini__card"><a><strong>150</strong> seguiti</a></div>
                        <div class="ods__mini__card"><a><strong>50</strong> seguaci</a> </div>
                    </div>
                </div>
            </div>
            <div class="profilo__centro">
                <div class="ods__form__buttons">
                    <button @click="this.sezione__centrale = 0" :class="{ 'buttonlight': this.sezione__centrale == 1, 'buttonheavy': this.sezione__centrale ==0 }">Posti visitati</button>
                    <button @click="this.sezione__centrale = 1" :class="{ 'buttonlight': this.sezione__centrale == 0, 'buttonheavy': this.sezione__centrale == 1 }">Posti salvati</button>
                </div>
                <div class="container__post__inside" v-if="this.sezione__centrale == 0">
                    <div class="ods__card ods__card__little">
                  <div class="ods__card__inside">
                    <div class="ods__card__inside__uno">
                      <div>
                        <img>
                        <h4>Octavian Fusari</h4>
                      </div>
                      <h2>Corfù, Grecia</h2>
                      <h3>Colori ovunque </h3>
                    </div>
                    <div class="ods__card__inside__due">
                      <div>
                        <svg width="27" height="45" viewBox="0 0 27 45" fill="none" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink">
                          <rect width="26.7115" height="44.6429" fill="url(#pattern0_174_534)" />
                          <defs>
                            <pattern id="pattern0_174_534" patternContentUnits="objectBoundingBox" width="1" height="1">
                              <use xlink:href="#image0_174_534"
                                transform="matrix(0.0104167 0 0 0.00623269 0 0.200831)" />
                            </pattern>
                            <image id="image0_174_534" width="96" height="96"
                              xlink:href="data:image/png;base64,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" />
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                <div class="container__post__inside" v-if="this.sezione__centrale == 1">
                    <div class="ods__card ods__card__little">
                  <div class="ods__card__inside">
                    <div class="ods__card__inside__uno">
                      <div>
                        <img>
                        <h4>Octavian Fusari</h4>
                      </div>
                      <h2>Corfù, Grecia</h2>
                      <h3>Colori ovunque </h3>
                    </div>
                    <div class="ods__card__inside__due">
                      <div>
                        <svg width="27" height="45" viewBox="0 0 27 45" fill="none" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink">
                          <rect width="26.7115" height="44.6429" fill="url(#pattern0_174_534)" />
                          <defs>
                            <pattern id="pattern0_174_534" patternContentUnits="objectBoundingBox" width="1" height="1">
                              <use xlink:href="#image0_174_534"
                                transform="matrix(0.0104167 0 0 0.00623269 0 0.200831)" />
                            </pattern>
                            <image id="image0_174_534" width="96" height="96"
                              xlink:href="data:image/png;base64,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" />
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>                  
                <div class="ods__card ods__card__little">
                  <div class="ods__card__inside">
                    <div class="ods__card__inside__uno">
                      <div>
                        <img>
                        <h4>Octavian Fusari</h4>
                      </div>
                      <h2>Corfù, Grecia</h2>
                      <h3>Colori ovunque </h3>
                    </div>
                    <div class="ods__card__inside__due">
                      <div>
                        <svg width="27" height="45" viewBox="0 0 27 45" fill="none" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink">
                          <rect width="26.7115" height="44.6429" fill="url(#pattern0_174_534)" />
                          <defs>
                            <pattern id="pattern0_174_534" patternContentUnits="objectBoundingBox" width="1" height="1">
                              <use xlink:href="#image0_174_534"
                                transform="matrix(0.0104167 0 0 0.00623269 0 0.200831)" />
                            </pattern>
                            <image id="image0_174_534" width="96" height="96"
                              xlink:href="data:image/png;base64,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" />
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
            </div>
        </div>
        <div class="profilo__lato">
            
        </div>
    </div>
</template>

<style>
.profilo__upper{
    display: flex;
}
.profilo__upper div{
    margin: 1vw;
}
  .profilo__container{
    display: grid;
    grid-template-columns: 1fr .5fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". .";
  }
.profilo__upper__sez__uno{
    background-color: var(--color-text);
    width: 100px;
    height: 100px;
    border-radius: 100px;
}
.profilo__upper__sez__due div:first-of-type{
  display: flex;
    align-items: center;
}
.container__post__inside{
    display: flex
}

</style>

<script>
    import DataService from "../../dataservice.ts";
    export default {
        data() {
    return {
        sezione__centrale: 1
    };
  },
  computed: {
  },
  methods: {
    
  }
    }
</script>