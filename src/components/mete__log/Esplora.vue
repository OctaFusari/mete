<template>

  <div class="container__generale__router">
    <div class="container__titoli__esplora">
      <div>
        <h2>Periodo</h2>
        <input type="date">
        <input type="date">
      </div>
      <div>
        <div style="display: flex;align-items: center;">
          <h2>Filtri</h2>
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <a style="margin-left: 2vw; cursor: pointer;" v-bind="activatorProps" color="surface-variant"
                text="Modifica" variant="flat"></a>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Modifica filtri">
                <div>
                  <button v-for="item, index in array__filtri" :key="index" :src="item"
                    @click="item.attivo = !item.attivo"
                    :class="{ 'buttonheavy__little': item.attivo == true, 'buttonlight__little': item.attivo == false }">{{
              item.name }}</button>
                </div>
                <v-card-actions>
                  <v-btn text="finito" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
        <div style="display: flex;">
          <section v-for="index in 4" :key="index">
            <button v-if="array__filtri[index].attivo == true"
              @click="array__filtri[index].attivo = !array__filtri[index].attivo"
              :class="{ 'buttonheavy__little': array__filtri[index].attivo == true, 'buttonlight__little': array__filtri[index].attivo == false }">{{
              array__filtri[index].name }}</button>
          </section>
        </div>
      </div>
    </div>
    <div class="carousels__container">
      <div class="carousels__containe__inside">
        <h1 class="h1__large">Grecia</h1>
        <div>
          <v-sheet class="mx-auto" width="70vw">
            <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
              <v-slide-group-item v-for="n in 15" :key="n" v-slot="{ isSelected, toggle, selectedClass }">

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
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </div>
      </div>
      <div class="carousels__containe__inside">
        <h1 class="h1__large">Italia</h1>
        <div>
          <v-sheet class="mx-auto" width="70vw">
            <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
              <v-slide-group-item v-for="n in 15" :key="n" v-slot="{ isSelected, toggle, selectedClass }">

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
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </div>
      </div>
      <div class="carousels__containe__inside">
        <h1 class="h1__large">Spagna</h1>
        <div>
          <v-sheet class="mx-auto" width="70vw">
            <v-slide-group v-model="model" class="pa-4" selected-class="bg-success" show-arrows>
              <v-slide-group-item v-for="n in 15" :key="n" v-slot="{ isSelected, toggle, selectedClass }">

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
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </div>
      </div>
    </div>
    <div>
      <div></div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

      array__filtri: [
        { name: "Party", attivo: false },
        { name: "Relax", attivo: false },
        { name: "Avventura", attivo: false },
        { name: "Cultura", attivo: false },
        { name: "Natura", attivo: false },
        { name: "Cibo", attivo: false },
        { name: "Spiaggia", attivo: false },
        { name: "Shopping", attivo: false },
        { name: "Storia", attivo: false },
        { name: "Benessere", attivo: false },
        { name: "Vita notturna", attivo: false },
        { name: "Famiglia", attivo: false }
      ]
    };
  },
  computed: {
  },
  methods: {
    
  }
};
</script>

<style>
.container__titoli__esplora {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";
}

.carousels__container{
  margin: 4vw 0 4vw 0;
}

.carousels__containe__inside{
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 1.5rem;
  padding: 2vw;
  margin: 1vw 0vw 1vw 0vw;
}
</style>