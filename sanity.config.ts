import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./sanity/schemas";
import { projectId, dataset, apiVersion } from "./sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  apiVersion,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("About & Contact")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("About & Contact")
              ),
            S.listItem()
              .title("CV")
              .id("cv")
              .child(S.document().schemaType("cv").documentId("cv").title("CV")),
            S.divider(),
            S.listItem()
              .title("Artworks")
              .schemaType("artwork")
              .child(S.documentTypeList("artwork").title("Artworks")),
            S.listItem()
              .title("Projects")
              .schemaType("project")
              .child(S.documentTypeList("project").title("Projects")),
            S.divider(),
            S.listItem()
              .title("Inspiration / Journal")
              .schemaType("inspiration")
              .child(S.documentTypeList("inspiration").title("Posts")),
            S.listItem()
              .title("News")
              .schemaType("newsItem")
              .child(S.documentTypeList("newsItem").title("News items")),
            S.listItem()
              .title("Press")
              .schemaType("pressItem")
              .child(S.documentTypeList("pressItem").title("Press items")),
          ]),
    }),
    visionTool(),
  ],

  document: {
    // About & Contact and CV are single documents, so hide "New" for them
    newDocumentOptions: (prev) =>
      prev.filter((t) => t.templateId !== "siteSettings" && t.templateId !== "cv"),
  },

  schema: { types: schemas },
});
