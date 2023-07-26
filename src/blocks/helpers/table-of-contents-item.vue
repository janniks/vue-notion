<template>
  <li>
    <a :href="`#${uuidToId(item.id)}`">{{ item.title }}</a>
    <ul>
      <TableOfContentsItem
        v-for="subItem in item.sub"
        :key="subItem.id"
        :item="subItem"
      />
    </ul>
  </li>
</template>

<script setup>
import { uuidToId } from "@/lib/utils";
defineProps(["item"]);
</script>
