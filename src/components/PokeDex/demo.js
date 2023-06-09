{/* <Tab.Content>
            <Tab.Pane eventKey="all-pokemon">
              <Row xs={1} sm={2} md={3} lg={4} xl={5} className="pokemon-row">
                {mainPokemon.length === 0 ? (
                  <p className="text-center mt-3">No main Pokemon found.</p>
                ) : (
                  mainPokemon.map((p) => (
                    <Col key={p.id} className="mb-3">
                      <Card
                        style={{ border: "15px solid gold" }}
                        className="pokemon-card"
                      >
                        <div className="card-content">
                          <Card.Img
                            variant="top"
                            src={p.img_url}
                            alt={p.name}
                            className="pokemon-image"
                          />
                          <Card.Body>
                            <p
                              className="font-text"
                              style={{ fontSize: "medium" }}
                            >
                              {p.name}
                            </p>
                            <Card.Text>Type: {p.type}</Card.Text>
                          </Card.Body>
                        </div>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </Tab.Pane>
                  </Tab.Content>*/}