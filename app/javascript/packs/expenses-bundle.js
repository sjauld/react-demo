import ReactOnRails from 'react-on-rails';

import Expenses from '../../../client/app/bundles/Expenses/components/Expenses'

// This is how react_on_rails can see the Expenses in the browser.
ReactOnRails.register({
  Expenses,
});
