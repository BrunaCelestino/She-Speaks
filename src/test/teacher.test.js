/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

let elementId;
let preRegisterId;
let token;

describe('Teacher routes test', () => {
  it('POST /teacher/new-pre-register', (done) => {
    request(app)
      .post('/teacher/new-pre-register')
      .expect('Content-Type', /json/)
      .send({
        fullName: 'Bruna Celestino',
        birthdate: '09/10/1995',
        CPF: '331.448.360-01',
        profession: 'back-end developer',
        timeOfExperience: 'more than 3 years',
        gender: 'cis woman',
        resume: 'cv-brunaCelestino',
        confirmInformation: true,
        termsAndConditions: true,
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        preRegisterId = res.body.newTeacherPreRegister._id;
        return done();
      });
  });
  it('GET /teacher/pre-register/:id', (done) => {
    request(app)
      .get(`/teacher/pre-register/${preRegisterId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).not.toBe(0);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('POST /teacher/new-teacher/:id', (done) => {
    request(app)
      .post(`/teacher/new-teacher/${preRegisterId}`)
      .expect('Content-Type', /json/)
      .send({
        profilePicture: 'link',
        username: 'BrunaTeacher22x',
        chosenLanguage: 'english',
        other: false,
        LanguageLevelToTeach: 'beginner',
        teachingInterest: 'conversation',
        freeDaysOfWeek: ['sunday'],
        timeOfTheDay: ['afternoon'],
        email: 'brunaccelestino2xx@gmail.com',
        password: 'Fortes12@',
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        elementId = res.body.newTeacherRegister._id;
        return done();
      });
  });
  it('POST /platform/teacher/sign-in', (done) => {
    request(app)
      .post('/platform/teacher/sign-in')
      .expect('Content-Type', /json/)
      .send({
        username: 'BrunaTeacher22x',
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

  it('GET /teacher/profile/home/:username', (done) => {
    request(app)
      .get(`/teacher/profile/home/BrunaTeacher22x`)
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

  it('PUT /teacher/profile/update/:id', (done) => {
    request(app)
      .put(`/teacher/profile/update/${elementId}`)
      .set('Authorization', `Baerer ${token}`)
      .expect('Content-Type', /json/)
      .send({
        profilePicture: 'link1',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.savedTeacher._id).toBe(elementId);
        expect(res.body.savedTeacher.username).toBe('BrunaTeacher22x');
        expect(res.body.savedTeacher.profilePicture).toBe('link1');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('DELETE /teacher/profile/delete/:id', (done) => {
    request(app)
      .delete(`/teacher/profile/delete/${elementId}`)
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  it('GET /teacher/all-pre-registers', (done) => {
    request(app)
      .get(`/teacher/all-pre-registers`)
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

  it('PUT /teacher/update-pre-register/:id', (done) => {
    request(app)
      .put(`/teacher/update-pre-register/${preRegisterId}`)
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

  it('DELETE /teacher/delete-pre-register/:id', (done) => {
    request(app)
      .delete(`/teacher/delete-pre-register/${preRegisterId}`)
      .set('Authorization', `Baerer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.TeacherPreRegisterFound._id).toBe(preRegisterId);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
