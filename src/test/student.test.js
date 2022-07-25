/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

let elementId;
let preRegisterId;
let token;

describe('Student routes test', () => {
  it('POST /student/new-pre-register', (done) => {
    request(app)
      .post('/student/new-pre-register')
      .expect('Content-Type', /json/)
      .send({
        fullName: 'Fernanda Maria',
        birthdate: '03/04/1990',
        CPF: '546.992.710-57',
        profession: 'nurse',
        monthlyIncome: '1000',
        gender: 'cis woman',
        currentlyEmployed: false,
        confirmInformation: true,
        termsAndConditions: true,
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        preRegisterId = res.body.newStudentsPreRegister._id;
        return done();
      });
  });
  it('GET /student/pre-register/:id', (done) => {
    request(app)
      .get(`/student/pre-register/${preRegisterId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('POST /student/new-student/:id', (done) => {
    request(app)
      .post(`/student/new-student/${preRegisterId}`)
      .expect('Content-Type', /json/)
      .send({
        profilePicture:
          'https://media-exp1.licdn.com/dms/image/C4D03AQFRMzvjdTk7Yw/profile-displayphoto-shrink_200_200/0/1650549116742?e=1663200000&v=beta&t=NkLQm4Gsesm5EQi7MG2Qk0u6oJURHGxE2sgdEekdke0',
        username: 'brunaTeabeb',
        chosenLanguage: 'english',
        languageLevel: 'beginner',
        learningInterest: ['conversation'],
        freeDaysOfWeek: ['monday'],
        timeOfTheDay: ['afternoon'],
        email: 'fefefe11nsd@gmail.com',
        password: 'Fortes12@',
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.newStudentRegister._id;
        return done();
      });
  });
  it('POST /platform/student/sign-in', (done) => {
    request(app)
      .post('/platform/student/sign-in')
      .expect('Content-Type', /json/)
      .send({
        username: 'brunaTeabeb',
        password: 'Fortes12@',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  it('POST /platform/admin/sign-in', (done) => {
    request(app)
      .post('/platform/admin/sign-in')
      .expect('Content-Type', /json/)
      .send({
        email: 'brunaccelestino@gmail.com',
        password: 'Fortes12@',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        return done();
      });
  });

  it('GET /student/profile/home/:username', (done) => {
    request(app)
      .get(`/student/profile/home/brunaTeabeb`)
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('PUT /student/profile/update/:id', (done) => {
    request(app)
      .put(`/student/profile/update/${elementId}`)
      .set('Authorization', `Baerer ${token}`)
      .expect('Content-Type', /json/)
      .send({
        profilePicture: 'link',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.savedStudent._id).toBe(elementId);
        expect(res.body.savedStudent.username).toBe('brunaTeabeb');
        expect(res.body.savedStudent.profilePicture).toBe('link');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('DELETE /student/profile/delete/:id', (done) => {
    request(app)
      .delete(`/student/profile/delete/${elementId}`)
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('GET /student/all-pre-registers', (done) => {
    request(app)
      .get(`/student/all-pre-registers`)
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('PUT /student/update-pre-register/:id', (done) => {
    request(app)
      .put(`/student/update-pre-register/${preRegisterId}`)
      .set('Authorization', `Baerer ${token}`)
      .expect('Content-Type', /json/)
      .send({
        birthdate: '03/04/1991',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.savedPreRegister._id).toBe(preRegisterId);
        expect(res.body.savedPreRegister.birthdate).toBe('03/04/1991');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('DELETE /student/delete-pre-register/:id', (done) => {
    request(app)
      .delete(`/student/delete-pre-register/${preRegisterId}`)
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.StudentsPreRegisterFound._id).toBe(preRegisterId);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
