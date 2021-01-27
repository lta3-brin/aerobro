<template>
  <q-page>
    <div class="row justify-center q-py-md">
      <div class="col-12 col-md-8">
        <Jembatan :style="{ height: jembatanHeight + 'px' }" />
      </div>

      <div class="col-12 col-md-4 q-px-md q-mb-md">
        <q-card class="bg-dark text-white q-mb-md">
          <q-card-section>
            <div class="text-h6">🌉 Perkiraan Toleransi Keamanan</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Status sinyal: <span class="text-uppercase text-bold text-h3">online</span>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Status pantauan: <span class="text-uppercase text-bold text-h3">aman</span>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-dark">
            <q-btn flat label="HUBUNGI KAMI" @click="goToExternal('https://bit.ly/ChatBBTA3')" />
          </q-card-actions>
        </q-card>

        <q-list bordered class="rounded-borders">
          <q-item-label header>Live Data Sensor</q-item-label>

          <q-item>
            <q-item-section avatar center>
              <q-icon name="sensors" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">Data Strain/Stress: </span>
                <span class="text-grey-8"> [-]</span>
              </q-item-label>

              <q-item-label lines="1" class="q-mt-xs text-weight-bold text-h3 text-uppercase">
                0.24
              </q-item-label>
            </q-item-section>

            <q-item-section center side>
              <q-avatar color="negative" text-color="white"></q-avatar>
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
                0.04
              </q-item-label>
            </q-item-section>

            <q-item-section center side>
              <q-avatar color="warning" text-color="white"></q-avatar>
            </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item>
            <q-item-section avatar center>
              <q-icon name="sensors" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">Data Displacement: </span>
                <span class="text-grey-8"> [mm]</span>
              </q-item-label>

              <q-item-label lines="1" class="q-mt-xs text-weight-bold text-h3 text-uppercase">
                1.20
              </q-item-label>
            </q-item-section>

            <q-item-section center side>
              <q-avatar color="positive" text-color="white"></q-avatar>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script src="./utama.js" />
