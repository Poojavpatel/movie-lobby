/* eslint-disable @typescript-eslint/no-unused-vars */
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { test } from "mocha";
import { mockRequest, mockResponse } from "mock-req-res";
import sinonChai from "sinon-chai";
import { GenreEnum } from "../../models/Movie";
import movieRepo from "../../repos/MovieRepo";
import { AddMovieUseCase } from "./AddMovieUseCase";
import { AddMovieRouter } from "./AddMovieRouter";

const expect = chai.expect;

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("UpdatePageSettingsUseCase API test", () => {
  let router: AddMovieRouter;

  beforeEach(() => {
    router = new AddMovieRouter(new AddMovieUseCase(movieRepo));
  });

  describe("Validations", () => {
    test("Should fail if title is missing", async () => {
      const req = {
        body: {
          genre: GenreEnum.COMEDY,
          rating: 5
        }
      };

      const request = mockRequest(req);
      const response = mockResponse();

      await router.execute(request, response);

      /* Test api response status code */
      expect(response.status.calledWith(409));

      /* Test API response json */
      const responseDTO = response.json.getCall(0).args[0];
      expect(responseDTO?.error).to.be.eql("Invalid request");
      expect(responseDTO?.body).to.be.eql("Title is required");
    });

    test("Should fail if genre is not valid enum", async () => {
      const req = {
        body: {
          title: "Love",
          genre: "test",
          rating: 7
        }
      };

      const request = mockRequest(req);
      const response = mockResponse();

      await router.execute(request, response);

      /* Test api response status code */
      expect(response.status.calledWith(409));

      /* Test API response json */
      const responseDTO = response.json.getCall(0).args[0];
      expect(responseDTO?.error).to.be.eql("Invalid request");
      expect(responseDTO?.body).to.be.eql("test is not a valid enum.");
    });
  });

  describe("Success", () => {
    /* 
      This requires creating a test db for test cases
      Initiate db creation in beforeEach function
    */
    test.skip("Should create movie if req is valid", async () => {
      const req = {
        body: {
          title: "Love",
          genre: GenreEnum.ROMANCE,
          rating: 7
        }
      };

      const request = mockRequest(req);
      const response = mockResponse();

      await router.execute(request, response);

      /* Test api response status code */
      expect(response.status.calledWith(200));

      /* Test API response json */
      const responseDTO = response.json.getCall(0).args[0];

      expect(responseDTO?.message).to.be.eql("Movie added successfully");

      // Fetch movie from db to verify if created correctly
    });
  });
});
