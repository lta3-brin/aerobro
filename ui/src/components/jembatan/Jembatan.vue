<template>
  <div class="q-px-md">
    <canvas ref="jembatan" class="full-width full-height" />
    <q-resize-observer @resize="onResize" />
  </div>
</template>

<script src="./jembatanHandler.js"/>
