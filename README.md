# FED Theme Guide

## Front End Project File Locations
All front end assets are located in a respective theme in the following directory within the main solution root: `~/sxa-themes/[Tenant]/[SiteFolder]/[Site]/[ThemeName]`.

Within each theme, there is a `src/` and `dist/`. The `dist/` is where transpiled assets will go to be imported into Sitecore's Media Library. Unlike popular convention, all transpiled assets will remain tracked in source control.

## Local Development Setup
1. Install dependencies by running the following command from the theme's `src` directory
```
npm install
```

2. Run local [Storybook](https://storybook.js.org/) sandbox environment with the following command from the theme's `src` directory:
```
npm run storybook
```
This will launch storybook at the following url: http://localhost:61566

3. Ensure that the following item in Sitecore is poiting to the proper `sxa-themes` location on your local file system:
```
/sitecore/content/[Tenant]/[SiteFolder]/[SiteName]/Settings/Creative Exchange Storages/Folder on server
```

## Authoring Components
All src files are located in `[Theme]/src/scripts/` and `[Theme]/src/styles/`

### 1. Create a Storybook Story
Add to an existing story file or create a new one. Storybook has been configured to parse any file in the `[Theme]/src/scripts/` directory matching the following glob pattern: `*.stories.tsx`. For simplicity sake, add the story to component directory, e.g. `[Theme]/src/src/scripts/[ComponentName]/[filename].stories.tsx`.

Storybook has been configured using Vue, but only as a means for accessing lifecycle hooks to load src files. Please author src components in TypeScript.

*example component.stories.tsx:*
```ts
import { storiesOf } from '@storybook/vue';

// import your ts module from the src dir
import { Foo } from '../../src/scripts/Foo/Foo';

// import your styles from the src dir
import '../../src/styles/Foo/index.scss';

//Story Feature
storiesOf('Foo', module)
  // Story
  .add('as a component', () => ({
    // example markup for the component
    template: `
      <div class="foo">
        Something
        <button id="testButton">Click</button>
      </div>`,
    mounted() {
      // bootstrap your component locally for initial mount
      new Foo();
    },
    updated() {
      // update your component on update: support for HMR
      new Foo();
    }
  }), {
    // please document stories here
    notes: `
    # Foo Component
    ## Notes
    Add description

    ## Example Usage
    ~~~html
    <div>
      <!-- Example here -->
    </div>
    ~~~

    ## a11y
    list info here
    `
  });
```

### 2. Authoring Component Styles
Please use the following directory structure for scss
```
[Theme]/src/styles/[YourComponentName]/
  variants/
    default.scss
    other-variant.scss
  index.scss
```

*Example index.scss:*
```scss
// get global styles
@import '../core/index';
// musst match class name in SXA
.component-name {
  @import './variants/default';
  // additional beautiful styles added here
}
```

### 3. Authoring Component Scripts
Please use the following directory structure for TS
```
Theme/src/scripts/[YourComponentName]/
  Component.ts
  index.ts // this will be used to boostrap the component for SXA via webpack
```

*example component .ts:*
```ts
export default class Component {
  // required export for SXA registration
  private api: any = {};

  // get DOM like this:
  private foo = <Element>document.getElementById('testButton');


  constructor() {
    // required for SXA registration
    this.api.init = this.init;
  }

  // required for SXA registration
  public init = (): void => {
    // do work here
    this.foo.addEventListener('click', this.makeNoise);
  }

  // include any private members
  private makeNoise (): void {
    // something rad happens here
  }
}
```

### 4. Importing Assets into Sitecore
Assets must be properly transpiled into the `dist/` folder before importing. From the theme's `src/` folder, run the following command to generate the necessary assets:
```
npm run build
```

Once the site is pointing to a proper theme folder on the local file system, all assets imported via the `Experience Editor`. Simply open a page in the Experience Editor, and select the **Experience Accelerator** Tab in the ribbon. Select the **Import** button and and check the **Folder on server** radio, then click **Next**. You will be shown a report after a successful import with only the files that have been changed/added. If you don't see your file, you most likely need to perform a front end build.
