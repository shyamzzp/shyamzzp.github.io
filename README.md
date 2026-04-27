# Getting Started with Create React App

## Current Implementation Notes

Updated: April 27, 2026

This repository powers Shyam S. Suthar's GitHub Pages portfolio. The current implementation is a compact portfolio experience with a three-column home page and a separate production-effect case-study route.

### Home Page

- The home page is a single-page portfolio layout with three primary columns: About, Current Focus, and Previous Work.
- The main page container should not scroll vertically during normal desktop use. Each column owns its own internal scrolling behavior when its content overflows.
- Mobile uses horizontal movement between the three columns, with a cue that horizontal swiping is supported.
- The About section contains the name `Shyam S. Suthar`, role, CV access, profile links, and text-only skill tags.
- Skill icons were intentionally removed because the text-only version is sharper and easier to scan.
- The Projects tag in About is disabled for now.
- The CV modal currently exposes two CV types: Professional and Personal.

### Previous Work

- Previous Work supports filtering between Projects, Case studies, and Blogs.
- Public statuses such as `Live` and `Published` use a visible green status treatment with a pulsing dot.
- `Load more items` expands the current list in place; it should not open a sidebar.
- Previous-work cards can expand inline to show features and problems faced.
- Previous-work modal navigation supports keyboard left/right for cycling between items.
- The Production Effect case study is route-only and opens `/production-effect-case-study`.

### Production Effect Case Study

- Route: `/production-effect-case-study`.
- Title displays as uppercase: `THE PRODUCTION EFFECT`.
- The case study is currently a single flowing page with normal vertical scrolling. The slider interaction was removed because it made the page unnecessarily complex.
- Pressing `Esc` on the case-study page navigates back to `/`.
- The back link includes a left icon and underlined `Back to profile` text.
- Meta fields currently shown: Author, Published, Category, and Reading Time. Focus and Format were removed.
- Sections are plain text, not cards or grid panels. Current sections include Core Idea, Problem, Base of the Problem, Sub-Problems, Practical Takeaway, Performance Implications, and References.
- Highlights are intentionally subtle: no heavy bold treatment, reduced size, and light background so they mark important ideas without overpowering the surrounding text.
- Each section includes an example to make the case study easier to understand.

### Deployment

- Source updates are pushed to `origin/main`.
- GitHub Pages deployment is published from the production `build/` folder using `gh-pages`.
- Typical release flow:

```bash
npm run build
git add <changed-files>
git commit -m "<message>"
git push origin main
npx gh-pages -d build
```

### Known Build Notes

- The CRA build currently completes successfully.
- Build output may warn that Browserslist data is outdated.
- Build output may also warn about `babel-preset-react-app` importing `@babel/plugin-proposal-private-property-in-object` without declaring it. This is an existing Create React App maintenance warning.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
