"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

import { codeInput } from "@sanity/code-input";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
    name: "default",
    title: "Harshil Portfolio",

    projectId,
    dataset,

    basePath: "/studio",

    plugins: [structureTool(), visionTool(), codeInput()],

    schema: {
        types: schemaTypes,
    },
});
