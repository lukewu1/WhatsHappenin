// ********************** Initialize server **********************************

const server = require('../index'); //TODO: Make sure the path to your index.js is correctly added

// ********************** Import Libraries ***********************************

const chai = require('chai'); // Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********************** DEFAULT WELCOME TESTCASE ****************************

// describe('Server!', () => {
//   // Sample test case given to test / endpoint.
//   it('Returns the default welcome message', done => {
//     chai
//       .request(server)
//       .get('/welcome')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body.status).to.equals('success');
//         assert.strictEqual(res.body.message, 'Welcome!');
//         done();
//       });
//   });
// });

// *********************** TODO: WRITE 2 UNIT TESTCASES(User Acceptance TESTING) **************************
// *********************** POSITIVE AND NEGATIVE FOR LOGIN AND REGISTER **************************

describe('UAT Testing for Add User API', () => {
  it('positive : /register', done => {
    chai
      .request(server)
      .post('/register?test=true')
      .send({username: 'bob', password: 'test123', confirmpassword: 'test123'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        done();
      });
  });

  it('negative : /register', done => {
    chai
    .request(server)
    .post('/register?test=true')
    .send({username: 'bobtest', password: 23, confirmpassword: 23})
    .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equals('Invalid Input');
        done();
    });
  });
});

describe('UAT Testing for Login API', () => {
  it('positive : /login', done => {
    chai
      .request(server)
      .post('/login?test=true')
      .send({username: 'bob', password: 'test123'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals('Success');
        done();
      });
  });

  it('negative : /login', done => {
    chai
      .request(server)
      .post('/login?test=true')
      .send({username: 'bob123', password: 'test123'})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equals('Invalid username or password.');
        done();
      });
  });
});

describe('UAT Tests for the Navbar', () => {

  it('test "/newsMap" route should render with an html response', done => {
    chai
      .request(server)
      .get('/newsMap') // for reference, see lab 8's login route (/login) which renders home.hbs
      .end((err, res) => {
        res.should.have.status(200); // Expecting a success status code
        res.should.be.html; // Expecting a HTML response
        done();
      });
  });

  it('test "/savedArticles" route should render with an html response', done => {
    chai
      .request(server)
      .get('/savedArticles') // for reference, see lab 8's login route (/login) which renders home.hbs
      .end((err, res) => {
        res.should.have.status(200); // Expecting a success status code
        res.should.be.html; // Expecting a HTML response
        done();
      });
  });

  it('test "/profile" route should render with an html response', done => {
    chai
      .request(server)
      .get('/profile') // for reference, see lab 8's login route (/login) which renders home.hbs
      .end((err, res) => {
        res.should.have.status(200); // Expecting a success status code
        res.should.be.html; // Expecting a HTML response
        done();
      });
  });

  it('/logout route should redirect to /login with 302 HTTP status code', done => {
    chai
      .request(server)
      .get('/logout')
      .redirects(0)
      .end((err, res) => {
        res.should.have.status(302); // Expecting a redirect status code
        res.should.redirectTo(/login$/); // Expecting a redirect to /login with the mentioned Regex
        done();
      });
  });
});

describe('UAT Testing for savedArticles', () => {
  it('test "/savedArticles" route should render with an html response', done => {
    chai
      .request(server)
      .get('/savedArticles') // for reference, see lab 8's login route (/login) which renders home.hbs
      .end((err, res) => {
        res.should.have.status(200); // Expecting a success status code
        res.should.be.html; // Expecting a HTML response
        done();
      });
  });

  // it('test "/savedArticles users should be able to edit their comments"', done => {
  //   chai
  //     .request(server)
  //     .post('/savedArticles')
  //     .send({username: 'bob123', password: 'test123'})
  //     .end((err, res) => {
  //       expect(res).to.have.status(400);
  //       expect(res.body.message).to.equals('Invalid username or password.');
  //       done();
  //     });
  // });
});

describe('UAT Testing for newsMap', () => {
  it('test "/newsMap" route should render with an html response', done => {
    chai
      .request(server)
      .get('/newsMap') // for reference, see lab 8's login route (/login) which renders home.hbs
      .end((err, res) => {
        res.should.have.status(200); // Expecting a success status code
        res.should.be.html; // Expecting a HTML response
        done();
      });
  });
});