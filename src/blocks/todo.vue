<template>
  <div>
    <div class="inline-flex notion-todo">
      <template>
        <svg v-if="isChecked" class="checked" viewBox="0 0 14 14">
          <polygon
            points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
          ></polygon>
        </svg>

        <svg v-else viewBox="0 0 16 16">
          <path
            d="M1.5,1.5 L1.5,14.5 L14.5,14.5 L14.5,1.5 L1.5,1.5 Z M0,0 L16,0 L16,16 L0,16 L0,0 Z"
          ></path>
        </svg>
      </template>

      <label :class="isChecked && 'strikethrough'">
        <NotionTextRenderer :text="title" v-bind="pass" />
      </label>
    </div>
  </div>
</template>

<script>
import Blockable from "@/lib/blockable";
import NotionTextRenderer from "@/blocks/helpers/text-renderer";

export default {
  extends: Blockable,
  name: "NotionTodo",
  components: {
    NotionTextRenderer,
  },
  computed: {
    isChecked() {
      return this.properties?.checked?.toString() === "Yes";
    },
  },
};
</script>

<style scoped>
/* Flexbox */
.inline-flex {
  display: inline-flex;
  align-items: center;
}

.inline-flex svg {
  margin-right: 0.5rem;
}

/* Input */
input {
  display: none;
}

/* SVG */
.notion-todo svg {
  width: 1em;
  height: 1em;
}

.notion-todo svg.checked {
  background-color: rgb(46, 170, 220);
  padding: 0.1em;
  fill: white;
}

/* Utilities */
.strikethrough {
  text-decoration: line-through;
  opacity: 0.5;
}

/* Dark mode compatibility for both system and Tailwind-like CSS utilities */
@media (prefers-color-scheme: dark) {
  .notion-todo svg:not(.checked) {
    fill: #ffffff;
    opacity: 0.9;
  }
}

.dark .notion-todo svg:not(.checked) {
  fill: #ffffff;
  opacity: 0.9;
}
</style>
