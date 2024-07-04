<script setup lang="ts">
</script>

<template>
    <div class="container__generale__router home__container">
        <div class="feed__container">
            <div class="ods__card ods__card__big" @click="$router.push({ path: '/post:' + 'SVOR7R8AhoLw0tNcmwPl' })">
                <div class="ods__card__inside">
                  <div class="ods__card__inside__uno">
                    <div>
                      <img>
                      <h3>Octavian Fusari</h3>
                    </div>
                    <h1>Corfù, Grecia</h1>
                    <h2>Colori ovunque </h2>
                  </div>
                  <div class="ods__card__inside__due">
                    <div style="text-align: center;">
                        <div>
                            <svg style="cursor:pointer" width="39" height="50" viewBox="0 0 39 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.25 10.5263L28.1775 11.9737C27.1538 13.3421 25.7888 13.9474 24.4238 13.9474C21.9375 13.9474 19.5 11.8947 19.5 8.68421V0C19.5 0 0 10.5263 0 28.9474C0 40.5789 8.72625 50 19.5 50C30.2738 50 39 40.5789 39 28.9474C39 21.1579 35.0756 14.1579 29.25 10.5263ZM19.5 44.7368C16.8187 44.7368 14.625 42.4474 14.625 39.6316C14.625 38.2895 15.1125 37.0263 16.0387 36.0526L19.5 32.3684L22.9856 36.0526C23.8875 37.0263 24.375 38.2895 24.375 39.6316C24.375 42.4474 22.1813 44.7368 19.5 44.7368ZM29.1525 40.7895C29.25 39.8421 29.6887 35.8158 26.3981 32.3158L19.5 25L12.6019 32.3158C9.28688 35.8421 9.75 39.8947 9.8475 40.7895C6.80062 37.8947 4.875 33.6579 4.875 28.9474C4.875 20.6316 10.0669 14.0789 14.6981 9.86842C15.2587 15.1053 19.4025 19.2105 24.4238 19.2105C26.325 19.2105 28.1775 18.6053 29.7375 17.4737C32.5163 20.4737 34.125 24.6053 34.125 28.9474C34.125 33.6579 32.1994 37.8947 29.1525 40.7895Z" fill="#FFFFFF"/>
                            </svg>
                        </div>
                        <div>
                            <a>40</a>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
    </div>
        <div class="navbar__laterale__home">
            <div class="navbar__laterale__home__inside">
                <div>
                  <h2>Periodo</h2>
                  <input type="date">
                  <input type="date">
                </div>
                <div class="suggerimenti__account">
                    <h2>Suggerimenti per te</h2>

                    <ul>
                        <li>
                            <a><div></div><h3>Adrea Carlo Montin</h3><span>segui</span></a>
                        </li>
                        <li>
                            <a><div></div><h3>Andrea Sartori</h3><span>segui</span></a>
                        </li>
                        <li>

                            <a><div></div><h3>Gianluca Vacchi</h3><span>segui</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DataService from "./../../dataservice.ts";

  export default {

      data() {
          return {
            
          };
      },
      methods: {
        TakeData: function () {
          DataService.takePosts()
        },
      },
      mounted() {
        this.TakeData()
      
      }

  }
</script>

<style>
.navbar__laterale__home{
  margin-top: 10vh;
}
.navbar__laterale__home__inside{
  position: fixed;
}
.feed__container{
  display: flex;
  justify-content: center;
}
.suggerimenti__account{
    margin-top: 8vh;
}
  .home__container{
    display: grid;
    grid-template-columns: 1fr .5fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". .";
  }
  .suggerimenti__account ul li {
  position: relative;
  width: 100%;
  list-style: none;
  margin: 5vh 0 5vh 0;
}

.suggerimenti__account ul li path{
  transition-duration: .2s;
}

.suggerimenti__account ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: grid;
  grid-template-columns: 40px 200px 20px;
  grid-template-rows: 1fr;
  grid-template-areas: ". . .";
  text-decoration: none;
  color: var(--color-text);
}

.suggerimenti__account div{
    background-color: var(--color-text);
    width: 30px;
    height: 30px;
    border-radius: 30px;
}

.suggerimenti__account  ul li a *{
    margin-right: 10px;
}

.suggerimenti__account  ul li a span{
   color: #FF5400;
}
</style>

