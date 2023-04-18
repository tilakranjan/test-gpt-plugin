import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

type URLParams = null;
type RequestBody = { city: string };
type ResponseBody = { weather: string };

const apiKey = "57650bf57e81708f969b93d6f61bdf3b";

app.post(
  "/api/weather",
  async (req: Request<URLParams, ResponseBody, RequestBody>, res: Response) => {
    const { city } = req.body;
    console.log(`city: ${city}`)
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const weather = response.data.weather[0].description;
      console.log('api response:')
      console.log(weather)
      res.status(200).json({ weather });
    } catch (error) {
      console.log("error")
      console.log(error)
      res.status(400).json({ error: "Failed to fetch weather data" });
    }
  }
);

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:3000`);
});