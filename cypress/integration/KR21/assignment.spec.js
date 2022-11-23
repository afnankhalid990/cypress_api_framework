describe('Assignment for KR21', () => {
    // GET API.
    it('Test case for user list API.', () => {
      cy.request({
        method: 'Get',
        url: '/api/users?page=2'
      }).then( ({status, body}) => {
        expect(status).to.eq(200)
        cy.fixture('apis/data.json', 'utf-8').then((data)=>{
          var schema_obj = data.rs_for_api_1
          expect(body).to.be.jsonSchema(schema_obj);
          schema_obj = data.rs_for_api_2
          expect(body.data).to.be.jsonSchema(schema_obj);
          expect(body.data).to.have.length.greaterThan(1);
        })
      })
    });

  // There are only 12 pages and data array should be of size 0 if we send param page no. 13.
  it('[Negative] Test case for user list API.', () => {
    cy.request({
      method: 'Get',
      url: '/api/users?page=13'
    }).then( ({status, body}) => {
      expect(status).to.eq(200)
      cy.fixture('apis/data.json', 'utf-8').then((data)=>{
        var schema_obj = data.rs_for_api_1
        expect(body).to.be.jsonSchema(schema_obj);
        schema_obj = data.rs_for_api_2
        expect(body.data).to.be.jsonSchema(schema_obj);
        expect(body.data).to.have.length(0);
      })
    })
  });

  // POST API.
  it('Test case for user creation API.', () => {
    const id = Cypress._.random(0, 10000)
    const testname = `testname_${id}`
    cy.request({
      method: 'Post',
      url: '/api/users',
      body: {
        "name": `${testname}`,
        "job": "leader"}
    }).then( ({status, body}) => {
      expect(status).to.eq(201)
      cy.fixture('apis/data.json', 'utf-8').then((data)=>{
        var schema_obj = data.rs_for_api_3
        expect(body).to.be.jsonSchema(schema_obj);
        expect(body.name).to.equal(testname);
        cy.task('setUserId', body.id)
      })
    })
  });

  // PUT API.
  it('Test case for user update API.', () => {
    const id = Cypress._.random(0, 10000)
    const testname = `testname_${id}`
    cy.task('getUserId').then((user_id) => {
      cy.request({
        method: 'Put',
        url: '/api/users/'+user_id,
        body: {
          "name": `${testname}`,
          "job": "leader",
        }
      }).then( ({status, body}) => {
        expect(status).to.eq(200)
        cy.fixture('apis/data.json', 'utf-8').then((data)=>{
          var schema_obj = data.rs_for_api_4
          expect(body).to.be.jsonSchema(schema_obj);
          expect(body.name).to.equal(testname);
        })
      })
    })
  });

  // PATCH API.
  it('Test case for user patch API.', () => {
    const id = Cypress._.random(0, 10000)
    const testname = `testname_${id}`
    cy.task('getUserId').then((user_id) => {
      cy.request({
        method: 'Patch',
        url: '/api/users/'+user_id,
        body: {
          "name": `${testname}`,
          "job": "leader",
        }
      }).then( ({status, body}) => {
        expect(status).to.eq(200)
        cy.fixture('apis/data.json', 'utf-8').then((data)=>{
          var schema_obj = data.rs_for_api_4
          expect(body).to.be.jsonSchema(schema_obj);
          expect(body.name).to.equal(testname);
        })
      })
    })
  });

  // DELETE API.
  it('Test case for user delete API.', () => {
    cy.task('getUserId').then((user_id) => {
      cy.request({
        method: 'Delete',
        url: '/api/users/'+user_id
      }).then( ({status, body}) => {
        expect(status).to.eq(204)
      })
    })
  });

});