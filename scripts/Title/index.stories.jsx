import { storiesOf } from '@storybook/vue';

storiesOf('Title', module)
  .add('Page', () => ({
    template:
    `
      <div>
        Some page content that comes from Sitecore
      </div>
    `,

  }), {
    notes: `
    # Property Floor SPA

    ## API

    ##Example Usage
    ~~~html

    ~~~

    ## Notes
    Add additional notes here

    ## a11y
    Add a11y documentation here
    `
  });

