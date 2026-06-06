# Portfolio Update Guide

This document defines the permanent protocol for updating the professional portfolio. It is designed to be framework-agnostic and model-agnostic to ensure consistency across different AI maintainers.

## Repository Purpose
This repository is a professional showcase of engineering expertise. 
- **Preserve**: The minimalist aesthetic, the data-driven architecture, and the "deep-dive" project details.
- **Strictly Forbidden**: Modifying the `profileData` schema without updating the corresponding TypeScript interfaces, inventing project metrics, or removing existing entries without explicit instruction.

## Project Entry Schema
All projects must be added to `src/app/data/profileData.ts` following this universal structure:

### Data Template
```typescript
{
  title: "Project Name",
  type: "Category (e.g., Backend / Cloud / AI)",
  stack: ["Tech1", "Tech2", "Tech3"],
  repo: "URL to repository",
  description: "High-level summary of the project (1-2 sentences).",
  metrics: "Quantifiable impact or key technical achievement.",
  visible: true,
  details: {
    problem: "The specific pain point the project solves.",
    solution: "How the problem was solved technically.",
    architecture: "Description of the system design, patterns used, and flow.",
    challenges: "The hardest technical hurdles overcome during development."
  }
}
```

## Update Workflow
1. **Analyze**: Read `src/app/data/profileData.ts` to understand current project ordering and style.
2. **Extract**: Parse the incoming project context into the Schema defined above.
3. **Normalize**: Ensure technical terms are consistent (e.g., "AWS" instead of "Amazon Web Services").
4. **Integrate**: 
    - Insert the new entry into the `sections.projects.items` array.
    - Update `version` and `last_updated` timestamps in the `profileData` root object.
5. **Review**: 
    - Validate that the `visible` flag is set correctly.
    - Ensure the `repo` link is valid.
6. **Verify**: Run the build process to ensure no TypeScript errors were introduced.

## Content Rules

### Always
- **Style**: Maintain the professional, technical tone.
- **Naming**: Use PascalCase for components and camelCase for data keys.
- **Responsiveness**: Ensure no new UI elements break the mobile layout.
- **Ordering**: Keep the most impactful/recent projects at the top.

### Never
- **Hallucinations**: Do not invent metrics or features not provided in the source context.
- **Branding**: Do not change the primary color palette or typography.
- **Destruction**: Do not delete historical projects unless explicitly requested.

## Validation Checklist
- [ ] Project data matches the `Project` interface.
- [ ] `details` object is fully populated.
- [ ] All URLs are absolute and verified.
- [ ] `profileData` version and date are updated.
- [ ] Build passes without TypeScript errors.
- [ ] Responsive behavior is intact across breakpoints.

## AI Update Prompt
> Act as a Senior Frontend Engineer. Your task is to update the portfolio data in `src/app/data/profileData.ts`. 
> 1. Read the current `profileData.ts` and the provided project context.
> 2. Extract project details into the required schema (including the `details` sub-object).
> 3. Add the entry to `sections.projects.items` and update the `version` and `last_updated` fields.
> 4. Ensure all naming and styling match the existing entries.
> 5. Verify that the TypeScript types are respected.
> 6. Provide a summary of changes and confirm that the build integrity is maintained.
