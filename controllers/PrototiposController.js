'use strict';

let CompanyModel = require('../models/CompanyModel');

function findWidgets(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    let itemsPerPage = 10;

    let result = {
        "type": "scaffold",
        "args": {
          "appBar": {
            "type": "app_bar",
            "args": {
              "title": {
                "type": "text",
                "args": {
                  "text": "Cliente"
                }
              }
            }
          },
          "backgroundColor": "#fffff",
          "body": {
            "type": "safe_area",
            "args": {
              "bottom": true
            },
            "child": {
              "type": "form",
              "child": {
                "type": "single_child_scroll_view",
                "args": {
                  "padding": [
                    16,
                    0
                  ]
                },
                "child": {
                  "type": "container",
                  "backgroundColor": "red",
                  "args": {
                    "constraints": {
                      "maxWidth": 450
                    }
                  },
                  "child": {
                    "type": "column",
                    "args": {
                      "mainAxisSize": "min"
                    },
                    "children": [
                      {
                        "type": "sized_box",
                        "args": {
                          "height": 16
                        }
                      },
                      {
                        "type": "text_form_field",
                        "args": {
                          "decoration": {
                            "hintText": "Nombre",
                            "labelText": "Primer nombre"
                          },
                          "validators": [
                            {
                              "type": "required"
                            }
                          ]
                        }
                      },
                      {
                        "type": "text_form_field",
                        "args": {
                          "decoration": {
                            "hintText": "Nombre",
                            "labelText": "Segundo nombre"
                          },
                          "validators": [
                            {
                              "type": "required"
                            }
                          ]
                        }
                      },
                      {
                        "type": "text_form_field",
                        "args": {
                          "decoration": {
                            "hintText": "Apellido",
                            "labelText": "Primer apellido"
                          },
                          "validators": [
                            {
                              "type": "required"
                            }
                          ]
                        }
                      },
                      {
                        "type": "sized_box",
                        "args": {
                          "height": 16
                        }
                      },
                      {
                        "type": "raised_button",
                        "args": {
                          "color": "#4a95ec",
                          "colorBrightness": "dark",
                          "onPressed": "##validateForm(form_context)##"
                        },
                        "child": {
                          "type": "container",
                          "args": {
                            "alignment": "center",
                            "width": "infinity"
                          },
                          "child": {
                            "type": "save_context",
                            "args": {
                              "key": "form_context"
                            },
                            "child": {
                              "type": "text",
                              "args": {
                                "text": "Submit"
                              }
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      };
    return res.status(200).send(result);
}

module.exports = {
    findWidgets
};