// Styles
import '@mdi/font/css/materialdesignicons.css';
// eslint-disable-next-line import/extensions
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

const customenuTheme = {
  // dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#F43E40',
    'primary-darken-1': '#3700B3',
    secondary: '#ffda99',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'customenuTheme',
    themes: {
      customenuTheme,
    },
  },
});
