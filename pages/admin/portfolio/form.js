import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Header from "components/Headers/Header.js";
import ImageUploader from "components/Forms/ImageUploader.js";

function PortfolioForm() {
  return (
    <>
      <Header/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Portfolio</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Basic information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-apps-name"
                          >
                            Apps Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="AICE Inspector Apps"
                            id="input-apps-name"
                            placeholder="Apps Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-client-name"
                          >
                            Client Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-client-name"
                            placeholder="PT. AICE Indonesia"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-brief-description"
                        >
                          Brief Description
                        </label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about the apps ..."
                          rows="2"
                          defaultValue="Country-scale distribution inspection & management apps."
                          type="textarea"
                        />
                      </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  
                  <h6 className="heading-small text-muted mb-4">
                    Detailed Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-long-description"
                          >
                            Long Description
                          </label>
                          <Input
                            className="form-control-alternative"
                            placeholder="A detailed words about the apps ..."
                            rows="4"
                            defaultValue="Integrated mobile apps and web dashboard for distribution inspection, 
                                          and audit management. Deployed on Android and iOS."
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-screenshots"
                          >
                            Screenshots
                          </label>
                          <ImageUploader />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Links
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-website"
                          >
                            Website
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="https://www.aice.com"
                            id="input-website"
                            placeholder="Website"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-android"
                          >
                            Android
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="https://www.aice.com/android"
                            id="input-android"
                            placeholder="Android"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-ios"
                          >
                            iOS
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="https://www.aice.com/ios"
                            id="input-ios"
                            placeholder="iOS"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-git"
                          >
                            Git Repository
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="https://www.github.com/aice/"
                            id="input-git"
                            placeholder="Git"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <Button className="my-4" color="primary" type="button">
                        Create Portofolio
                      </Button>
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

PortfolioForm.layout = Admin;

export default PortfolioForm;
