<template>
  <q-page>
    <div class="row justify-center q-py-md">
      <div class="col-12 col-md-9">
        <Jembatan :style="{ height: jembatanHeight + 'px' }" />
      </div>

      <div class="col-12 col-md-3 q-px-md q-mb-md">
        <q-card class="bg-warning text-black q-mb-md">
          <q-card-section>
            <div class="text-h6">🌉 Perkiraan Keamanan</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Sinyal: <span class="text-uppercase text-bold text-h3">{{ sensor.sinyal }}</span>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Pantauan: <span class="text-uppercase text-bold text-h3">aman</span>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-dark">
            <q-btn flat label="HUBUNGI KAMI" @click="goToExternal('https://bit.ly/ChatBBTA3')" />
          </q-card-actions>
        </q-card>

        <q-list bordered class="bg-white rounded-borders">
          <q-item-label header>Live Data Sensor</q-item-label>

          <q-item>
            <q-item-section avatar center>
              <q-icon name="sensors" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">Data Strain/Stress 1: </span>
                <span class="text-grey-8"> [-]</span>
              </q-item-label>

              <q-item-label lines="1" class="q-mt-xs text-weight-bold text-h3 text-uppercase">
                {{ sensor.strain1 }}
              </q-item-label>
            </q-item-section>

            <q-item-section center side>
              <q-avatar :color="strainSignal1" text-color="white"></q-avatar>
            </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item>
            <q-item-section avatar center>
              <q-icon name="sensors" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">Data Strain/Stress 2: </span>
                <span class="text-grey-8"> [-]</span>
              </q-item-label>

              <q-item-label lines="1" class="q-mt-xs text-weight-bold text-h3 text-uppercase">
                {{ sensor.strain2 }}
              </q-item-label>
            </q-item-section>

            <q-item-section center side>
              <q-avatar :color="strainSignal2" text-color="white"></q-avatar>
            </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item>
            <q-item-section avatar center>
              <q-icon name="sensors" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">Data Acceleration: </span>
                <span class="text-grey-8"> [G]</span>
              </q-item-label>

              <q-item-label lines="1" class="q-mt-xs text-weight-bold text-h3 text-uppercase">
                {{ sensor.acc }}
              </q-item-label>
            </q-item-section>

            <q-item-section center side>
              <q-avatar :color="accSignal" text-color="white"></q-avatar>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script src="./utama.js" />
