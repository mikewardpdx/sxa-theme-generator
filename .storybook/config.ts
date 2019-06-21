import { configure, addDecorator } from '@storybook/vue';
import { withA11y } from '@storybook/addon-a11y';

const req = require.context('../scripts', true, /\.stories\.t(s|sx)$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withA11y)
configure(loadStories, module);
