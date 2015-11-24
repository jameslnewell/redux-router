import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import promiseChai from 'chai-as-promised';

global.expect = chai.expect;
global.spy = sinon.spy;
global.stub = sinon.stub;

chai.use(sinonChai);
chai.use(promiseChai);
