const express = require("express");
const app = express();
const cors = require("cors");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const receptRoute = require("./routes/receptRoute");
const authRoute = require("./routes/authRoute");
require("dotenv/config");
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Free Recipe API",
      description: "Free Recipe API which you can use in your project ",
      contact: {
        name: "By the developer: Ahmed Mukhtar",
        email: "mukhtar1100@hotmail.com",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());

/**
 * @swagger
 * /api/recepts:
 *  get:
 *   description: Get all fake recept
 *   responses:
 *     "200":
 *       description: "A success response"
 */

/**
 * @swagger
 * /api/recepts/{id}:
 *  put:
 *   description: Update fake recipe
 *   responses:
 *     "200":
 *       description: "successfully updated"
 */
/**
 * @swagger
 * /api/recepts/add:
 *  post:
 *   description: Create new recipe
 *   responses:
 *     "201":
 *       description: "successfully created"
 */
/**
 * @swagger
 * /api/recepts/{id}:
 *  get:
 *   description: Get one singel recipe by ID
 *   responses:
 *     "200":
 *       description: "successfully got one recipe"
 */

/**
 * @swagger
 * /api/recepts/{id}:
 *  Delete:
 *   description: delete recipe using ID
 *   responses:
 *     "200":
 *       description: "successfully deleted"
 */

//auth docs
/**
 * @swagger
 * /api/users/register:
 *  post:
 *   description: Register new user
 *   responses:
 *     "201":
 *       description: "successfully registered"
 */
/**
 * @swagger
 * /api/users/login:
 *  post:
 *   description: Sign in
 *   responses:
 *     "201":
 *       description: "successfully logged in"
 */
/**
 * @swagger
 * /api/users:
 *  get:
 *   description: all users
 *   responses:
 *     "200":
 *       description: "Got all users: successfully "
 */

app.use("/api/recepts", receptRoute);
app.use("/api/users", authRoute);
app.use("/", (req, res) => {
  res.send("Welcome to apiet");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected")
);

app.listen(process.env.PORT || 5000);
