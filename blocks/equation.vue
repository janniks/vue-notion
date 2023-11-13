<template>
  <div v-if="katex">
    <component :is="'katex-element'" :expression="equation" />
  </div>
  <NotionCode
    v-else
    v-bind="pass"
    override-lang="latex"
    override-lang-class="language-latex" />
</template>

<script>
  import { Blockable, blockComputed } from '../lib/blockable';
  import NotionCode from '../blocks/code.vue';

  export default {
    name: 'NotionEquation',
    components: { NotionCode },
    extends: Blockable,
    computed: {
      ...blockComputed,
      equation() {
        return this.properties?.title?.[0]?.[0];
      },
    },
  };
</script>
