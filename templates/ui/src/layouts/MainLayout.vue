<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title class="text-uppercase">
          Aerobro
        </q-toolbar-title>

        <div class="q-mr-md">{{ version }}</div>
        <q-btn stretch flat label="ACC" color="white" @click="$router.push({ name: 'ringkasanAcc' }, () => {})" />
        <q-btn stretch flat label="STRAIN" color="white" @click="$router.push({ name: 'ringkasanStrain' }, () => {})" />
        <q-btn flat round color="white" icon="home" @click="$router.push({ name: 'utama' }, () => {})" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script src="./main.js" />
