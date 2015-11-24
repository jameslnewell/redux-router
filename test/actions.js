import {NAVIGATE} from '../lib/types';
import {navigate} from '../lib/actions';

describe('actions', () => {

  describe('navigate', () => {

    it('should return a function', () => {
      expect(navigate('/')).to.be.a('function');
    });

    it('should call dispatch when executed', () => {
      const dispatch = stub();
      return navigate('/')(dispatch).then(() => {
        expect(dispatch).to.be.calledWith({
          type: NAVIGATE
        });
      });
    });

    it('should return the action when executed', () => {
      return expect(navigate('/')(action => action)).eventually.to.be.deep.equal({
        type: NAVIGATE
      });
    });

  });

});