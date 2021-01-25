<template>
  <div class="q-px-md">
    <canvas ref="jembatan" class="full-width" style="height: 650px" />
    <q-resize-observer @resize="onResize" />
  </div>
</template>

<script src="./jembatanHandler.js"/>
