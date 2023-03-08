require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());


// Connect to MongoDB
// moon-tech
// 3EMQl1GyIKlIQI3r
// mongodb+srv://<username>:<password>@cluster0.kbuol.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://<username>:<password>@cluster0.kbuol.mongodb.net/?retryWrites=true&w=majority
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q66zrl2.mongodb.net/?retryWrites=true&w=majority`;
// console.log(process.env.DB_USER);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kbuol.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const run = async () => {
    try {
        const db = client.db("moon-tech");
        const productCollection = db.collection("products");

        app.get("/products", async (req, res) => {
            const cursor = productCollection.find({});
            const product = await cursor.toArray();

            res.send({ status: true, data: product });
        });

        app.post("/products", async (req, res) => {
            const product = req.body;

            const result = await productCollection.insertOne(product);

            res.send(result);
        });

        app.delete("/products/:id", async (req, res) => {
            const id = req.params.id;

            const result = await productCollection.deleteOne({ _id: ObjectId(id) });
            res.send(result);
        });
    }
    catch (err) {
        console.log(err);
    }
    finally {
    }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});