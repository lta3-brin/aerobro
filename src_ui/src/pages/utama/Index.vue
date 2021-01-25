<template>
  <q-page class="flex flex-center">
    <div class="row items-center justify-center full-width q-my-sm">
      <div class="col-12 col-md-5 q-px-sm">
        <q-list bordered class="rounded-borders">
          <q-item-label header>Live Data Sensor</q-item-label>

          <q-item>
            <q-item-section avatar center>
              <q-icon name="sensors" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">Data Strain/Stress: </span>
                <span class="text-grey-8"> [Non dimensi]</span>
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

      <div class="col-12 col-md-7 q-px-sm">
        <canvas ref="jembatan" class="full-width" />
        <q-resize-observer @resize="onResize" />
      </div>
    </div>
  </q-page>
</template>

<script src="./utama.js" />
