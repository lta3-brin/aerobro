<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title class="text-uppercase">
          Aerobro
        </q-toolbar-title>

        <div class="q-mr-md">{{ version }}</div>

        <div class="q-gutter-x-sm">
          <q-btn flat round color="white" icon="home" @click="$router.push({ name: 'utama' })" />
          <q-btn flat round color="white" icon="receipt" @click="$router.push({ name: 'ringkasan' })" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script src="./main.js" />
