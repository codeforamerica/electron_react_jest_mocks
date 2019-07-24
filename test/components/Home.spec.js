import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import Home from '../../app/components/Home';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(isPackaged, platform = 'windows') {
  process.env.HOME = '/tmp/test/home/path';
  process.resourcesPath = '/tmp/test/resources/path';
  process.env.IS_PACKAGED = isPackaged;
  process.env.PLATFORM = platform;
  sinon.useFakeTimers(new Date(2011, 0, 1).getTime());

  const component = shallow(<Home />);
  return { component };
}

afterEach(() => {
  sandbox.restore();
});

describe('Home component', () => {
  describe('initial state', () => {
    it('sets the currentScreen to 0', () => {
      const { component } = setup('false');
      expect(component.state('currentScreen')).toEqual(0);
    });

    it('sets the initial file path to HOME/desktop', () => {
      const { component } = setup('false');
      expect(component.state('outputPathPrefix')).toEqual(
        '/tmp/test/home/path/Desktop/Jest_Mocks_Example_output/CMR_output'
      );
    });

    it('sets the output file path to any empty string', () => {
      const { component } = setup('false');
      expect(component.state('outputFilePath')).toEqual('');
    });

    it('sets the county to Alameda', () => {
      const { component } = setup('false');
      const county = component.state('county');
      expect(county).toEqual({ name: 'Alameda', code: 'ALAMEDA' });
    });

    it('sets the dateTime to an empty string', () => {
      const { component } = setup('false');
      const dateTime = component.state('dateTime');
      expect(dateTime).toEqual('');
    });
  });

  describe('nextScreen', () => {
    it('increments state.currentScreen', () => {
      const { component } = setup('true');
      expect(component.state('currentScreen')).toEqual(0);
      component.instance().nextScreen();
      expect(component.state('currentScreen')).toEqual(1);
    });
  });

  describe('resetOutputPath', () => {
    it('resets the date after restart', () => {
      const { component } = setup('true');
      component.setState({ outputFilePath: 'some/other/path' });
      component.instance().resetOutputPath();
      expect(component.state('outputFilePath')).toEqual(
        component.state('outputPathPrefix')
      );
    });
  });

  it('should match exact snapshot', () => {
    const counter = (
      <div>
        <Home />
      </div>
    );

    const tree = renderer.create(counter).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
