import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import sinon from 'sinon';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.sinon = sinon;
global.mount = mount;
